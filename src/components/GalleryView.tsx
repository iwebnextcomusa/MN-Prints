import React, { useState } from "react";
import { Search, Filter, Camera, ArrowUpRight, Grid, LayoutList } from "lucide-react";

interface GalleryItem {
  id: string;
  category: "tees" | "hoodies" | "hats" | "polos" | "safety" | "uniforms" | "embroidery";
  title: string;
  desc: string;
  specs: string;
  placement: string;
  tags: string[];
}

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "All Portfolio" },
    { id: "tees", label: "T-Shirts" },
    { id: "hoodies", label: "Hoodies & Fleeces" },
    { id: "hats", label: "Custom Headwear" },
    { id: "polos", label: "Corporate Polos" },
    { id: "safety", label: "Safety Wear" },
    { id: "uniforms", label: "Team Jerseys" },
    { id: "embroidery", label: "Embroidery Close-ups" },
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: "gal-1",
      category: "tees",
      title: "Twin Cities Coffee Co. Tees",
      desc: "Waterbase soft-hand screen print on premium combed ring-spun cotton. Deep rich brown ink layered with cream highlights.",
      specs: "Decor: 2-Color Screen Print | Fabric: Bella+Canvas 3001 Navy",
      placement: "Image: A folded navy t-shirt resting on a light wood surface, showcasing a circular brown coffee-bean logo screen printed on the center chest with sharp resolution.",
      tags: ["Soft-Hand", "Screen Print", "Waterbase"],
    },
    {
      id: "gal-2",
      category: "hoodies",
      title: "Booster Club Varsity Hoodie",
      desc: "Heavyweight 450GSM loopback athletic fleece pullover with multi-layered golden yellow chest embroidery.",
      specs: "Decor: Precision Embroidery | Fabric: Independent Trading Co. Co-Core Hoodie",
      placement: "Image: Front flat-lay view of a dense yellow embroidered school varsity shield across the chest of a premium grey hoodie, highlighting clean satin stitch borders.",
      tags: ["Varsity", "Embroidery", "Athletic"],
    },
    {
      id: "gal-3",
      category: "hats",
      title: "Tajima 3D Puff Snapback Cap",
      desc: "Acrylic structured snapback cap with ultra-thick dimensional puff foam stitch detailing.",
      specs: "Decor: 3D Puff Embroidery | Fabric: Yupoong Classic 6-Panel Black",
      placement: "Image: Side-profile close-up of a structured black snapback cap, displaying a raised white logo projecting 3mm from the front panel with immaculate satin stitch coverage.",
      tags: ["3D Puff", "Headwear", "Snapback"],
    },
    {
      id: "gal-4",
      category: "polos",
      title: "Harmony Tech Company Polos",
      desc: "Breathable polyester-spandex moisture-wicking golf polos with a digitized corporate crest on the left chest.",
      specs: "Decor: 12-Needle Micro Embroidery | Fabric: Nike Dri-Fit Performance Polo Blue",
      placement: "Image: Left-chest magnification showing a high-tech company icon embroidered in silver and royal blue threads on breathable micro-mesh performance fabric.",
      tags: ["Corporate", "Embroidery", "Dry-Fit"],
    },
    {
      id: "gal-5",
      category: "safety",
      title: "North Star Safety Construction Vests",
      desc: "ANSI Class 2 safety vests printed with high-contrast durable black plastisol industrial backing ink.",
      specs: "Decor: Heavy-Duty Plastisol Print | Fabric: Kishigo ANSI Certified Orange Mesh",
      placement: "Image: Rear view of a fluorescent neon orange safety vest laid out, showing high-contrast black block print reading 'SUPERVISOR' across the shoulders.",
      tags: ["Safety", "OSHA", "High-Vis"],
    },
    {
      id: "gal-6",
      category: "uniforms",
      title: "Duluth Athletic soccer Kit",
      desc: "Sublimated active jerseys featuring custom heat-applied team badges and flex-stretch player numbers on back.",
      specs: "Decor: Sublimation & Heat Press Numbers | Fabric: Custom Active Mesh",
      placement: "Image: Action shot mock of two soccer jerseys hanging on steel lockers, displaying customized player numbers and names pressed seamlessly with zero air bubbles.",
      tags: ["Sublimation", "Uniform", "Activewear"],
    },
    {
      id: "gal-7",
      category: "embroidery",
      title: "Double-Stitch puff close-up",
      desc: "High magnification review of gold metallic threads layered over dynamic 3D foam on heavy-weight duck canvas outerwear.",
      specs: "Decor: Multi-layer Embroidery | Fabric: Carhartt Rugged Canvas Jacket",
      placement: "Image: Ultra close-up macro photograph showing the precise path of gold metallic embroidery threads running over a custom brand emblem on tough brown canvas fabric.",
      tags: ["Macro", "Gold Thread", "Heavy Canvas"],
    },
    {
      id: "gal-8",
      category: "tees",
      title: "MN Pride Local Pride tees",
      desc: "Direct-to-Film digital transfers matching deep orange, sky blue, and emerald green gradient contours on heather grey blanks.",
      specs: "Decor: Direct-to-Film (DTF) Transfer | Fabric: Next Level Premium Heather Tees",
      placement: "Image: T-shirt laid flat displaying a detailed vector outline map of Minnesota, filled with a smooth, ultra-stretch multi-color gradient of natural forest tones.",
      tags: ["DTF", "Gradients", "Heather"],
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    const matchesFilter = activeFilter === "all" || item.category === activeFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div id="gallery-view-container" className="pt-28 pb-16 space-y-12">
      {/* Title block */}
      <section id="gallery-hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#1E5EFF]/10 text-[#1E5EFF] rounded-full text-xs font-bold uppercase tracking-wider">
          <span>Stitch & Print Portfolio</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-[#0A2342]">
          Our Custom <span className="text-[#FF7A00]">Product Gallery</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore real-world examples of our screen printing, computerized embroidery, and DTF transfers. These represent our high standards of durability, color accuracy, and alignment.
        </p>
      </section>

      {/* Filter and Search Bar Panel */}
      <section id="gallery-filters" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Active Category buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeFilter === cat.id
                    ? "bg-[#0A2342] text-white shadow-md shadow-[#0A2342]/10"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box input */}
          <div className="relative w-full md:w-72 shrink-0">
            <input
              type="text"
              id="gallery-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specifications, fabrics..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white text-gray-800"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </div>
        </div>
      </section>

      {/* Gallery portfolio Grid list */}
      <section id="gallery-results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-3xl space-y-2">
            <Camera className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="font-display font-bold text-gray-800 text-lg">No Items Match Search</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Try updating your search query or selecting a different apparel category filter above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                {/* Visual Image description block */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-100 min-h-[170px] relative flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2 py-0.5 bg-[#1E5EFF]/10 text-[#1E5EFF] rounded text-[9px] font-mono font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                    <Camera className="w-4 h-4 text-gray-400 group-hover:text-[#FF7A00] transition-colors" />
                  </div>

                  <p className="text-gray-400 text-xs italic leading-normal pt-4">
                    <span className="font-semibold text-gray-500 block not-italic uppercase tracking-widest text-[8px] mb-1">Garment Photo placement:</span>
                    {item.placement}
                  </p>
                </div>

                {/* Text Content block */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-[#0A2342] tracking-tight group-hover:text-[#1E5EFF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-mono text-gray-500 border-t border-gray-100 pt-2 font-bold uppercase">
                      {item.specs}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px] font-medium"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
