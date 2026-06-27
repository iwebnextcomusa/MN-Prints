import React from "react";
import { GraduationCap, Building2, HardHat, HeartPulse, UtensilsCrossed, Trophy, Heart, Shield, CalendarDays, ShoppingBag, ArrowRight } from "lucide-react";

interface IndustriesViewProps {
  setCurrentView: (view: string) => void;
}

export default function IndustriesView({ setCurrentView }: IndustriesViewProps) {
  const industries = [
    {
      icon: <GraduationCap className="w-5 h-5 text-indigo-500" />,
      title: "Schools & Academics",
      desc: "Class shirts, field trip wear, marching band uniforms, club tees, and parent-teacher booster merchandise.",
      garments: "Recommended: Combed Cotton Tees, Mid-weight fleece hoodies.",
      decorations: "Printing: High-speed Screen Printing & DTF transfers.",
      benefit: "Booster Bonus: 10% discount & free pre-press art prep.",
      tag: "ACADEMICS",
      span: "md:col-span-6 lg:col-span-4",
    },
    {
      icon: <Building2 className="w-5 h-5 text-blue-500" />,
      title: "Businesses & Corporate",
      desc: "Branded client giveaways, trade show staff polos, company retreat outerwear, and corporate office wearables.",
      garments: "Recommended: Moisture-wicking golf polos, fleece jackets, soft-shell vests.",
      decorations: "Printing: Left-chest Embroidery & soft monochrome prints.",
      benefit: "Corporate SLA: Private client account with custom sizes list.",
      tag: "CORPORATE",
      span: "md:col-span-6 lg:col-span-4",
    },
    {
      icon: <HardHat className="w-5 h-5 text-amber-500" />,
      title: "Construction & Industrial",
      desc: "High-visibility safety wear designed to withstand rugged field wear, extreme washings, and high-abrasion activities.",
      garments: "Recommended: ANSI Class 2/3 reflective safety tees, canvas work jackets.",
      decorations: "Printing: Heavy-wear Plastisol Screen Printing with reflective ink.",
      benefit: "Compliance: OSHA & ANSI high-visibility standards guarantee.",
      tag: "RUGGED FIELD",
      span: "md:col-span-12 lg:col-span-4",
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-emerald-500" />,
      title: "Healthcare & Biotech",
      desc: "Staff identification wear, nursing scrubs, pediatric volunteer tees, and hospital outreach programs.",
      garments: "Recommended: Soft-stretch scrubs, antimicrobial polo apparel.",
      decorations: "Printing: Clean flat Embroidery & stretch DTF logos.",
      benefit: "Sanitizer Ready: Ink formulas resistant to commercial sanitizers.",
      tag: "MEDICAL",
      span: "md:col-span-6",
    },
    {
      icon: <UtensilsCrossed className="w-5 h-5 text-rose-500" />,
      title: "Restaurants & Hospitality",
      desc: "Pristine chef coats, servers, bartending crew tees, heavy utility canvas aprons, and hospitality caps.",
      garments: "Recommended: Canvas chest aprons, combed lightweight server tees.",
      decorations: "Printing: Heat-resistant prints & soil-release flat Embroidery.",
      benefit: "Grease Treated: Treated fibers for oil resistance and easy washing.",
      tag: "HOSPITALITY",
      span: "md:col-span-6",
    },
    {
      icon: <Trophy className="w-5 h-5 text-[#FF7A00]" />,
      title: "Sports Teams & Athletics",
      desc: "Sublimated team jerseys, coaches' golf wear, mesh training shorts, tracksuits, and athlete duffels.",
      garments: "Recommended: Polyester dry-fit mesh, stretch jersey fabrics.",
      decorations: "Printing: CAD-cut custom nameplates & stretch vector numbers.",
      benefit: "High Flex: Adhesives that won't crack under athletic stretching.",
      tag: "ATHLETICS",
      span: "md:col-span-6 lg:col-span-4",
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: "Nonprofits & Fundraisers",
      desc: "Volunteer crew shirts, walkathon giveaways, awareness charity pins, and donor appreciation branded apparel.",
      garments: "Recommended: Value-grade cotton promo tees, budget totes.",
      decorations: "Printing: Economical high-speed waterbase Screen Printing.",
      benefit: "Tax Deductions: Specialized 501(c)(3) tax exemption discounts.",
      tag: "NONPROFIT",
      span: "md:col-span-6 lg:col-span-4",
    },
    {
      icon: <Shield className="w-5 h-5 text-slate-500" />,
      title: "Government & Municipal",
      desc: "Public safety outerwear, volunteer fire team pullovers, sanitation crew safety high-visibilities, and city parks crew apparel.",
      garments: "Recommended: Rugged tactical polos, all-weather ripstop parkas.",
      decorations: "Printing: Official seal micro-stitching & high-contrast screen.",
      benefit: "GSA Sourced: Compliant pipelines and secure purchase-order matching.",
      tag: "MUNICIPAL",
      span: "md:col-span-12 lg:col-span-4",
    },
    {
      icon: <CalendarDays className="w-5 h-5 text-[#1E5EFF]" />,
      title: "Events & Festivals",
      desc: "Commemorative music festival shirts, food-truck rally uniforms, corporate expo badges, and grand openings.",
      garments: "Recommended: Lightweight combed cotton tees, draw-string bags.",
      decorations: "Printing: 12-color high-impact screen printing & DTF gradients.",
      benefit: "Hard Deadlines: Delivery scheduled precisely around event timelines.",
      tag: "LIVE EVENT",
      span: "md:col-span-6",
    },
    {
      icon: <ShoppingBag className="w-5 h-5 text-purple-500" />,
      title: "Retail & Streetwear Brands",
      desc: "Heavyweight boxy hoodies, vintage drop-shoulder tees, private label necktags, and high-end retail apparel.",
      garments: "Recommended: Heavy french terry fleece, garment-dyed ring cottons.",
      decorations: "Printing: Discharge screen print, custom puff, and interior necktags.",
      benefit: "Private Labels: Custom tear-away sew-in tags and individual polybagging.",
      tag: "STREETWEAR",
      span: "md:col-span-6",
    },
  ];

  return (
    <div id="industries-view-container" className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* ================= HEADER BENTO CARD ================= */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gray-200 transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E5EFF]/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF7A00]/10 text-[#FF7A00] rounded-full text-xs font-bold uppercase tracking-wider font-mono">
            <span>Industry Segments</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0A2342]">
            Industries <span className="text-[#1E5EFF]">We Serve</span>
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            We adapt our fabric blends, ink systems, and wholesale volume tiers to match the exact physical challenges and budgetary constraints of your specific sector.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentView("quote");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-6 py-3.5 bg-[#0A2342] hover:bg-[#1E5EFF] text-white font-bold rounded-xl text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink-0"
        >
          <span>Get Free Estimate</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* ================= INDUSTRIES BENTO GRID ================= */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {industries.map((ind) => (
          <div
            key={ind.title}
            className={`${ind.span} bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#1E5EFF]/20 transition-all flex flex-col justify-between group`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 bg-[#F5F7FA] text-gray-700 rounded-xl flex items-center justify-center group-hover:bg-[#1E5EFF]/10 group-hover:text-[#1E5EFF] transition-colors">
                  {ind.icon}
                </div>
                <span className="text-[9px] font-bold text-gray-400 font-mono tracking-wider uppercase bg-gray-100 px-2.5 py-0.5 rounded">
                  {ind.tag}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-[#0A2342] tracking-tight group-hover:text-[#1E5EFF] transition-colors">
                  {ind.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-500 space-y-1.5">
              <p className="font-semibold text-gray-700">{ind.garments}</p>
              <p className="text-gray-500">{ind.decorations}</p>
              <div className="p-2 bg-gradient-to-br from-[#FF7A00]/5 to-transparent border border-[#FF7A00]/10 rounded-xl text-[#FF7A00] font-mono font-bold mt-2 uppercase tracking-wide text-[10px] text-center">
                {ind.benefit}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ================= CONTRACT CTA BENTO CARD ================= */}
      <section className="bg-[#1E5EFF] text-white p-8 sm:p-10 rounded-[2.5rem] text-center space-y-6 shadow-lg shadow-[#1E5EFF]/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF7A00]/10 transition-colors"></div>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
          Need a Commercial Uniform Contract?
        </h3>
        <p className="text-white/90 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          From multi-branch clinic networks to regional construction crews, we establish long-term quarter-system uniform dispatch agreements with locked wholesale margins. Let our team structure an agreement for you.
        </p>
        <button
          onClick={() => {
            setCurrentView("quote");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-6 py-3.5 bg-[#0A2342] hover:bg-[#071930] text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all cursor-pointer inline-flex items-center gap-1 shadow-md"
        >
          <span>Structure Custom Contract</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
}
