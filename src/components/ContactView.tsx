import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, AlertTriangle, MessageSquare, Loader2 } from "lucide-react";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Bulk Wholesale Catalog",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    // Form inputs validation check
    if (!formData.name.trim()) return setFormError("Please enter your name.");
    if (!formData.email.trim()) return setFormError("Please enter your email.");
    if (!formData.message.trim()) return setFormError("Please write a brief message description.");

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to transmit contact record.");
      }

      setFormSuccess(true);
      // reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Bulk Wholesale Catalog",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setFormError("Communication failure. Please email harmony.fundsfi@gmail.com directly or call 612-286-3469.");
    } finally {
      setIsLoading(false);
    }
  };

  const subjectOptions = [
    "Bulk Wholesale Catalog",
    "Booster Club Programs",
    "Artwork Setup & Separation",
    "Corporate Account Sourcing",
    "USPS Shipment Issue",
    "Sizing Proof Kits",
  ];

  return (
    <div id="contact-view-container" className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Title block */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] bg-[#FF7A00]/10 px-3.5 py-1 rounded-full">
          Get In Touch Locally
        </span>
        <h1 className="font-display font-extrabold text-4xl tracking-tight text-[#0A2342]">
          Contact MN Prints
        </h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          Need custom embroidery consultations, sizing blankets, or direct bulk pricing lists? Speak to a Minnesota-based textile specialist today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Contact Information Cards & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0A2342] text-white p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E5EFF]/10 rounded-full blur-2xl"></div>
            
            <h3 className="font-display font-bold text-lg text-white tracking-tight">
              Minnesota HQ Offices
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Physical Production Plant</strong>
                  <span>Minneapolis, MN, United States</span>
                  <span className="text-[11px] text-gray-400 block mt-0.5">(Quick-turn regional shipping hub)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#1E5EFF] shrink-0" />
                <div>
                  <strong className="block text-white font-semibold">Phone Inquiries</strong>
                  <a href="tel:6122863469" className="hover:text-white transition-colors underline decoration-dotted">612-286-3469</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1E5EFF] shrink-0" />
                <div>
                  <strong className="block text-white font-semibold">Client Relations Desk</strong>
                  <a href="mailto:harmony.fundsfi@gmail.com" className="hover:text-white transition-colors underline decoration-dotted">harmony.fundsfi@gmail.com</a>
                </div>
              </div>
            </div>

            <hr className="border-white/10" />

            {/* Operational hours */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Operational Hours</span>
              </span>
              <ul className="text-xs text-gray-300 space-y-1 font-mono">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-bold text-white">8:00 AM - 5:00 PM CST</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-gray-400">By Appointment Only</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday & Holidays:</span>
                  <span className="text-gray-400">Closed (Stitch Off)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* SUGGESTED IMAGE PLACEHOLDER FOR LOCAL HEADQUARTERS */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-3xl space-y-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#1E5EFF] font-bold block">HQ Photo Placement:</span>
            <p className="text-xs text-gray-500 italic leading-relaxed">
              Placement: Clean architectural photo showing the brick exterior facade of the MN Prints apparel manufacturing warehouse in Minneapolis, complete with a professional street banner logo.
            </p>
          </div>
        </div>

        {/* Right Side: validated contact form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleContactSubmit} className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-10 space-y-6">
            <h3 className="font-display font-bold text-lg text-[#0A2342] tracking-tight border-b border-gray-100 pb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#1E5EFF]" />
              <span>Send Secure Message</span>
            </h3>

            {formError && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-xs text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Message successfully routed! An account coordinator will response within 2 business hours.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="612-555-0199"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                >
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project, target quantities, fabric colors, or specific thread requirements..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#1E5EFF] hover:bg-[#FF7A00] text-white font-bold rounded-xl text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Transmitting Secure Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Dispatch Message</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-gray-400 text-center flex items-center gap-1 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Secure contact gateway. Checked for malware.</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
