import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "db.json");

app.use(express.json());

// Initialize Database Utility
interface DbData {
  users: any[];
  quotes: any[];
  orders: any[];
  messages: any[];
}

function readDb(): DbData {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error reading database:", error);
  }
  return { users: [], quotes: [], orders: [], messages: [] };
}

function writeDb(data: DbData) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing database:", error);
  }
}

// Ensure db.json has a valid structure on boot
if (!fs.existsSync(DB_FILE)) {
  writeDb({ users: [], quotes: [], orders: [], messages: [] });
}

// Initialize Gemini Client Lazily & Safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } else {
      console.warn("GEMINI_API_KEY is not configured or holds default placeholder.");
    }
  }
  return aiClient;
}

// API Routes

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2. Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Elegant fallback mock if API key is not provided
    console.log("No Gemini API key found, generating intelligent assistant fallback response.");
    const fallbackResponses = [
      "Hello! I am the MN Prints Assistant. I'd love to help with your custom apparel project! We specialize in custom manufacturing, Screen Printing, embroidery, and DTF printing. What category of apparel are you looking to customize today?",
      "To get an accurate price calculation for your project, please visit our **Quote Request** page or let me know the quantity, garment type (e.g., T-shirts, hoodies, hats), and printing method you prefer!",
      "MN Prints is based in beautiful Minnesota! We serve local schools, businesses, construction teams, healthcare facilities, and national clients with lightning fast turnaround times. You can reach us at **612-286-3469** or **harmony.fundsfi@gmail.com**.",
      "Yes! We do have a fully functional Secure Client Portal. You can register or log in there to view your saved quote estimates, track real-time production, and monitor shipping/USPS tracking updates directly.",
      "Our core services include high-speed automatic Screen Printing, multi-needle premium Embroidery, durable Direct-to-Film (DTF) transfers, Heat Transfers, and custom product development. We have a minimum order size of just 12 items, with bulk discounts starting at 36, 72, and 144+ pieces."
    ];
    // Select response based on keywords
    let text = fallbackResponses[0];
    const query = message.toLowerCase();
    if (query.includes("quote") || query.includes("price") || query.includes("cost") || query.includes("how much")) {
      text = fallbackResponses[1];
    } else if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("address") || query.includes("where")) {
      text = fallbackResponses[2];
    } else if (query.includes("track") || query.includes("order") || query.includes("portal") || query.includes("status")) {
      text = fallbackResponses[3];
    } else if (query.includes("service") || query.includes("print") || query.includes("embroidery") || query.includes("dtf")) {
      text = fallbackResponses[4];
    }
    return res.json({ text });
  }

  try {
    const formattedHistory = history.map((h: any) => ({
      role: h.sender === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    }));

    // Add current user prompt
    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents as any,
      config: {
        systemInstruction: `You are the official Virtual Assistant for MN Prints (mnprints.org), a premium custom apparel manufacturer based in Minnesota. 
Company Details:
- Name: MN Prints
- Website: mnprints.org
- Phone: 612-286-3469
- Email: harmony.fundsfi@gmail.com
- Services: Screen Printing, Premium Embroidery, DTF (Direct to Film) Printing, Heat Transfer, Custom Apparel Manufacturing, Uniform Programs, Design Assistance, and Promotional Merchandise.
- Core Highlights: Located in MN, fast turnaround, bulk order specialists, extreme quality audit, design support.
- Industries Served: Schools, businesses, construction crews, restaurants, sports teams, nonprofits, and events.
- Minimum Order: 12 pieces (for optimal pricing, bulk breaks start at 36).

Style & Rules:
1. Always be professional, warm, supportive, and informative.
2. Promote the "Request a Quote" section and the "Secure Client Portal" to track custom orders.
3. Keep responses relatively concise, structured with bullet points or clear sentences.
4. If a user asks about their order status, instruct them to log into the "Client Portal" or enter their tracking number (e.g. MNP-52891) in our tracking tool on the portal tab.`,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I am here to assist you with all custom apparel needs at MN Prints. How can I assist you further?";
    return res.json({ text: reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate AI response. Using mock virtual assistant response instead.", text: "I'm experiencing a brief server glitch, but MN Prints is ready to help! You can reach our support desk directly at 612-286-3469 or harmony.fundsfi@gmail.com." });
  }
});

// 3. User Registration
app.post("/api/auth/register", (req, res) => {
  const { email, password, name, companyName, phone } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Email, password, and name are required." });
  }

  const db = readDb();
  const exists = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(400).json({ error: "User with this email already exists." });
  }

  const newUser = {
    id: "usr-" + Math.random().toString(36).substring(2, 9),
    email: email.toLowerCase(),
    password, // For demonstration/preview purposes, plain text or simple storage is fine
    name,
    companyName: companyName || "",
    phone: phone || "",
    isAdmin: false,
  };

  db.users.push(newUser);
  writeDb(db);

  // Exclude password from response
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ user: userWithoutPassword, token: "tok-" + newUser.id });
});

// 4. User Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const db = readDb();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword, token: "tok-" + user.id });
});

