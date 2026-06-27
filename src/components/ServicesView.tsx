import React from "react";
import { Printer, Award, Zap, Flame, Settings, Briefcase, Gift, ShieldAlert, Brush, BarChart, ArrowRight, CheckCircle2 } from "lucide-react";

interface ServicesViewProps {
  setCurrentView: (view: string) => void;
}

export default function ServicesView({ setCurrentView }: ServicesViewProps) {
  const services = [
    {
      icon: <Printer className="w-5 h-5 text-[#1E5EFF]" />,
      title: "Screen Printing",
      desc: "Our high-speed automatic M&R screen printing carousels produce consistent, razor-sharp ink coverage across massive bulk runs. Suited for tees, hoodies, and activewear.",
      stats: "Capacity: 10,000+ prints/day",
      suited: "Best for: 36+ items, t-shirts, promotional runs, booster events.",
      ink: "Inks: Soft-hand waterbase, premium long-wear plastisol, discharge.",
      placement: "Image suggestion: Automatic squeegee depositing royal blue ink onto a soft cotton t-shirt.",
      badge: "HIGH CAPACITY",
    },
    {
      icon: <Award className="w-5 h-5 text-[#FF7A00]" />,
      title: "Precision Embroidery",
      desc: "Computerized, Japanese Tajima 15-needle embroidery machines sew high-definition, dimensionally rich puff and flat thread designs into garments.",
      stats: "Capacity: 1,500+ items/day",
      suited: "Best for: Corporate polos, winter caps, hats, structured outerwear, fleece.",
      ink: "Materials: Premium poly-neon threads, 3D foam backings.",
      placement: "Image suggestion: Computerized needles stitching a company crest into black outerwear.",
      badge: "PREMIUM STITCH",
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: "Direct-To-Film (DTF)",
      desc: "Our full-color digital DTF printer generates highly stretchable, paper-thin heat transfers with stunning photorealistic details and durable wash fastness.",
      stats: "Capacity: 800+ transfers/day",
      suited: "Best for: Photographic art, complex multi-color gradients, back numbers.",
      ink: "Materials: Premium stretch TPU powder adhesives, matte release films.",
      placement: "Image suggestion: Heat press transferring a complex gradient logo onto a sports tank top.",
      badge: "VIBRANT DETAIL",
    },
    {
      icon: <Flame className="w-5 h-5 text-red-500" />,
      title: "Heat Transfer Vinyl",
      desc: "Heavy-duty CAD-cut heat press applications designed for high-end activewear, customized nameplates, and numbered sports uniforms.",
      stats: "Capacity: 500+ items/day",
      suited: "Best for: Sports jerseys, custom nameplates, reflective safety clothing.",
      ink: "Materials: Thermo-transfer film, stretch flex vinyl, metallic films.",
      placement: "Image suggestion: Sports jerseys sorted on a table with white backing numbers.",
      badge: "ATHLETICS RUN",
    },
    {
      icon: <Settings className="w-5 h-5 text-[#0A2342]" />,
      title: "Apparel Manufacturing",
      desc: "Full-scale vertical manufacturing including material sourcing, fabric pattern design, private label manufacturing, and custom cut & sew programs.",
      stats: "Minimums: 144+ pieces",
      suited: "Best for: Retail fashion brands, custom corporate outerwear programs.",
      ink: "Fabrics: Heavy combed cotton, loopback french terry, bamboo blends.",
      placement: "Image suggestion: Pattern specialist cutting heavy french terry with rotary blade.",
      badge: "CUSTOM BUILD",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-[#1E5EFF]" />,
      title: "Corporate Apparel",
      desc: "Comprehensive branded apparel programs for professional workforces. Outfitting your corporate crew, sales teams, and management.",
      stats: "Dedicated coordinators",
      suited: "Best for: Woven oxfords, moisture-wicking golf polos, canvas bags.",
      ink: "Brands: Nike, TravisMathew, Under Armour, Carhartt, Patagonia.",
      placement: "Image suggestion: Folded premium embroidered polo shirts stacked neatly.",
      badge: "WORKPLACE PRO",
    },
    {
      icon: <Gift className="w-5 h-5 text-[#FF7A00]" />,
      title: "Promotional Products",
      desc: "Extend your brand beyond apparel. We stamp, laser-engrave, and screen print custom logos onto premium promotional hardware.",
      stats: "Hundreds of items",
      suited: "Best for: Stainless insulated tumblers, canvas tote bags, custom pens.",
      ink: "Brands: Yeti, Stanley, Hydro Flask, Moleskine.",
      placement: "Image suggestion: Laser-engraving machine etching a vector logo onto a tumbler.",
      badge: "BRAND EXTENSION",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-emerald-600" />,
      title: "Uniforms & Workwear",
      desc: "Outfit industrial teams, healthcare networks, high-visibility construction crews, and hospitality staffs under a single contract.",
      stats: "ANSI/OSHA compliant",
      suited: "Best for: High-visibility tees, scrubs, restaurant chef coats.",
      ink: "Durability: Triple-needle seams, soil-release coatings, canvas panels.",
      placement: "Image suggestion: Heavy utility jacket with high-visibility reflective stripes.",
      badge: "RUGGED RATED",
    },
    {
      icon: <Brush className="w-5 h-5 text-purple-500" />,
      title: "Design Assistance",
      desc: "Our pre-press design crew will review your raster files, vectorize pixelated files, separate ink colors, and prepare digital proofs for signoff.",
      stats: "Free on bulk runs",
      suited: "Best for: Converting rough sketches, low-res JPEGs into clean vector form.",
      ink: "Software: Adobe Illustrator, CorelDRAW, Wilcom Embroidery.",
      placement: "Image suggestion: Designer cleaning up vector lines of a client logo on tablet.",
      badge: "PRE-PRESS STUDIO",
    },
    {
      icon: <BarChart className="w-5 h-5 text-[#0A2342]" />,
      title: "High-Volume Bulk Runs",
      desc: "Equipped to handle massive production requests. Our industrial automated presses and multi-head embroidery rigs run 24/7.",
      stats: "SLA delivery guarantee",
      suited: "Best for: Large orders of 1,000 to 50,000+ items. Perfect for retail lines.",
      ink: "Logistics: Palletized packing, custom labeling, split-destination shipping.",
      placement: "Image suggestion: Staging rack packed with labeled boxes ready for dock pick up.",
      badge: "ENTERPRISE",
    },
  ];

  return (
    <div id="services-view-container" className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* ================= HEADER BENTO CARD ================= */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gray-200 transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A00]/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1E5EFF]/10 text-[#1E5EFF] rounded-full text-xs font-bold uppercase tracking-wider font-mono">
            <span>Core Capabilities Desk</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0A2342]">
            Our Apparel <span className="text-[#FF7A00]">Manufacturing</span> Services
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Stitch-for-stitch, print-for-print, we maintain absolute quality metrics locally. Review our physical decoration methods, materials guidelines, and automated production tiers.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentView("quote");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-6 py-3.5 bg-[#1E5EFF] hover:bg-[#FF7A00] text-white font-bold rounded-xl text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink-0"
        >
          <span>Request Quote</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* ================= SERVICES BENTO GRID ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.title}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1E5EFF]/25 transition-all flex flex-col justify-between overflow-hidden group"
          >
            {/* Upper Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F5F7FA] text-gray-700 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1E5EFF]/10 group-hover:text-[#1E5EFF] transition-colors">
                    {srv.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-base sm:text-lg text-[#0A2342] tracking-tight">
                      {srv.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#1E5EFF] font-bold uppercase tracking-wider">{srv.stats}</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-mono uppercase tracking-wider shrink-0">
                  {srv.badge}
                </span>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {srv.desc}
              </p>

              <div className="space-y-1.5 text-xs text-gray-500 pt-3 border-t border-gray-100">
                <p className="font-semibold text-gray-700">{srv.suited}</p>
                <p className="text-gray-500">{srv.ink}</p>
              </div>
            </div>

            {/* Lower Asset Instruction Box */}
            <div className="px-6 pb-6 pt-0">
              <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl text-[10px] leading-relaxed text-gray-400 italic border border-gray-100/80">
                <span className="font-bold text-gray-500 block not-italic uppercase tracking-wider text-[8px] mb-0.5">Mockup Vector Specification:</span>
                {srv.placement}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ================= BOTTOM PROGRAM CALL OUT BENTO CARD ================= */}
      <section className="bg-[#0A2342] text-white p-8 sm:p-10 rounded-[2.5rem] border border-white/5 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#1E5EFF]/15 rounded-full blur-3xl pointer-events-none group-hover:opacity-25 transition-opacity"></div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-wider font-mono">Comprehensive Contracts</span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Custom Uniform & Apparel Programs
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Managing custom sizing lists, artwork adjustments, and order deadlines for an entire healthcare organization, regional school booster club, or commercial utility crew doesn't have to be overwhelming. Let our specialists construct a secure portal setup for you.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <button
              onClick={() => {
                setCurrentView("quote");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-3.5 bg-[#FF7A00] hover:bg-[#e06b00] text-white font-bold rounded-xl text-xs sm:text-sm tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>Build My Program</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
