import React, { useState } from "react";
import { ShieldCheck, Truck, Percent, MapPin, Printer, Zap, Award, ArrowRight, Star, HeartHandshake, CircleDot, Sparkles, Settings, FileText, CheckCircle2 } from "lucide-react";
import ThreeDShowcase from "./ThreeDShowcase";

interface HomeViewProps {
  setCurrentView: (view: string) => void;
}

export default function HomeView({ setCurrentView }: HomeViewProps) {
  const [miniEmail, setMiniEmail] = useState("");
  const [miniCategory, setMiniCategory] = useState("Custom Manufacturing");
  const [miniQty, setMiniQty] = useState("");
  const [miniFormSuccess, setMiniFormSuccess] = useState(false);

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMiniFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!miniEmail) return;
    setMiniFormSuccess(true);
    setTimeout(() => {
      setMiniFormSuccess(false);
      setMiniEmail("");
      setMiniQty("");
      handleNavClick("quote");
    }, 2000);
  };

  const highlights = [
    {
      icon: <Settings className="w-5 h-5 text-[#FF7A00]" />,
      title: "Custom Manufacturing",
      desc: "Full cut & sew, fabric sourcing, and pattern making capabilities built for retail brands and custom commercial projects.",
    },
    {
      icon: <Printer className="w-5 h-5 text-[#1E5EFF]" />,
      title: "Screen Printing",
      desc: "High-volume automatic M&R presses producing vibrant, long-lasting custom screen prints using soft-hand waterbase and plastisol inks.",
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-500" />,
      title: "Precision Embroidery",
      desc: "Industrial Tajima multi-needle machinery stitching high-definition 3D puff designs for polos, outerwear, and custom caps.",
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: "Direct-to-Film (DTF)",
      desc: "Full-color ultra-stretch digital transfers with incredible detail, durability, and soft hand feel for complex multi-color designs.",
    },
    {
      icon: <Truck className="w-5 h-5 text-[#1E5EFF]" />,
      title: "Fast Turnaround",
      desc: "Optimized production pipelines ensuring standard 7-10 day delivery, with guaranteed rush services for high-priority events.",
    },
    {
      icon: <Percent className="w-5 h-5 text-purple-500" />,
      title: "Bulk Wholesale Orders",
      desc: "Tiered pricing programs that scale down your cost-per-unit. High-speed automation allows us to handle thousands of items with ease.",
    },
    {
      icon: <MapPin className="w-5 h-5 text-red-500" />,
      title: "Minnesota-Based HQ",
      desc: "Stitch-engineered locally in Minneapolis, MN. We support Minnesota schools, booster clubs, healthcare teams, and businesses.",
    },
  ];

  const categories = [
    {
      id: "tees",
      title: "Premium T-Shirts",
      desc: "Combed ring-spun cotton tees, tri-blends, and heavy athletic heavyweights.",
      placement: "T-shirt production rack showing perfectly sorted custom screen-printed tees.",
      gridSpan: "md:col-span-8",
      industry: "SCHOOLS & TEAMS",
    },
    {
      id: "hoodies",
      title: "Performance Hoodies",
      desc: "Heavyweight fleece hoodies, quarter-zips, and warm fleece-lined pullovers.",
      placement: "Double-needle stitched custom embroidered athletic pullover hoodie.",
      gridSpan: "md:col-span-4",
      industry: "BOOSTER CLUBS",
    },
    {
      id: "hats",
      title: "Headwear & Caps",
      desc: "Classic 6-panel snapbacks, dad hats, structured caps, and winter knit beanies.",
      placement: "Structured snapback cap with detailed 3D puff embroidery stitch-count.",
      gridSpan: "md:col-span-4",
      industry: "RESTAURANTS",
    },
    {
      id: "corporate",
      title: "Corporate Polos & App",
      desc: "Moisture-wicking golf polos, custom woven oxford shirts, and soft shells.",
      placement: "Executive moisture-wicking polo with left-chest corporate company crest.",
      gridSpan: "md:col-span-8",
      industry: "RETAIL BRANDS",
    },
    {
      id: "safety",
      title: "Safety & Workwear",
      desc: "ANSI Class 2 & 3 high-visibility safety tees, rugged safety vests, and jackets.",
      placement: "Fluorescent neon safety vest with reflective backing ink screen print.",
      gridSpan: "md:col-span-6",
      industry: "CONSTRUCTION",
    },
    {
      id: "uniforms",
      title: "Team & Athlete Uniforms",
      desc: "Sublimated sports jerseys, active mesh practice shirts, and warm-up pants.",
      placement: "Team athletic soccer jersey with customized rear numbers and nameplate.",
      gridSpan: "md:col-span-6",
      industry: "HEALTHCARE",
    },
  ];

  const coreStrengths = [
    {
      title: "Zero-Failure Quality Auditing",
      desc: "Every single printed or embroidered garment undergoes a 3-point physical inspection for alignment, dye coverage, and thread tension before packing.",
    },
    {
      title: "Advanced In-House Prep",
      desc: "We digitize embroidery and output color-separated screens in-house, cutting out middleman delays and saving you setup fees.",
    },
    {
      title: "Dedicated Account Specialists",
      desc: "Tired of generic contact forms? Every business client gets a dedicated project coordinator to manage sizing lists, shipping dates, and custom orders.",
    },
  ];

  return (
    <div id="home-view-container" className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* ================= CLUSTER 1: HERO & CORE CAPABILITIES BENTO GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* HERO BENTO CARD */}
        <section className="lg:col-span-8 bg-[#0A2342] rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-lg border border-white/5 group">
          {/* Glowing background vector graphics */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1E5EFF] opacity-15 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none group-hover:opacity-25 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF7A00] opacity-5 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none"></div>
          
          <div className="space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E5EFF]/15 border border-[#1E5EFF]/30 rounded-full text-xs text-[#1E5EFF] font-bold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Minnesota's Premier Apparel Partner</span>
            </div>
            
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
              Custom Apparel <br />
              <span className="text-[#1E5EFF]">Manufactured</span> with <br />
              <span className="text-[#FF7A00] italic font-normal font-display">Precision.</span>
            </h1>
            
            <p className="text-gray-300 max-w-lg text-sm sm:text-base leading-relaxed">
              Minnesota's premier hub for automated screen printing, premium 3D puff embroidery, and resilient DTF transfers. Engineered locally, scaled nationwide.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 z-10">
            <button
              onClick={() => handleNavClick("quote")}
              className="px-6 py-3 bg-[#FF7A00] hover:bg-[#e06b00] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick("services")}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              Our Process
            </button>
          </div>
        </section>

        {/* CORE CAPABILITIES BENTO CARD */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:border-[#1E5EFF]/20 hover:shadow-md transition-all">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest font-mono">Core Capabilities</span>
              <CircleDot className="w-4 h-4 text-emerald-500 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3.5 bg-[#F5F7FA] rounded-2xl hover:bg-white hover:ring-1 hover:ring-[#1E5EFF]/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-100 text-[#1E5EFF] rounded-xl flex items-center justify-center font-bold text-sm font-mono">SP</div>
                  <span className="font-bold text-sm text-[#0A2342]">Screen Printing</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1E5EFF] transition-colors" />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#F5F7FA] rounded-2xl hover:bg-white hover:ring-1 hover:ring-[#1E5EFF]/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-100 text-[#FF7A00] rounded-xl flex items-center justify-center font-bold text-sm font-mono">EM</div>
                  <span className="font-bold text-sm text-[#0A2342]">Precision Embroidery</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF7A00] transition-colors" />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#F5F7FA] rounded-2xl hover:bg-white hover:ring-1 hover:ring-[#1E5EFF]/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-bold text-sm font-mono">DF</div>
                  <span className="font-bold text-sm text-[#0A2342]">Direct-to-Film (DTF)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-purple-600 transition-colors" />
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[11px] text-gray-500 italic font-medium leading-relaxed">
              "Quality you can feel, durability you can trust."
            </p>
            <button
              onClick={() => handleNavClick("services")}
              className="text-xs font-bold text-[#1E5EFF] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Detail Specs</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* ================= CLUSTER 2: QUICK STATS & LIVE TICKER & MINI FORM BENTO GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* QUICK STATS CARD (3/12 cols) */}
        <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center hover:border-gray-200 hover:shadow-md transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#1E5EFF]/5 rounded-full blur-xl pointer-events-none"></div>
          <div className="my-auto space-y-2">
            <div className="text-5xl font-extrabold text-[#1E5EFF] font-display tracking-tight">612</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0A2342] font-mono">Local Presence</div>
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-[180px] mx-auto">
              Proudly serving businesses, teams, and boosters across the Twin Cities.
            </p>
          </div>
        </div>

        {/* PRODUCTION UPDATE TICKER (6/12 cols) */}
        <div className="md:col-span-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:border-gray-200 hover:shadow-md transition-all">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-display font-bold text-sm text-[#0A2342] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span>Production Update</span>
            </h3>
            <span className="text-[10px] text-gray-400 font-mono font-bold bg-gray-100 px-2.5 py-0.5 rounded-full">LIVE FEED</span>
          </div>

          <div className="py-4 space-y-3 flex-1 flex flex-col justify-center">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-700 font-medium">
                  Currently running high-volume screen prints and multi-color embroidery batches for <strong className="text-[#0A2342]">Wayzata High School Booster Program</strong>.
                </p>
                <span className="text-[10px] text-gray-400 block mt-1">Est. Completion: 2 business hours</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-[10px] text-gray-500 font-mono ml-1">5.0 Star Rated Vetting</span>
            </div>
            <button
              onClick={() => handleNavClick("gallery")}
              className="text-[11px] font-bold text-[#1E5EFF] hover:underline cursor-pointer"
            >
              Browse Works
            </button>
          </div>
        </div>

        {/* START A PROJECT MINI FORM CARD (3/12 cols) */}
        <div className="md:col-span-3 bg-[#FF7A00] rounded-3xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <div>
            <h3 className="text-base font-extrabold uppercase tracking-wider font-display flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Start a Project</span>
            </h3>
            <p className="text-[11px] text-orange-50/90 mt-1 leading-relaxed">
              Submit your scope and get a custom quote estimate instantly.
            </p>
          </div>

          {miniFormSuccess ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-3 text-center space-y-1.5 my-3">
              <CheckCircle2 className="w-5 h-5 text-white mx-auto animate-bounce" />
              <p className="text-[10px] font-bold">Scope Received!</p>
              <p className="text-[8px] text-orange-50">Transferring to Custom Portal...</p>
            </div>
          ) : (
            <form onSubmit={handleMiniFormSubmit} className="space-y-2 mt-3">
              <input
                type="email"
                required
                value={miniEmail}
                onChange={(e) => setMiniEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-white/20 border border-white/30 rounded-xl p-2.5 text-xs placeholder:text-white/70 outline-none text-white focus:bg-white/30 transition-all"
              />
              <select
                value={miniCategory}
                onChange={(e) => setMiniCategory(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-xl p-2.5 text-xs text-white outline-none focus:bg-white/30 transition-all"
              >
                <option className="text-gray-900" value="Custom Manufacturing">Custom Manufacturing</option>
                <option className="text-gray-900" value="Bulk Screen Printing">Bulk Screen Printing</option>
                <option className="text-gray-900" value="Precision Embroidery">Embroidery Stitch</option>
              </select>
              <button
                type="submit"
                className="w-full bg-white text-[#FF7A00] font-bold py-2.5 rounded-xl text-xs transition-all hover:bg-orange-50 cursor-pointer shadow-sm uppercase tracking-wider font-mono text-[10px]"
              >
                Send Request
              </button>
            </form>
          )}
        </div>

      </div>

      {/* ================= CLUSTER 3: 3D INTERACTIVE SHOWCASE BENTO BOX ================= */}
      <section className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 hover:border-gray-200 transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E5EFF]/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#1E5EFF] uppercase tracking-wider font-mono">Aesthetic Visualizer</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#0A2342]">
              Interactive 3D Substrate Explorer
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              Live simulation of garments, thread hues, and printing layers. Drag to rotate and scale the preview.
            </p>
          </div>
          <button
            onClick={() => handleNavClick("quote")}
            className="px-4 py-2 bg-[#0A2342] text-white hover:bg-[#1E5EFF] font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Proceed to Blueprint Upload</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-[#F5F7FA] rounded-2xl overflow-hidden p-4 sm:p-6 border border-gray-200/50">
          <ThreeDShowcase />
        </div>
      </section>

      {/* ================= CLUSTER 4: APPAREL CATALOGUE (DENSE BENTO GRID) ================= */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] font-mono">Premium Materials Catalogue</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#0A2342]">
              Explore Featured Textile Substrates
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xl">
              We source ring-spun cotton and technical performance fleece directly from premium mills, transferring the savings to you.
            </p>
          </div>
          
          <button
            onClick={() => handleNavClick("gallery")}
            className="px-5 py-2.5 bg-[#1E5EFF] text-white hover:bg-[#FF7A00] font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
          >
            <span>Browse Production Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* DENSE BENTO CATALOG GRID WITH VARYING SPANS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`${cat.gridSpan} bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-[#1E5EFF]/20 transition-all group flex flex-col justify-between`}
            >
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 border-b border-gray-100 flex flex-col gap-4 min-h-[160px] relative justify-between">
                <span className="absolute top-4 right-4 text-[9px] font-bold text-[#1E5EFF] bg-[#1E5EFF]/10 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  {cat.industry}
                </span>

                <div className="space-y-2">
                  <div className="w-8 h-1 bg-[#1E5EFF] group-hover:bg-[#FF7A00] transition-colors rounded"></div>
                  <h3 className="font-display font-bold text-lg text-[#0A2342] tracking-tight">
                    {cat.title}
                  </h3>
                </div>
                
                <div className="p-3 bg-white border border-gray-100 rounded-2xl text-[11px] text-gray-500 leading-relaxed italic relative">
                  <span className="font-bold text-gray-700 block not-italic uppercase tracking-widest text-[8px] mb-0.5">Asset Instruction Checklist:</span>
                  {cat.placement}
                </div>
              </div>

              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-gray-600 text-xs sm:text-sm max-w-md">
                  {cat.desc}
                </p>
                
                <button
                  onClick={() => handleNavClick("quote")}
                  className="text-xs font-bold text-[#FF7A00] group-hover:text-[#1E5EFF] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <span>Build Run</span>
                  <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CLUSTER 5: VALUE MATRIX & QUALITY ASSURANCE BENTO GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* VALUES MATRIX (5/12 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] font-mono">Twin Cities Standards</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#0A2342] leading-tight">
              Minnesota’s Choice for Textile Sourcing
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Bypassing mid-tier broker markups, we buy textiles direct from manufacturing representatives. We maintain custom embroidery proof kits to guarantee absolute sizing accuracy before launching full-speed production.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0A2342]">Computerized Tajima Systems</h4>
                <p className="text-xs text-gray-500">15-needle professional heads stitch high-definition 3D graphics.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0A2342]">Full Sizing Proof Kit</h4>
                <p className="text-xs text-gray-500">Unsure of fits? We ship structural sizing samples directly to your coordinator.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CORE STRENGTHS CHECKLIST BENTO (7/12 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {coreStrengths.map((str, i) => (
            <div
              key={i}
              className="bg-[#0A2342] text-white p-6 rounded-3xl shadow-sm border border-white/5 space-y-4 flex flex-col justify-between hover:border-[#1E5EFF]/30 transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#1E5EFF]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#FF7A00]/10 transition-colors"></div>
              <span className="text-3xl font-mono font-bold text-[#FF7A00]">0{i + 1}</span>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-white tracking-tight">
                  {str.title}
                </h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {str.desc}
                </p>
              </div>
              <div className="w-6 h-1 bg-[#1E5EFF] rounded"></div>
            </div>
          ))}
        </div>

      </div>

      {/* ================= CLUSTER 6: TESTIMONIALS (HIGH-CONTRAST BENTO MATRIX) ================= */}
      <section className="bg-gradient-to-br from-[#0A2342] to-[#0d2a4e] text-white py-12 px-6 sm:px-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#1E5EFF]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-[#FF7A00]">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Satisfied Procurement Audits</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Minnesota Voices of Credibility
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm">
            Read comments from commercial managers, high school athletic coaches, and booster clubs who trust our automatic lines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {[
            {
              quote: "MN Prints turned around 450 custom 3D-puff embroidered hats for our regional conference in record time. The quality audit was real—not a single loose thread on any of the snapbacks.",
              author: "Sarah Lindqvist",
              role: "Procurement Lead",
              entity: "Twin Cities Tech Corp",
              city: "Minneapolis, MN",
            },
            {
              quote: "As a booster club, we used to run into countless size mismatches. MN Prints provided a blank sizing proof kit which allowed parents to check fit beforehand. The screen printing is incredibly soft.",
              author: "Coach Marcus Vance",
              role: "Athletics Coordinator",
              entity: "Duluth High School",
              city: "Duluth, MN",
            },
            {
              quote: "The team uniform sublimated jerseys they manufactured for our statewide nursing uniform program were sensational. Moisture wicking, comfortable, and matching our Navy color values exactly.",
              author: "Evelyn Ross, RN",
              role: "Operations Director",
              entity: "MN Health Alliance",
              city: "Rochester, MN",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:bg-white/10 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-200 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 space-y-1">
                <span className="block font-bold text-xs sm:text-sm text-white">{t.author}</span>
                <span className="block text-xs text-gray-400">{t.role} — {t.entity}</span>
                <span className="inline-block text-[10px] uppercase tracking-wider text-[#FF7A00] font-mono font-semibold">{t.city}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CLUSTER 7: FINAL CALL-TO-ACTION BENTO BLOCK ================= */}
      <section className="bg-[#1E5EFF] text-white p-8 sm:p-10 rounded-[2.5rem] text-center space-y-6 shadow-lg shadow-[#1E5EFF]/20 relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 border-4 border-white/10 rounded-full"></div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 border-4 border-white/15 rounded-full"></div>

        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
          Ready to Elevate Your Custom Merch?
        </h3>
        <p className="text-white/90 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Upload vector blueprints, configure fabric parameters, or claim sizing run kit packages. Our Minneapolis-based textile team is standing by.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => handleNavClick("quote")}
            className="px-6 py-3 bg-[#FF7A00] hover:bg-[#e06b00] text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            Get Free Estimate
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="px-6 py-3 bg-[#0A2342] hover:bg-[#071930] text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
          >
            Speak with a Specialist
          </button>
        </div>
      </section>

    </div>
  );
}