// 5. Submit Quote Request & Auto-Create Tracking Order
app.post("/api/quotes", (req, res) => {
  const {
    userId,
    name,
    company,
    email,
    phone,
    productType,
    quantity,
    sizes,
    printingMethod,
    artworkName,
    deadline,
    additionalDetails,
  } = req.body;

  if (!name || !email || !productType || !quantity) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const db = readDb();
  const quoteId = "QT-" + Math.floor(10000 + Math.random() * 90000);
  
  // Calculate a reasonable mock estimate
  const basePrices: Record<string, number> = {
    "Screen Printing": 7.50,
    "Embroidery": 9.00,
    "DTF Printing": 8.50,
    "Heat Transfer": 6.50,
    "Custom Apparel Manufacturing": 12.00,
  };
  const pricePerUnit = basePrices[printingMethod] || 8.00;
  const totalPrice = (pricePerUnit * Number(quantity)).toFixed(2);
  const estimatedPrice = `$${totalPrice}`;

  const newQuote = {
    id: quoteId,
    userId: userId || null,
    name,
    company: company || "Individual",
    email,
    phone: phone || "",
    productType,
    quantity: Number(quantity),
    sizes: sizes || "Standard Mix",
    printingMethod: printingMethod || "Screen Printing",
    artworkName: artworkName || "No file uploaded",
    deadline: deadline || "Flexible",
    additionalDetails: additionalDetails || "",
    status: "pending_review",
    estimatedPrice,
    createdAt: new Date().toISOString(),
  };

  db.quotes.push(newQuote);

  // Auto-generate a linked Order Tracking record in database so the client portal demonstrates full flow immediately!
  const orderId = "MNP-" + Math.floor(10000 + Math.random() * 90000);
  const newOrder = {
    id: orderId,
    quoteId: quoteId,
    productName: `${company ? company + ' - ' : ''}${productType}`,
    quantity: Number(quantity),
    printingMethod,
    status: "submitted",
    createdAt: new Date().toISOString(),
    milestones: [
      {
        status: "submitted",
        label: "Quote Submitted",
        description: `Your custom specs are recorded. Our design assistants are verifying the layout details. Initial estimated quote: ${estimatedPrice}`,
        date: new Date().toISOString().split("T")[0],
        completed: true,
      },
      {
        status: "processing",
        label: "Processing Review",
        description: "Our apparel manufacturing coordinators are confirming stock availability for selected sizes.",
        date: "Pending Setup",
        completed: false,
      },
      {
        status: "in_production",
        label: "In Production",
        description: "Your garments are placed on our active screens or multi-head embroidery stations.",
        date: "Awaiting approval",
        completed: false,
      },
      {
        status: "quality_check",
        label: "Quality Verification",
        description: "Full visual auditing and garment count matching.",
        date: "Awaiting production",
        completed: false,
      },
      {
        status: "shipped",
        label: "Shipped & Tracking Active",
        description: "USPS tracking and dispatch confirmation.",
        date: "Awaiting packaging",
        completed: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        description: "Confirmed delivery at shipping location.",
        date: "Awaiting transport",
        completed: false,
      }
    ],
  };

  db.orders.push(newOrder);
  writeDb(db);

  res.status(201).json({ quote: newQuote, order: newOrder });
});

// 6. Get Quotes (by user if filtered, or all if admin)
app.get("/api/quotes", (req, res) => {
  const { userId, email } = req.query;
  const db = readDb();
  let results = db.quotes;

  if (userId) {
    results = results.filter((q) => q.userId === userId);
  } else if (email) {
    results = results.filter((q) => q.email.toLowerCase() === (email as string).toLowerCase());
  }

  res.json(results);
});

// 7. Track Order Status
app.get("/api/orders/track/:orderId", (req, res) => {
  const { orderId } = req.params;
  const db = readDb();
  const order = db.orders.find(
    (o) => o.id.toUpperCase() === orderId.toUpperCase() || (o.trackingNumber && o.trackingNumber.toUpperCase() === orderId.toUpperCase())
  );

  if (!order) {
    return res.status(404).json({ error: "Order not found. Double-check your Order Number (e.g., MNP-52891) or tracking ID." });
  }

  res.json(order);
});

// 8. Retrieve All Orders linked to a user (by userId or registered email)
app.get("/api/user/orders", (req, res) => {
  const { userId, email } = req.query;
  const db = readDb();
  let results = db.orders;

  if (userId) {
    // find quoteIds belonging to this userId
    const userQuoteIds = db.quotes.filter((q) => q.userId === userId).map((q) => q.id);
    results = results.filter((o) => userQuoteIds.includes(o.quoteId) || o.userId === userId);
  } else if (email) {
    const userQuoteIds = db.quotes.filter((q) => q.email.toLowerCase() === (email as string).toLowerCase()).map((q) => q.id);
    results = results.filter((o) => userQuoteIds.includes(o.quoteId));
  }

  res.json(results);
});

// 9. Contact messages
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const db = readDb();
  const newMessage = {
    id: "msg-" + Math.random().toString(36).substring(2, 9),
    name,
    email,
    subject: subject || "General Inquiry",
    message,
    createdAt: new Date().toISOString(),
  };

  db.messages.push(newMessage);
  writeDb(db);

  res.status(201).json({ success: true, message: "Thank you! Your message has been sent to the MN Prints team. We will get back to you within 24 hours." });
});

// Vite Server Configuration Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MN Prints Server running on port ${PORT}`);
  });
}

startServer();
