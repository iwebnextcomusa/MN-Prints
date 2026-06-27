import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ServicesView from "./components/ServicesView";
import IndustriesView from "./components/IndustriesView";
import GalleryView from "./components/GalleryView";
import QuoteView from "./components/QuoteView";
import PortalView from "./components/PortalView";
import ContactView from "./components/ContactView";
import { User as UserType, OrderTrack } from "./types";
import { LogIn, UserPlus, X, Lock, Mail, User, AlertCircle, Sparkles, Loader2 } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  
  // Local list to track quotes/orders submitted in the current browser session
  const [localOrders, setLocalOrders] = useState<OrderTrack[]>([]);

  // Auth Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authCompany, setAuthCompany] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Check if a user is already cached in localStorage
  useEffect(() => {
    const cached = localStorage.getItem("mnprints_user");
    if (cached) {
      try {
        setCurrentUser(JSON.parse(cached));
      } catch (e) {
        console.error("Error reading cached auth state:", e);
      }
    }
  }, []);

  // When a quote is successfully submitted from the form, store it in local state
  const handleQuoteSubmitted = (quote: any, order: any) => {
    // Save to our locally tracked orders list so we can find it instantly in the search portal
    const trackedOrder: OrderTrack = {
      id: order.id,
      userId: order.userId,
      status: order.status,
      productName: quote.productType,
      productType: quote.productType,
      printingMethod: quote.printingMethod,
      quantity: quote.quantity,
      sizes: quote.sizes,
      artworkName: quote.artworkName || "customer-uploaded-blueprint.ai",
      createdAt: order.createdAt,
      carrier: "",
      trackingCode: order.id, // linked mock tracker
      milestones: order.milestones || [],
    };

    setLocalOrders((prev) => [trackedOrder, ...prev]);
  };

  // Auth form submissions
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsAuthLoading(true);

    try {
      const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload = authMode === "login" 
        ? { email: authEmail, password: authPassword }
        : { email: authEmail, password: authPassword, name: authName, companyName: authCompany, phone: authPhone };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication error. Please retry.");
      }

      // Success
      setCurrentUser(data.user);
      localStorage.setItem("mnprints_user", JSON.stringify(data.user));
      setShowAuthModal(false);
      
      // Clear forms
      setAuthEmail("");
      setAuthPassword("");
      setAuthName("");
      setAuthCompany("");
      setAuthPhone("");
    } catch (err: any) {
      console.error("Auth Failure:", err);
      setAuthError(err.message || "An error occurred during authentication.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("mnprints_user");
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <HomeView setCurrentView={setCurrentView} />;
      case "about":
        return <AboutView />;
      case "services":
        return <ServicesView setCurrentView={setCurrentView} />;
      case "industries":
        return <IndustriesView setCurrentView={setCurrentView} />;
      case "gallery":
        return <GalleryView />;
      case "quote":
        return (
          <QuoteView
            currentUser={currentUser}
            setCurrentView={setCurrentView}
            onQuoteSubmitted={handleQuoteSubmitted}
          />
        );
      case "portal":
        return (
          <PortalView
            currentUser={currentUser}
            setCurrentView={setCurrentView}
            localOrders={localOrders}
          />
        );
      case "contact":
        return <ContactView />;
      default:
        return <HomeView setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div id="mnprints-app-root" className="min-h-screen flex flex-col bg-[#F5F7FA]">
      {/* Sticky Header with navigation context */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onLoginClick={() => {
          setAuthMode("login");
          setAuthError("");
          setShowAuthModal(true);
        }}
        onLogoutClick={handleLogout}
      />

      {/* Main viewport area */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Floating features */}
      <Chatbot />

      {/* Site directory Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Authentication Slide-over Modal Dialog */}
      {showAuthModal && (
        <div id="auth-modal-backdrop" className="fixed inset-0 bg-[#0A2342]/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            id="auth-modal-window"
            className="bg-white rounded-3xl border border-gray-200/80 shadow-2xl max-w-md w-full overflow-hidden p-6 sm:p-8 space-y-6 relative"
          >
            {/* Close button */}
            <button
              id="close-auth-btn"
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-[#1E5EFF] font-bold uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>Secure Customer Access Gateway</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl text-[#0A2342]">
                {authMode === "login" ? "Access Client Portal" : "Create Client Account"}
              </h2>
              <p className="text-gray-500 text-xs">
                {authMode === "login" 
                  ? "Sign in to track active clothing orders and approve pre-press layouts." 
                  : "Sign up to unlock persistent order histories and localized quote metrics."
                }
              </p>
            </div>

            {/* Error notifications */}
            {authError && (
              <div className="p-3.5 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Auth forms */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === "register" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Your Full Name *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="Sarah Connor"
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                      />
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Company / Team Name</label>
                    <input
                      type="text"
                      value={authCompany}
                      onChange={(e) => setAuthCompany(e.target.value)}
                      placeholder="e.g. Twin Cities Athletics"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Contact Phone</label>
                    <input
                      type="tel"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      placeholder="e.g. 612-555-0199"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Email Address *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Password *</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-3 bg-[#0A2342] hover:bg-[#1E5EFF] text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Please wait...</span>
                  </>
                ) : authMode === "login" ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In Securely</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Free Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Toggle form type */}
            <div className="text-center text-xs text-gray-500 border-t border-gray-100 pt-4">
              {authMode === "login" ? (
                <p>
                  New to MN Prints?{" "}
                  <button
                    onClick={() => {
                      setAuthMode("register");
                      setAuthError("");
                    }}
                    className="text-[#1E5EFF] font-bold hover:underline cursor-pointer"
                  >
                    Create a Client Account
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError("");
                    }}
                    className="text-[#1E5EFF] font-bold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
