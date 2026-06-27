import React, { useState, useRef } from "react";
import { FileText, Upload, Send, HelpCircle, CheckCircle2, ShieldCheck, ArrowRight, Info, AlertTriangle, Loader2 } from "lucide-react";
import { User as UserType } from "../types";
import { AnimatePresence } from "motion/react";

interface QuoteViewProps {
  currentUser: UserType | null;
  setCurrentView: (view: string) => void;
  onQuoteSubmitted?: (quote: any, order: any) => void;
}

export default function QuoteView({ currentUser, setCurrentView, onQuoteSubmitted }: QuoteViewProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    company: currentUser?.companyName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    productType: "Premium Cotton T-Shirts",
    quantity: 100,
    sizes: "S: 20, M: 40, L: 40",
    printingMethod: "Screen Printing",
    deadline: "",
    additionalDetails: "",
  });

  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Success state popup
  const [successData, setSuccessData] = useState<{
    quoteId: string;
    orderId: string;
    estimatedPrice: string;
  } | null>(null);

  const productOptions = [
    "Premium Cotton T-Shirts",
    "Performance Hoodies & Fleece",
    "6-Panel Snapbacks & Headwear",
    "Corporate Golf Polos",
    "ANSI Safety & Workwear",
    "Athletic Jerseys & Uniforms",
    "Custom Promotional Merchandise",
  ];

  const methodOptions = [
    "Screen Printing",
    "Embroidery",
    "DTF Printing",
    "Heat Transfer",
    "Custom Apparel Manufacturing",
  ];

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setArtworkFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArtworkFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Basic validation
    if (!formData.name.trim()) return setFormError("Contact Name is required.");
    if (!formData.email.trim()) return setFormError("Email Address is required.");
    if (formData.quantity < 12) return setFormError("Minimum wholesale order quantity is 12 units.");

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        userId: currentUser?.id || null,
        artworkName: artworkFile ? artworkFile.name : "None uploaded",
      };

      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Server rejected submission. Please check formatting.");
      }

      const result = await response.json();

      setSuccessData({
        quoteId: result.quote.id,
        orderId: result.order.id,
        estimatedPrice: result.quote.estimatedPrice,
      });

      // Lift state up to parent so the client portal view populates immediately
      if (onQuoteSubmitted) {
        onQuoteSubmitted(result.quote, result.order);
      }
    } catch (error) {
      console.error("Quote submit error:", error);
      setFormError("Connection problem. Failed to log quote. Please dial 612-286-3469.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="quote-view-container" className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {!successData ? (
          <div className="space-y-8">
            {/* Header copy */}
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] bg-[#FF7A00]/10 px-3.5 py-1 rounded-full">
                Custom Apparel Cost Calculator
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A2342] tracking-tight">
                Request a Custom Quote
              </h1>
              <p className="text-gray-600 text-sm max-w-xl mx-auto">
                Fill out our structural blueprint form below. Receive an instant cost estimate and a linked tracking number to follow your order’s progression.
              </p>
            </div>

            {/* Main Form layout */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
              {formError && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-xs text-red-700 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Contact Info Section */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-base text-[#0A2342] tracking-tight border-b border-gray-100 pb-2">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Twin Cities Coffee Co."
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="612-555-0199"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Custom apparel specifications */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-base text-[#0A2342] tracking-tight border-b border-gray-100 pb-2">
                  2. Apparel Customization Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Apparel Category</label>
                    <select
                      value={formData.productType}
                      onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    >
                      {productOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Decoration Method</label>
                    <select
                      value={formData.printingMethod}
                      onChange={(e) => setFormData({ ...formData, printingMethod: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    >
                      {methodOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity *</label>
                      <span className="text-[10px] text-gray-400 font-mono">Min order size: 12</span>
                    </div>
                    <input
                      type="number"
                      required
                      min="12"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 0) })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Target Deadline</label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Size Distribution Description</label>
                      <span className="text-[10px] text-[#1E5EFF] font-mono font-semibold">e.g. S: 20, M: 40, L: 40</span>
                    </div>
                    <input
                      type="text"
                      value={formData.sizes}
                      onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                      placeholder="e.g. S: 10, M: 25, L: 25, XL: 10"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Drag & Drop File Upload Pattern */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="font-display font-bold text-base text-[#0A2342] tracking-tight">
                    3. Upload Custom Vector Artwork
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">Accepted: AI, EPS, PDF, high-res PNG</span>
                </div>

                <div
                  id="dropzone"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                    isDragging
                      ? "border-[#1E5EFF] bg-[#1E5EFF]/5"
                      : "border-gray-300 hover:border-[#1E5EFF] hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".ai,.eps,.pdf,.png,.jpg,.jpeg"
                  />

                  <div className="p-3 bg-gray-100 text-gray-500 rounded-full group-hover:scale-105 transition-all">
                    <Upload className="w-6 h-6 text-[#1E5EFF]" />
                  </div>

                  <div>
                    <span className="block font-bold text-xs sm:text-sm text-[#0A2342]">
                      {artworkFile ? artworkFile.name : "Drag & Drop artwork file here"}
                    </span>
                    <span className="text-xs text-gray-500 block mt-1">
                      {artworkFile ? `(${(artworkFile.size / 1024 / 1024).toFixed(2)} MB)` : "or click to browse local files"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Additional details text area */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">4. Additional Specifications & Placement Instructions</label>
                <textarea
                  rows={4}
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                  placeholder="Detail screen locations (e.g. left-sleeve logo, large back print), specific thread colors, or delivery packaging instructions here."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800 text-xs sm:text-sm"
                />
              </div>

              {/* Informative tips widget */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-600 space-y-1.5 leading-relaxed flex gap-3">
                <Info className="w-5 h-5 text-[#1E5EFF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0A2342] block">Wholesale Pricing breaks:</span>
                  Our automatic presses have optimal cost breaks starting at 36, 72, and 144 items. Increasing your quantity directly decreases your cost-per-unit.
                </div>
              </div>

              {/* Action submit button */}
              <button
                type="submit"
                id="submit-quote-btn"
                disabled={isLoading}
                className="w-full py-4 bg-[#FF7A00] hover:bg-[#e06b00] text-white font-bold rounded-xl text-sm tracking-wide transition-all shadow-lg shadow-[#FF7A00]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Calculating Custom Estimates...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate Instant Quote Estimate</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Successful estimate generated screen */
          <div className="bg-[#0A2342] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#1E5EFF]/30 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF7A00]/10 rounded-full blur-2xl"></div>
            
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF7A00]">
                Custom Estimate Successfully Logged
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Your Initial Price Calculation
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                Thank you! Your custom specifications are logged on our production board. Our design separators are standing by.
              </p>
            </div>

            {/* Price block */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto grid grid-cols-2 gap-4 text-left">
              <div>
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">Quote ID</span>
                <span className="font-display font-extrabold text-lg text-white block">{successData.quoteId}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">Estimated Cost</span>
                <span className="font-display font-extrabold text-lg text-[#FF7A00] block">{successData.estimatedPrice}</span>
              </div>
              <div className="col-span-2 border-t border-white/10 pt-4 mt-2">
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">Linked Order Number</span>
                <span className="font-mono text-sm text-[#1E5EFF] font-bold block">{successData.orderId}</span>
                <span className="text-[9px] text-gray-400 leading-normal block mt-1">
                  Use this Order Number in the portal below to track real-time stitch milestones and USPS shipping updates!
                </span>
              </div>
            </div>

            {/* Portal dispatch guidance CTA */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setCurrentView("portal")}
                  className="px-6 py-3.5 bg-[#1E5EFF] text-white hover:bg-[#FF7A00] font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <span>Go to My Client Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSuccessData(null)}
                  className="px-6 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/10 transition-all cursor-pointer"
                >
                  Configure Another Estimate
                </button>
              </div>
              
              <p className="text-xs text-gray-400 flex items-center gap-1 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Estimate locked based on {formData.quantity} units. All specs saved securely.</span>
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
