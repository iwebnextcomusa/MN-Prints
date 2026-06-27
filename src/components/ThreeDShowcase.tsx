import React, { useRef, useEffect, useState } from "react";
import { Rotate3d, Palette, MousePointerClick, Sparkles } from "lucide-react";

type GarmentType = "tshirt" | "hoodie" | "cap";
type ColorType = { name: string; hex: string };

const GARMENT_COLORS: ColorType[] = [
  { name: "Navy Blue", hex: "#0A2342" },
  { name: "Royal Blue", hex: "#1E5EFF" },
  { name: "Accent Orange", hex: "#FF7A00" },
  { name: "Slate Gray", hex: "#64748B" },
  { name: "White Core", hex: "#FFFFFF" },
];

export default function ThreeDShowcase() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeGarment, setActiveGarment] = useState<GarmentType>("tshirt");
  const [selectedColor, setSelectedColor] = useState<ColorType>(GARMENT_COLORS[1]); // Royal Blue
  const [printLabel, setPrintLabel] = useState("MN PRINTS HQ");
  
  // Real-time animation states
  const rotationRef = useRef({ x: 0.3, y: 0.5, z: 0 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });
  const scrollRatioRef = useRef(0);

  // Scroll listener to update camera parameters
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far through the element we scrolled
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
      scrollRatioRef.current = progress;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D Point projection and render engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      width = canvas.width;
      height = canvas.height;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 3D models represented as vector nodes
    const createTShirtNodes = () => {
      const nodes: Array<[number, number, number]> = [];
      // Front collar
      nodes.push([-0.3, 0.7, 0.1]); // 0
      nodes.push([0.3, 0.7, 0.1]);  // 1
      // Back collar
      nodes.push([-0.3, 0.7, -0.1]); // 2
      nodes.push([0.3, 0.7, -0.1]);  // 3
      // Left sleeve top
      nodes.push([-0.9, 0.5, 0.1]);  // 4
      // Left sleeve sleeve-end
      nodes.push([-1.0, 0.2, 0.1]);  // 5
      // Left armpit
      nodes.push([-0.5, 0.2, 0.1]);  // 6
      // Right sleeve top
      nodes.push([0.9, 0.5, 0.1]);   // 7
      // Right sleeve end
      nodes.push([1.0, 0.2, 0.1]);   // 8
      // Right armpit
      nodes.push([0.5, 0.2, 0.1]);   // 9
      // Bottom left corner
      nodes.push([-0.5, -0.8, 0.15]); // 10
      // Bottom right corner
      nodes.push([0.5, -0.8, 0.15]);  // 11
      // Bottom left back
      nodes.push([-0.5, -0.8, -0.15]); // 12
      // Bottom right back
      nodes.push([0.5, -0.8, -0.15]);  // 13

      // Logo projection face points (Center of chest)
      nodes.push([-0.15, 0.3, 0.15]); // 14
      nodes.push([0.15, 0.3, 0.15]);  // 15
      nodes.push([0.15, 0.1, 0.15]);  // 16
      nodes.push([-0.15, 0.1, 0.15]); // 17

      return {
        nodes,
        faces: [
          [0, 1, 9, 11, 10, 6], // front body
          [2, 3, 9, 13, 12, 6], // back body
        ],
        edges: [
          [0, 1], [1, 7], [7, 8], [8, 9], [9, 11], [11, 10], [10, 6], [6, 5], [5, 4], [4, 0], // Outline Front
          [2, 3], [3, 7], [8, 9], [9, 13], [13, 12], [12, 6], [5, 6], [2, 4], // Back structures
          [0, 2], [1, 3], [10, 12], [11, 13] // Side joints
        ],
        logoIndex: [14, 15, 16, 17]
      };
    };

    const createHoodieNodes = () => {
      const nodes: Array<[number, number, number]> = [];
      // Same base body as tee, but thicker and with a hood
      nodes.push([-0.35, 0.6, 0.15]); // 0 L neck
      nodes.push([0.35, 0.6, 0.15]);  // 1 R neck
      nodes.push([-0.9, 0.45, 0.1]);  // 2 L sleeve top
      nodes.push([-1.0, 0.1, 0.1]);   // 3 L cuff
      nodes.push([-0.55, 0.1, 0.15]); // 4 L pit
      nodes.push([0.9, 0.45, 0.1]);   // 5 R sleeve top
      nodes.push([1.0, 0.1, 0.1]);    // 6 R cuff
      nodes.push([0.55, 0.1, 0.15]);  // 7 R pit
      nodes.push([-0.55, -0.85, 0.2]); // 8 L hem
      nodes.push([0.55, -0.85, 0.2]);  // 9 R hem
      // Hood points
      nodes.push([-0.25, 0.7, 0.0]); // 10 hood lower L
      nodes.push([0.25, 0.7, 0.0]);  // 11 hood lower R
      nodes.push([0.0, 1.1, -0.1]);  // 12 hood peak
      nodes.push([-0.2, 0.95, -0.2]); // 13 hood back L
      nodes.push([0.2, 0.95, -0.2]);  // 14 hood back R
      // Pocket front
      nodes.push([-0.25, -0.3, 0.22]); // 15 pocket TL
      nodes.push([0.25, -0.3, 0.22]);  // 16 pocket TR
      nodes.push([0.35, -0.6, 0.22]);  // 17 pocket BR
      nodes.push([-0.35, -0.6, 0.22]); // 18 pocket BL

      return {
        nodes,
        faces: [
          [0, 1, 7, 9, 8, 4]
        ],
        edges: [
          [0, 1], [1, 5], [5, 6], [6, 7], [7, 9], [9, 8], [8, 4], [4, 3], [3, 2], [2, 0], // Body
          [0, 10], [1, 11], [10, 12], [11, 12], [12, 13], [12, 14], [13, 10], [14, 11], // Hood mesh
          [15, 16], [16, 17], [17, 18], [18, 15] // Front Kangaroo Pocket
        ],
        logoIndex: [10, 11, 1, 0] // near chest/neck
      };
    };

    const createCapNodes = () => {
      const nodes: Array<[number, number, number]> = [];
      // Dome cap structure
      const segments = 8;
      for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);
        // Base ring
        nodes.push([cos * 0.6, -0.1, sin * 0.6]); // 0-7
        // Mid ring
        nodes.push([cos * 0.5, 0.3, sin * 0.5]);  // 8-15
      }
      // Top button
      nodes.push([0, 0.55, 0]); // 16
      
      // Visor bill (front of cap is around theta = Math.PI/2 -> i = 2)
      nodes.push([-0.5, -0.15, 0.5]); // 17 L bill joint
      nodes.push([-0.3, -0.18, 1.0]); // 18 L bill peak
      nodes.push([0.3, -0.18, 1.0]);  // 19 R bill peak
      nodes.push([0.5, -0.15, 0.5]);  // 20 R bill joint

      const edges: Array<[number, number]> = [];
      // Connect rings
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        edges.push([i, next]); // base ring
        edges.push([i + segments, next + segments]); // mid ring
        edges.push([i, i + segments]); // vertical arches
        edges.push([i + segments, 16]); // top button lines
      }
      // Bill edges
      edges.push([17, 18]);
      edges.push([18, 19]);
      edges.push([19, 20]);
      edges.push([20, 17]);

      return {
        nodes,
        edges,
        faces: [],
        logoIndex: [10, 11, 2, 3] // center front dome
      };
    };

    const rotatePoint = (point: [number, number, number], rx: number, ry: number, rz: number): [number, number, number] => {
      let [x, y, z] = point;

      // Rotate around Y
      let cosY = Math.cos(ry);
      let sinY = Math.sin(ry);
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;

      // Rotate around X
      let cosX = Math.cos(rx);
      let sinX = Math.sin(rx);
      let y2 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;

      // Rotate around Z
      let cosZ = Math.cos(rz);
      let sinZ = Math.sin(rz);
      let x3 = x1 * cosZ - y2 * sinZ;
      let y3 = x1 * sinZ + y2 * cosZ;

      return [x3, y3, z2];
    };

    const render = () => {
      // Clear with dark/light background gradients
      ctx.clearRect(0, 0, width, height);
      
      const widthD = width / window.devicePixelRatio;
      const heightD = height / window.devicePixelRatio;

      // Draw aesthetic background grid
      ctx.strokeStyle = "rgba(30, 94, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < widthD; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, heightD);
        ctx.stroke();
      }
      for (let y = 0; y < heightD; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(widthD, y);
        ctx.stroke();
      }

      // Smooth mouse coordinate tracking
      const mouse = mouseRef.current;
      const speed = 0.08;
      mouse.x += (mouse.targetX - mouse.x) * speed;
      mouse.y += (mouse.targetY - mouse.y) * speed;

      // Base rotation + mouse influence + scroll influence
      const scrollProgress = scrollRatioRef.current;
      const baseAngleY = Date.now() * 0.0006;
      const currentRY = baseAngleY + mouse.x * 1.5 + (scrollProgress * Math.PI * 2);
      const currentRX = 0.1 + mouse.y * 0.8 + (scrollProgress * 0.5);
      const currentRZ = mouse.x * 0.2;

      // Choose model
      let model;
      if (activeGarment === "tshirt") model = createTShirtNodes();
      else if (activeGarment === "hoodie") model = createHoodieNodes();
      else model = createCapNodes();

      const scale = 140 + (Math.sin(Date.now() * 0.0015) * 4) + (scrollProgress * 30);
      const centerX = widthD / 2;
      const centerY = heightD / 2 + 10;

      // Project all nodes
      const projected: Array<[number, number]> = [];
      const depths: number[] = [];

      model.nodes.forEach((node) => {
        const rotated = rotatePoint(node, currentRX, currentRY, currentRZ);
        // simple perspective projection
        const distance = 3;
        const perspective = distance / (distance - rotated[2]);
        const px = centerX + rotated[0] * scale * perspective;
        const py = centerY - rotated[1] * scale * perspective; // Flip Y for typical cartesian coordinates
        projected.push([px, py]);
        depths.push(rotated[2]);
      });

      // Render wireframe outline
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      // Draw subtle fabric volume / shaded face background
      if (projected.length > 0) {
        ctx.fillStyle = selectedColor.hex === "#FFFFFF" 
          ? "rgba(240, 244, 248, 0.85)" 
          : `${selectedColor.hex}D0`; // Add semi-transparency
        
        ctx.beginPath();
        if (activeGarment === "tshirt") {
          // Trace outer contour of tee
          const contour = [0, 4, 5, 6, 10, 11, 9, 8, 7, 1];
          ctx.moveTo(projected[0][0], projected[0][1]);
          contour.forEach(idx => {
            if (projected[idx]) ctx.lineTo(projected[idx][0], projected[idx][1]);
          });
        } else if (activeGarment === "hoodie") {
          const contour = [0, 2, 3, 4, 8, 9, 7, 6, 5, 1];
          ctx.moveTo(projected[0][0], projected[0][1]);
          contour.forEach(idx => {
            if (projected[idx]) ctx.lineTo(projected[idx][0], projected[idx][1]);
          });
        } else {
          // Cap dome base outline
          ctx.moveTo(projected[0][0], projected[0][1]);
          for (let i = 1; i < 8; i++) {
            ctx.lineTo(projected[i][0], projected[i][1]);
          }
        }
        ctx.closePath();
        ctx.shadowColor = "rgba(30, 94, 255, 0.2)";
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Draw custom mock branding logo on chest
      if (activeGarment !== "cap") {
        // Find center of chest bounding box
        const chestX = (projected[0][0] + projected[1][0]) / 2;
        const chestY = (projected[0][1] + projected[1][1]) / 2 + (activeGarment === "tshirt" ? 45 : 35);
        
        ctx.fillStyle = selectedColor.hex === "#FF7A00" ? "#0A2342" : "#FF7A00";
        ctx.font = "bold 9px var(--font-display)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(printLabel, chestX, chestY);

        // draw cute mock star above branding
        ctx.fillStyle = "#1E5EFF";
        ctx.font = "12px sans-serif";
        ctx.fillText("★", chestX, chestY - 14);
      } else {
        // Draw logo on front Cap panel
        const frontPanelX = projected[2][0];
        const frontPanelY = projected[2][1] - 15;
        ctx.fillStyle = "#FF7A00";
        ctx.font = "bold 8px var(--font-display)";
        ctx.textAlign = "center";
        ctx.fillText("MN PRINTS", frontPanelX, frontPanelY);
      }

      // Render wireframe edges
      ctx.strokeStyle = selectedColor.hex === "#FFFFFF" ? "rgba(10, 35, 66, 0.25)" : "rgba(255,255,255,0.45)";
      model.edges.forEach((edge) => {
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.stroke();
        }
      });

      // Draw structural corner node points with royal neon aura
      model.nodes.forEach((node, i) => {
        const pt = projected[i];
        if (!pt) return;
        const depth = depths[i];
        const size = Math.max(1, (depth + 1) * 3);
        
        ctx.fillStyle = i < 4 ? "#FF7A00" : "#1E5EFF";
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], size, 0, Math.PI * 2);
        ctx.fill();
        
        if (i < 4 && Math.sin(Date.now() * 0.005) > 0.5) {
          ctx.strokeStyle = "rgba(255,122,0,0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pt[0], pt[1], size + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Draw instruction indicator bubble if not hovered
      if (!mouse.isHovering && Math.sin(Date.now() * 0.002) > 0) {
        ctx.fillStyle = "rgba(10, 35, 66, 0.08)";
        ctx.strokeStyle = "rgba(30, 94, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 130, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#1E5EFF";
        ctx.font = "10px var(--font-mono)";
        ctx.textAlign = "center";
        ctx.fillText("↻", centerX, centerY - 129);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [activeGarment, selectedColor, printLabel]);

  // Track mouse coordinates over canvas bounding box
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const xNormalized = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const yNormalized = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    
    mouseRef.current.targetX = xNormalized;
    mouseRef.current.targetY = -yNormalized; // Invert to match 3D coordinate space
    mouseRef.current.isHovering = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
    mouseRef.current.isHovering = false;
  };

  return (
    <div
      ref={containerRef}
      id="3d-visualizer-section"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
    >
      {/* 3D Canvas Stage */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[400px] bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-inner group">
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-mono text-gray-500 shadow-sm">
          <Rotate3d className="w-3.5 h-3.5 text-[#1E5EFF] animate-spin" />
          <span>Interactive 3D Stage</span>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold uppercase text-[#FF7A00] shadow-sm">
          <MousePointerClick className="w-3.5 h-3.5" />
          <span>Hover to Rotate</span>
        </div>

        {/* The active canvas */}
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-[280px] sm:h-[360px] cursor-grab active:cursor-grabbing transition-transform duration-500"
          style={{ touchAction: "none" }}
        />

        {/* Base Spec Tag */}
        <div className="absolute bottom-4 flex items-center gap-2 bg-[#0A2342] text-white px-4 py-1.5 rounded-full text-xs font-mono shadow-md border border-white/10">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedColor.hex }}></span>
          <span className="capitalize">{activeGarment}</span>
          <span className="text-gray-400">|</span>
          <span className="text-[#FF7A00] font-bold">{selectedColor.name}</span>
        </div>
      </div>

      {/* Control Panels */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#1E5EFF]/10 text-[#1E5EFF] rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Visualizer</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#0A2342]">
            Build Your Mockup
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Test custom configurations in real-time. Pick a commercial garment substrate, choose thread or ink colors, and visualize the premium dynamic depth.
          </p>
        </div>

        {/* 1. Garment Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
            1. Select Apparel Substrate
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "tshirt", label: "Athletic Tee" },
              { id: "hoodie", label: "Street Hoodie" },
              { id: "cap", label: "6-Panel Cap" },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGarment(g.id as GarmentType)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  activeGarment === g.id
                    ? "bg-[#0A2342] text-white border-[#0A2342] shadow-md shadow-[#0A2342]/10"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Color picker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
              2. Select Garment Dye Color
            </label>
            <span className="text-xs font-mono text-gray-400 font-semibold uppercase">{selectedColor.name}</span>
          </div>
          <div className="flex items-center gap-3">
            {GARMENT_COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer shadow-sm ${
                  selectedColor.name === color.name
                    ? "border-[#1E5EFF] scale-110 shadow-md ring-2 ring-[#1E5EFF]/20"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name} color`}
              >
                {selectedColor.name === color.name && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      color.hex === "#FFFFFF" ? "bg-[#0A2342]" : "bg-white"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Printing Text field */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
            3. Customize Chest Print Label
          </label>
          <div className="relative">
            <input
              type="text"
              id="mock-print-input"
              value={printLabel}
              onChange={(e) => setPrintLabel(e.target.value.toUpperCase().slice(0, 18))}
              placeholder="ENTER BRAND TEXT"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold tracking-wide uppercase text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white"
            />
            <div className="absolute right-3.5 top-3 text-[10px] font-mono text-gray-400">
              {printLabel.length}/18 chars
            </div>
          </div>
        </div>

        {/* Tech stats snippet */}
        <div className="p-4 bg-[#F5F7FA] rounded-2xl border border-gray-200 space-y-1 text-xs">
          <div className="flex justify-between font-mono text-gray-500">
            <span>Projection Mode:</span>
            <span className="text-[#0A2342] font-semibold">Isometric Perspective</span>
          </div>
          <div className="flex justify-between font-mono text-gray-500">
            <span>DPI Quality:</span>
            <span className="text-[#0A2342] font-semibold">Retina (Scale Linked)</span>
          </div>
          <div className="flex justify-between font-mono text-gray-500">
            <span>Mesh Complexity:</span>
            <span className="text-[#0A2342] font-semibold">Dynamic Geometry</span>
          </div>
        </div>
      </div>
    </div>
  );
}
