import React, { useState, useEffect } from "react";
import { Menu, X, Printer, Shield, User, FileText } from "lucide-react";
import { User as UserType } from "../types";

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  currentUser: UserType | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export default function Header({ currentView, setCurrentView, currentUser, onLoginClick, onLogoutClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "industries", label: "Industries Served" },
    { id: "gallery", label: "Gallery" },
    { id: "quote", label: "Request a Quote" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A2342] shadow-xl border-b border-[#1E5EFF]/20 py-3"
          : "bg-[#0A2342]/90 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Branding */}
          <div
            id="header-brand"
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => handleNavClick("home")}
          >
            <div className="p-2 bg-[#1E5EFF] rounded-lg text-white font-bold tracking-wider group-hover:bg-[#FF7A00] transition-colors shadow-lg shadow-[#1E5EFF]/20">
              <Printer className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight flex items-center gap-1.5">
                MN <span className="text-[#FF7A00]">PRINTS</span>
              </span>
              <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                Apparel Manufacturing
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  currentView === item.id
                    ? "bg-[#1E5EFF] text-white shadow-lg shadow-[#1E5EFF]/25"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Auth Portal & CTA buttons */}
          <div id="desktop-ctas" className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  id="nav-btn-portal-active"
                  onClick={() => handleNavClick("portal")}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    currentView === "portal"
                      ? "bg-[#FF7A00] text-white shadow-lg"
                      : "text-gray-300 bg-white/5 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <User className="w-4 h-4 text-[#FF7A00]" />
                  <span>My Portal</span>
                </button>
                <button
                  id="header-logout-btn"
                  onClick={onLogoutClick}
                  className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={onLoginClick}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg text-gray-300 hover:text-white hover:bg-white/5 border border-white/10 transition-all cursor-pointer"
              >
                <Shield className="w-4 h-4 text-[#1E5EFF]" />
                <span>Client Portal</span>
              </button>
            )}

            <button
              id="header-quote-cta"
              onClick={() => handleNavClick("quote")}
              className="px-4.5 py-2.5 bg-[#FF7A00] hover:bg-[#e06b00] text-white text-sm font-bold rounded-lg transition-all shadow-md shadow-[#FF7A00]/20 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              id="mobile-portal-icon-btn"
              onClick={() => currentUser ? handleNavClick("portal") : onLoginClick()}
              className={`p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 ${
                currentView === "portal" ? "text-[#FF7A00]" : ""
              }`}
            >
              <User className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-drawer" className="lg:hidden bg-[#0A2342] border-t border-[#1E5EFF]/10 py-4 px-4 shadow-2xl transition-all duration-300">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                  currentView === item.id
                    ? "bg-[#1E5EFF] text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <hr className="border-white/10 my-2" />
            <div className="flex flex-col gap-2 pt-2">
              <button
                id="mobile-portal-btn"
                onClick={() => {
                  if (currentUser) {
                    handleNavClick("portal");
                  } else {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg text-base font-semibold border border-white/10 transition-all ${
                  currentView === "portal" ? "bg-white/10 text-[#FF7A00]" : "text-gray-300"
                }`}
              >
                <User className="w-5 h-5 text-[#1E5EFF]" />
                <span>{currentUser ? `${currentUser.name}'s Portal` : "Client Portal"}</span>
              </button>
              
              {currentUser && (
                <button
                  id="mobile-logout-btn"
                  onClick={() => {
                    onLogoutClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  Sign Out
                </button>
              )}

              <button
                id="mobile-quote-btn"
                onClick={() => handleNavClick("quote")}
                className="w-full py-3 bg-[#FF7A00] text-center text-white font-bold rounded-lg shadow-lg"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
