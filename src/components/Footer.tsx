import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Globe, Printer } from "lucide-react";

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export default function Footer({ setCurrentView }: FooterProps) {
  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-[#0A2342] text-white border-t-2 border-[#1E5EFF]/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Brief */}
          <div id="footer-col-about" className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick("home")}>
              <div className="p-1.5 bg-[#1E5EFF] rounded text-white">
                <Printer className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                MN <span className="text-[#FF7A00]">PRINTS</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Based in Minnesota, we specialize in high-precision apparel manufacturing, screen printing, embroidery, DTF transfers, and custom corporate merchandise. Engineered for durability, crafted with care.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 bg-white/5 hover:bg-[#1E5EFF] rounded-md transition-colors text-gray-300 hover:text-white" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-[#1E5EFF] rounded-md transition-colors text-gray-300 hover:text-white" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-[#1E5EFF] rounded-md transition-colors text-gray-300 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-[#1E5EFF] rounded-md transition-colors text-gray-300 hover:text-white" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div id="footer-col-links" className="space-y-4">
            <h3 className="font-display font-bold text-lg text-[#FF7A00] tracking-tight border-b border-white/10 pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button onClick={() => handleNavClick("home")} className="hover:text-[#1E5EFF] transition-colors cursor-pointer">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("services")} className="hover:text-[#1E5EFF] transition-colors cursor-pointer">
                  Services & Printing
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("industries")} className="hover:text-[#1E5EFF] transition-colors cursor-pointer">
                  Industries We Serve
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("gallery")} className="hover:text-[#1E5EFF] transition-colors cursor-pointer">
                  Product Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("quote")} className="hover:text-[#1E5EFF] transition-colors cursor-pointer text-[#FF7A00] font-semibold">
                  Get a Free Quote
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("portal")} className="hover:text-[#1E5EFF] transition-colors cursor-pointer">
                  Client Tracking Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Core Capabilities */}
          <div id="footer-col-capabilities" className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white tracking-tight border-b border-white/10 pb-2">
              Our Capabilities
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#1E5EFF] rounded-full"></span>
                <span>Automatic Screen Printing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#1E5EFF] rounded-full"></span>
                <span>Digitized 3D Puff Embroidery</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#1E5EFF] rounded-full"></span>
                <span>Direct-To-Film (DTF) Transfers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#1E5EFF] rounded-full"></span>
                <span>Custom Cut & Sew Fabrication</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#1E5EFF] rounded-full"></span>
                <span>Team Uniform & Safety Programs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#1E5EFF] rounded-full"></span>
                <span>Bulk Commercial Production</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div id="footer-col-contact" className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white tracking-tight border-b border-white/10 pb-2">
              MN Prints HQ
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF7A00] shrink-0" />
                <span>Minneapolis, MN, United States<br />(Minnesota Local Production)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1E5EFF] shrink-0" />
                <a href="tel:6122863469" className="hover:text-white transition-colors">612-286-3469</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1E5EFF] shrink-0" />
                <a href="mailto:harmony.fundsfi@gmail.com" className="hover:text-white transition-colors">harmony.fundsfi@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#1E5EFF] shrink-0" />
                <a href="https://mnprints.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">mnprints.org</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Meta bottom bar */}
        <div className="border-t border-white/10 pt-8 mt-8 text-center text-xs text-gray-400 space-y-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <button onClick={() => handleNavClick("home")} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => handleNavClick("home")} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
            <button onClick={() => handleNavClick("contact")} className="hover:text-white transition-colors cursor-pointer">Sitemap</button>
            <span>Minnesota Local Business Registration</span>
          </div>

          <p id="copyright-text">
            © {new Date().getFullYear()} MN Prints. All Rights Reserved. Custom Apparel Manufactured with Precision.
          </p>

          {/* CRITICAL REQUIRED CREDIT: Developed by iWebNext */}
          <p className="text-gray-400 text-sm pt-2">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noreferrer" className="text-[#1E5EFF] hover:text-[#FF7A00] font-semibold transition-colors underline decoration-dotted">iWebNext</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
