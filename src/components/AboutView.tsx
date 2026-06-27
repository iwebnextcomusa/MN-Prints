import React from "react";
import { Award, ShieldCheck, Heart, MapPin, CheckCircle, Clock, Settings, Users, ArrowRight } from "lucide-react";

export default function AboutView() {
  const values = [
    {
      icon: <Award className="w-5 h-5 text-[#FF7A00]" />,
      title: "Commitment to Craftsmanship",
      desc: "We stitch-engineer and ink-print every item to exceed typical commercial apparel lifespans. We source only durable ring-spun fibers, high-density threads, and robust plastisol or eco-conscious waterbase inks.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#1E5EFF]" />,
      title: "Zero-Defect Quality Gaps",
      desc: "Our quality auditors examine individual print parameters, mesh tensions, and stitch backing. Not a single product leaves our Minneapolis facility without passing our 3-stage physical validation checklist.",
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: "Active Community Support",
      desc: "We offer special pricing structures to local Minnesota high school booster clubs, athletic teams, local volunteer fire stations, and registered 501(c)(3) nonprofit organizations.",
    },
  ];

  const milestones = [
    { year: "2018", title: "Inception in MN", desc: "Started with a single manual screen press and a twin-needle embroidery rig in Minneapolis." },
    { year: "2020", title: "Automated Press Station", desc: "Upgraded to high-speed automatic M&R screen printing lines, cutting production turnaround times in half." },
    { year: "2022", title: "Tajima Fleet & DTF Integration", desc: "Acquired custom Japanese Tajima multi-head systems and digitized 3D puff designs for headwear programs." },
    { year: "2024", title: "Client Portal Rollout", desc: "Integrated fully automated online quote calculators, digitized order histories, and secure USPS/tracking status APIs." },
  ];

  return (
    <div id="about-view-container" className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* ================= CLUSTER 1: ABOUT INTRO BENTO GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Intro Header Box (8/12 cols) */}
        <section className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm flex flex-col justify-between hover:border-gray-200 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E5EFF]/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E5EFF]/10 rounded-full text-xs text-[#1E5EFF] font-bold uppercase tracking-wider font-mono">
              <span>Our Legacy & Story</span>
            </div>
            
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0A2342] leading-tight tracking-tight">
              Based in Minnesota, <br />
              Built for the <span className="text-[#FF7A00]">Whole Nation</span>
            </h1>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              MN Prints is a premier, full-scale custom apparel manufacturer and printing facility based locally in Minnesota. We provide top-tier, industrial-scale screen printing, precision embroidery, and custom garment fabrication.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100 mt-6 text-gray-500 text-xs flex items-center gap-2">
            <span className="font-bold text-[#0A2342] uppercase tracking-wider font-mono">EST. 2018</span>
            <span>•</span>
            <span>Minneapolis Headquarters</span>
          </div>
        </section>

        {/* Manufacturing Commitments Quick Box (4/12 cols) */}
        <div className="lg:col-span-4 bg-[#0A2342] text-white rounded-3xl p-6 sm:p-8 border border-white/5 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#FF7A00]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-wider font-mono">Our Plant</span>
            <h3 className="font-display font-bold text-lg text-white tracking-tight">
              Capacity & Craft
            </h3>
            
            <div className="space-y-3.5 pt-2">
              <div className="flex gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-[#1E5EFF] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  Located in Minneapolis, MN. Vetted for quick-turn freight and bulk commercial dispatch.
                </p>
              </div>
              <div className="flex gap-2.5">
                <Settings className="w-4.5 h-4.5 text-[#1E5EFF] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  Automatic screen printers, tunnel dryers, and computerized Tajima embroidery rigs.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-6">
            <div className="bg-white/5 rounded-xl p-3 text-[10px] space-y-1">
              <span className="font-mono uppercase tracking-widest text-[#FF7A00] block font-bold">Image Instruction:</span>
              <p className="italic text-gray-400">
                A high-speed automatic 12-color screen press spinning combed-cotton garments through drying heat tunnels.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ================= CLUSTER 2: FULL STORY BENTO BLOCK ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6 hover:border-gray-200 transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-display font-extrabold text-2xl text-[#0A2342] tracking-tight">
              The Journey of MN Prints
            </h2>
            <div className="text-gray-600 text-xs sm:text-sm leading-relaxed space-y-4">
              <p>
                What started as a small, specialized custom apparel outfit in the Twin Cities has evolved into one of the region’s most advanced textile decoration facilities. We founded MN Prints on a simple, unbreakable premise: custom apparel should never feel cheap, and turnaround times shouldn’t be a guessing game.
              </p>
              <p>
                By investing in automatic industrial screen presses and computerized multi-needle embroidery stations, we can handle heavy commercial production of t-shirts, athletic sweaters, hats, and safety gear. However, we remain humble and highly localized—every customer gets a dedicated design coordinator who acts as a single point of contact.
              </p>
              <p>
                Today, we serve major commercial supply chains, corporate headquarters, schools, booster clubs, and retail brands across the United States. We source directly from major apparel mills to bypass markup fees, ensuring our clients receive wholesale rates without sacrificing quality.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#F5F7FA] rounded-2xl p-6 border border-gray-200/60 space-y-4">
            <h4 className="font-display font-bold text-sm text-[#0A2342] tracking-tight uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Users className="w-4 h-4 text-[#1E5EFF]" />
              <span>Midwest Transit</span>
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our Minneapolis-based manufacturing center allows us to rapidly dispatch shipments with fast ground shipping timelines to Illinois, Iowa, Wisconsin, North Dakota, South Dakota, and nationwide.
            </p>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2 text-[11px] text-emerald-800">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Bulk orders qualify for free freight deliveries.</span>
            </div>
          </div>

        </div>
      </div>

      {/* ================= CLUSTER 3: CORE VALUES (3 BENTO CARDS) ================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] font-mono">Our Principles</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0A2342] tracking-tight">
            Our Core Company Values
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            We anchor our manufacturing processes around strict parameters of quality control, absolute transparency, and localized coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:border-[#1E5EFF]/20 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#1E5EFF]/5 text-[#1E5EFF] rounded-xl flex items-center justify-center">
                  {v.icon}
                </div>
                <h3 className="font-display font-bold text-base text-[#0A2342] tracking-tight">
                  {v.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
              <div className="w-8 h-1 bg-[#1E5EFF] rounded mt-2"></div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CLUSTER 4: HISTORICAL MILESTONES TIMELINE BENTO ================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E5EFF] font-mono">Timeline History</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0A2342] tracking-tight">
            Our Historic Footprint
          </h2>
          <p className="text-gray-500 text-xs">
            Trace the steady, structured scale-up of MN Prints' commercial capacities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="bg-[#0A2342] text-white p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-[#FF7A00]/40 transition-all flex flex-col justify-between min-h-[180px]"
            >
              <div className="absolute top-2 right-2 p-2 font-display font-black text-5xl text-white/[0.03] group-hover:text-[#FF7A00]/5 transition-colors pointer-events-none">
                {m.year}
              </div>
              
              <div className="space-y-2 relative z-10">
                <span className="inline-block px-2.5 py-0.5 bg-[#FF7A00] text-white rounded-md text-[10px] font-mono font-bold">
                  {m.year}
                </span>
                <h3 className="font-display font-bold text-sm text-white tracking-tight">
                  {m.title}
                </h3>
              </div>
              
              <p className="text-gray-300 text-xs leading-relaxed relative z-10 pt-4 border-t border-white/5">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
