import React, { useState } from "react";
import { Search, Loader2, Package, CheckCircle2, CircleDot, Truck, Calendar, MapPin, Inbox, CreditCard, ShieldCheck, Mail, Info } from "lucide-react";
import { OrderTrack, TrackingMilestone, User as UserType } from "../types";
import { AnimatePresence } from "motion/react";

interface PortalViewProps {
  currentUser: UserType | null;
  setCurrentView: (view: string) => void;
  // Let's accept locally submitted order/quote lists so client can find them instantly
  localOrders?: OrderTrack[];
}

export default function PortalView({ currentUser, setCurrentView, localOrders = [] }: PortalViewProps) {
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupEmail, setLookupEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<OrderTrack | null>(null);

  // Core Lookup Handler (Query API by Tracking Code or email!)
  const handleOrderLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSearchedOrder(null);

    const query = lookupQuery.trim();
    if (!query) {
      setErrorMsg("Please enter a valid Tracking ID or Order ID.");
      return;
    }

    setIsLoading(true);

    try {
      // Check local cache list first
      const foundLocal = localOrders.find(
        (o) => o.id.toLowerCase() === query.toLowerCase() || o.trackingCode?.toLowerCase() === query.toLowerCase()
      );

      if (foundLocal) {
        setSearchedOrder(foundLocal);
        setIsLoading(false);
        return;
      }

      // Fetch from API
      const response = await fetch(`/api/orders/track/${query}`);
      if (!response.ok) {
        throw new Error("Order not found on our server.");
      }
      const data = await response.json();
      setSearchedOrder(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Could not locate any matching order files for tracking code: " + query + ". Please check characters or dial 612-286-3469.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSearchedOrder(null);

    const email = lookupEmail.trim();
    if (!email) {
      setErrorMsg("Please enter an email address.");
      return;
    }

    setIsLoading(true);

    try {
      // Query order directory by user email
      const response = await fetch(`/api/orders/email?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error("No orders registered under this email.");
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setSearchedOrder(data[0]); // Show the most recent one
      } else {
        throw new Error("No order files registered to: " + email);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "No custom order blueprints mapped to: " + email);
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-seed mock lookups instructions helper
  const tryPreseedLookup = (id: string) => {
    setLookupQuery(id);
    setErrorMsg("");
  };

  // Helper to determine milestone visual color status
  const getMilestoneColor = (mStatus: string, orderStatus: string) => {
    // Basic progression sequence
    const sequence = ["quote_received", "proof_approved", "in_production", "quality_audited", "shipped"];
    const itemIndex = sequence.indexOf(mStatus);
    const orderIndex = sequence.indexOf(orderStatus);

    if (itemIndex < 0) return "gray";
    if (itemIndex < orderIndex) return "success"; // completed
    if (itemIndex === orderIndex) return "active"; // active now
    return "pending"; // not reached
  };

  return (
    <div id="portal-view-container" className="pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1E5EFF] bg-[#1E5EFF]/10 px-3.5 py-1 rounded-full">
          Secure Client Tracking Desk
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A2342] tracking-tight">
          MN Prints Client Portal
        </h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          Track active garment manufacturing milestones, approve digital vector proofs, and inspect carrier tracking numbers instantly.
        </p>
      </div>

      {/* Lookup Control forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lookup by Tracking ID */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-base text-[#0A2342] tracking-tight flex items-center gap-2">
            <Search className="w-5 h-5 text-[#1E5EFF]" />
            <span>Search by Order Tracking Code</span>
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            Every quote or processed invoice is assigned a unique Order ID starting with <strong className="font-mono text-gray-700">MNP-</strong> or Tracking ID. Paste it below to fetch real-time production stats.
          </p>
          <form onSubmit={handleOrderLookup} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. MNP-10023"
              value={lookupQuery}
              onChange={(e) => setLookupQuery(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800 font-mono font-bold"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0A2342] hover:bg-[#1E5EFF] text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Track"}
            </button>
          </form>

          {/* Quick tester pre-seeds */}
          <div className="pt-2 text-[10px] text-gray-400">
            <span>Try these test files: </span>
            <button onClick={() => tryPreseedLookup("MNP-10023")} className="text-[#1E5EFF] hover:underline font-mono font-semibold mx-1">MNP-10023</button>
            <span>or</span>
            <button onClick={() => tryPreseedLookup("MNP-10024")} className="text-[#1E5EFF] hover:underline font-mono font-semibold mx-1">MNP-10024</button>
          </div>
        </div>

        {/* Lookup by Client Email address */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-base text-[#0A2342] tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#FF7A00]" />
            <span>Look Up Orders by Registered Email</span>
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            Enter your company or contact email address below to fetch the most recent quote estimate or active production file linked to your account.
          </p>
          <form onSubmit={handleEmailLookup} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="harmony.fundsfi@gmail.com"
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#FF7A00] hover:bg-[#e06b00] text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Find Files"}
            </button>
          </form>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-xs text-red-700 font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Searched Results Card details (Beautiful visual feedback step) */}
      <AnimatePresence>
        {searchedOrder && (
          <div
            id="searched-order-details"
            className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden divide-y divide-gray-100"
          >
            {/* 1. Header block */}
            <div className="bg-[#0A2342] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF7A00]">Active Production File</span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-2">
                  <Package className="w-6 h-6 text-[#1E5EFF]" />
                  <span>Order ID: {searchedOrder.id}</span>
                </h3>
              </div>

              {/* Status pill badge */}
              <div className="px-3.5 py-1.5 bg-[#1E5EFF] rounded-full text-xs font-bold uppercase tracking-wide">
                Status: {searchedOrder.status.replace("_", " ")}
              </div>
            </div>

            {/* 2. Visual progress Milestone Bar */}
            <div className="p-6 sm:p-8 space-y-6">
              <h4 className="font-display font-bold text-sm text-[#0A2342] tracking-tight">
                Garment Manufacturing Milestones Progress
              </h4>

              {/* Horizontal steps flow */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {/* Connecting horizontal guidelines background */}
                <div className="hidden md:block absolute left-[10%] right-[10%] top-4 h-0.5 bg-gray-200 z-0"></div>

                {[
                  { key: "quote_received", label: "Specs Received", time: searchedOrder.createdAt },
                  { key: "proof_approved", label: "Vector Proof Approved", time: "Approved in 24h" },
                  { key: "in_production", label: "Printing / Stitching", time: "Active on Press" },
                  { key: "quality_audited", label: "3-Stage Visual Audit", time: "Vetted Specs" },
                  { key: "shipped", label: "Shipped & Dispatched", time: searchedOrder.carrier ? "Transit Carrier" : "Staged" },
                ].map((step, index) => {
                  const colorState = getMilestoneColor(step.key, searchedOrder.status);
                  
                  return (
                    <div key={step.key} className="flex md:flex-col items-center md:text-center gap-3 md:gap-2 relative z-10">
                      {/* Step node icon */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 font-bold font-mono text-xs ${
                          colorState === "success"
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/15"
                            : colorState === "active"
                            ? "bg-[#1E5EFF] border-[#1E5EFF] text-white animate-pulse"
                            : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        {colorState === "success" ? "✓" : index + 1}
                      </div>

                      {/* Labels */}
                      <div>
                        <span className="block font-bold text-xs text-gray-800 leading-tight">{step.label}</span>
                        <span className="block text-[10px] text-gray-400 font-mono mt-0.5">{step.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Specs detail bento blocks */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/50">
              {/* Box A: Specs config */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
                <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider block border-b border-gray-100 pb-1.5">
                  Apparel Blueprints
                </span>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Substrate:</span>
                    <strong className="text-gray-800">{searchedOrder.productType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Decoration:</span>
                    <strong className="text-[#FF7A00] font-semibold">{searchedOrder.printingMethod}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Units:</span>
                    <strong className="text-gray-800">{searchedOrder.quantity} pieces</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Size Runs:</span>
                    <strong className="text-gray-800 font-mono text-[11px]">{searchedOrder.sizes}</strong>
                  </div>
                </div>
              </div>

              {/* Box B: Artwork & Proofs */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider block border-b border-gray-100 pb-1.5">
                    Artwork Metadata
                  </span>
                  <p className="text-xs font-mono font-bold text-[#1E5EFF] truncate pt-2">
                    📄 {searchedOrder.artworkName || "customer-vector-embroidery.ai"}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Pre-press status: Digital vector color separation approved for screens.
                  </p>
                </div>

                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Printers Ready & Locked</span>
                </div>
              </div>

              {/* Box C: Shipping / Carrier dispatch info */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
                <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider block border-b border-gray-100 pb-1.5">
                  Shipping Logistics
                </span>
                {searchedOrder.carrier ? (
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Carrier Service:</span>
                      <strong className="text-gray-800 flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-[#1E5EFF]" />
                        {searchedOrder.carrier}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Delivery:</span>
                      <strong className="text-gray-800 font-mono">{searchedOrder.estimatedDelivery || "July 05, 2026"}</strong>
                    </div>
                    <div className="space-y-1 pt-1.5 border-t border-gray-100">
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wide">USPS/UPS tracking number</span>
                      <a
                        href={`https://tools.usps.com/go/TrackConfirmAction?tLabels=${searchedOrder.trackingCode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1E5EFF] hover:text-[#FF7A00] font-mono font-bold text-xs block truncate underline"
                      >
                        {searchedOrder.trackingCode}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs text-gray-500">
                    <p className="leading-relaxed">
                      Your order is currently processing through the {searchedOrder.status.replace("_", " ")} channel.
                    </p>
                    <p className="text-[10px] text-amber-600 bg-amber-50 p-2 rounded-lg font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>Est. Staging: 7-10 standard days.</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Informative customer care tag */}
            <div className="p-4 bg-[#F5F7FA] text-xs text-gray-500 leading-normal flex items-center gap-2">
              <Info className="w-4 h-4 text-[#1E5EFF] shrink-0" />
              <span>
                Need to amend size quantities or print layout placements? Contact your dedicated design specialist at <strong>harmony.fundsfi@gmail.com</strong> or call <strong>612-286-3469</strong> immediately.
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Guide text */}
      <div className="p-6 bg-[#0A2342] text-white rounded-3xl border border-[#1E5EFF]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left max-w-xl">
          <h4 className="font-display font-extrabold text-lg text-white">No active order file registered yet?</h4>
          <p className="text-gray-300 text-xs leading-relaxed">
            Configure custom apparel options and submit a specifications blueprint to unlock real-time tracking portals and instant email quote alerts.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentView("quote");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-5 py-2.5 bg-[#FF7A00] hover:bg-[#e06b00] text-white font-bold rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          Configure Custom Quote
        </button>
      </div>
    </div>
  );
}
