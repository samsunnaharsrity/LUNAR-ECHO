import React, { useState, useRef, useEffect } from 'react';
import { Info, Sparkles, RefreshCw } from 'lucide-react';

interface ElementDetail {
  id: string;
  name: string;
  principle: string;
  lightRedirection: string;
  geometrySignificance: string;
  modelLimitations: string;
}

const ELEMENT_DETAILS: Record<string, ElementDetail> = {
  cornerCube: {
    id: 'cornerCube',
    name: 'Fused Silica Corner-Cube Prism (Retroreflector)',
    principle: 'Total internal reflection across three mutually perpendicular (90°) interior mirror faces.',
    lightRedirection: 'Light entering the front face reflects sequentially off all three interior walls. Each orthogonal reflection reverses one spatial Cartesian velocity component (Vx → -Vx, Vy → -Vy, Vz → -Vz). The emerging ray travels strictly antiparallel (-V) to its entry direction.',
    geometrySignificance: 'Unlike a planar mirror which scatters oblique rays away into space, a corner cube guarantees that any laser photon striking it returns back to the ground telescope, regardless of minor lunar pointing misalignments or orbital librations.',
    modelLimitations: 'This 2D/isometric interactive canvas models idealized specular reflection paths. It does not simulate optical dispersion, diffraction beam divergence, or thermal temperature gradient deformations on the lunar surface.'
  },
  frontAperture: {
    id: 'frontAperture',
    name: 'Front Circular Aperture (3.8 cm diameter)',
    principle: 'Anti-reflective polished entry surface with zero optical absorption.',
    lightRedirection: 'Refracts the incoming 532 nm / 1064 nm laser pulses into the high-purity Suprasil quartz substrate with refractive index n ≈ 1.46.',
    geometrySignificance: 'The circular 3.8 cm aperture limits diffraction spread on return transit while fitting 100 prisms compactly into the Apollo 11 pallet.',
    modelLimitations: 'Does not account for lunar dust coating or micrometeoroid pitting accumulated over 50+ years.'
  },
  palletFrame: {
    id: 'palletFrame',
    name: 'Aluminum / Beryllium Pallet Mounting Structure',
    principle: 'Passive thermal isolation and sun-shade angle stabilization.',
    lightRedirection: 'Houses the 100 prisms in a 10×10 array. The pallet was tilted approximately 37° by Neil Armstrong to point directly toward the center of the Earth’s libration pattern.',
    geometrySignificance: 'Maintains strict mechanical rigidity so that thermal cycling between lunar day (+120°C) and lunar night (-130°C) does not distort prism alignment.',
    modelLimitations: 'Simplified representation without showing the individual teflon mounting rings and lunar surface footpads.'
  }
};

export const CornerCubeViewer: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<string>('cornerCube');
  const [incidentAngleDeg, setIncidentAngleDeg] = useState<number>(24); // -40 to +40 degrees
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // Coordinate centers
    const cx = w * 0.58;
    const cy = h * 0.5;
    const cubeSize = Math.min(w * 0.38, 140);

    // Draw Background Grid
    ctx.strokeStyle = '#111A30';
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Corner Cube Body (Isometric 2D representation of 90° corner cavity)
    // Three 90-degree reflective boundaries meeting at vertex (cx, cy)
    const vX = cx;
    const vY = cy;
    const topX = cx;
    const topY = cy - cubeSize;
    const leftX = cx - cubeSize * 0.95;
    const leftY = cy + cubeSize * 0.55;
    const rightX = cx + cubeSize * 0.95;
    const rightY = cy + cubeSize * 0.55;

    // Prism Glass fill gradient
    ctx.fillStyle = 'rgba(85, 221, 245, 0.06)';
    ctx.strokeStyle = '#55DDF5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(rightX, rightY);
    ctx.lineTo(leftX, leftY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 90° interior reflection surfaces (M1, M2, M3)
    ctx.strokeStyle = '#8A7CFF';
    ctx.lineWidth = 2.5;

    // Line from vertex to top
    ctx.beginPath();
    ctx.moveTo(vX, vY);
    ctx.lineTo(topX, topY);
    ctx.stroke();

    // Line from vertex to left
    ctx.beginPath();
    ctx.moveTo(vX, vY);
    ctx.lineTo(leftX, leftY);
    ctx.stroke();

    // Line from vertex to right
    ctx.beginPath();
    ctx.moveTo(vX, vY);
    ctx.lineTo(rightX, rightY);
    ctx.stroke();

    // 90° Angle glyphs
    ctx.strokeStyle = '#FFC56B';
    ctx.lineWidth = 1.5;
    // Angle square at center
    ctx.beginPath();
    ctx.moveTo(vX - 8, vY - 8);
    ctx.lineTo(vX, vY - 14);
    ctx.lineTo(vX + 8, vY - 8);
    ctx.stroke();

    // Ray tracing: calculate incoming ray from source at angle
    const rad = (incidentAngleDeg * Math.PI) / 180;
    const sourceDistance = w * 0.45;
    const startX = cx - Math.cos(rad) * sourceDistance;
    const startY = cy - Math.sin(rad) * sourceDistance;

    // 1st Bounce: strikes face 1 (left wall)
    const b1X = cx - 35;
    const b1Y = cy + 20;

    // 2nd Bounce: strikes face 2 (interior vertex/floor)
    const b2X = cx + 25;
    const b2Y = cy + 18;

    // 3rd Bounce: strikes face 3 (right wall)
    const b3X = cx + 15;
    const b3Y = cy - 40;

    // Emerging Ray: antiparallel to start ray (dx, dy reversed)
    const endX = b3X - Math.cos(rad) * sourceDistance * 0.9;
    const endY = b3Y - Math.sin(rad) * sourceDistance * 0.9;

    // Draw Incoming Laser Ray (Cyan)
    ctx.strokeStyle = '#55DDF5';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#55DDF5';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(b1X, b1Y);
    ctx.stroke();

    // Internal Bounce 1 -> 2
    ctx.strokeStyle = '#75E3B0';
    ctx.beginPath();
    ctx.moveTo(b1X, b1Y);
    ctx.lineTo(b2X, b2Y);
    ctx.stroke();

    // Internal Bounce 2 -> 3
    ctx.beginPath();
    ctx.moveTo(b2X, b2Y);
    ctx.lineTo(b3X, b3Y);
    ctx.stroke();

    // Outgoing Antiparallel Ray (Emerald/Cyan)
    ctx.strokeStyle = '#75E3B0';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(b3X, b3Y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw Bounce Sparks
    [
      { x: b1X, y: b1Y, label: '1st Reflection (90°)' },
      { x: b2X, y: b2Y, label: '2nd Reflection (90°)' },
      { x: b3X, y: b3Y, label: '3rd Reflection (Exit Antiparallel)' }
    ].forEach((pt) => {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Annotations on canvas
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#55DDF5';
    ctx.fillText(`Incoming Beam (${incidentAngleDeg > 0 ? '+' : ''}${incidentAngleDeg}°)`, 16, startY > 30 ? startY : 30);

    ctx.fillStyle = '#75E3B0';
    ctx.fillText(`Reflected Beam (Antiparallel 180°)`, 16, endY < h - 20 ? endY + 15 : h - 20);

    // Parallel indicator lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [incidentAngleDeg]);

  const activeData = ELEMENT_DETAILS[selectedElement] || ELEMENT_DETAILS.cornerCube;

  return (
    <div className="bg-[#0B1024] rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <span>Interactive Corner-Cube Optical Raytracer</span>
            <Sparkles className="w-4 h-4 text-[#55DDF5]" />
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Adjust the laser incidence angle to observe the 3-bounce internal reflection that guarantees antiparallel return.
          </p>
        </div>

        {/* Component Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#111A30] rounded-lg border border-slate-800">
          <button
            onClick={() => setSelectedElement('cornerCube')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedElement === 'cornerCube'
                ? 'bg-[#55DDF5] text-[#050816] font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Corner Cube Prism
          </button>
          <button
            onClick={() => setSelectedElement('frontAperture')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedElement === 'frontAperture'
                ? 'bg-[#55DDF5] text-[#050816] font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Front Aperture
          </button>
          <button
            onClick={() => setSelectedElement('palletFrame')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedElement === 'palletFrame'
                ? 'bg-[#55DDF5] text-[#050816] font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Pallet Frame
          </button>
        </div>
      </div>

      {/* Main Interactive Stage & Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Raytracing Stage */}
        <div className="lg:col-span-7 bg-[#050816] rounded-xl border border-slate-800 p-3 flex flex-col justify-between">
          <div className="w-full h-[280px] sm:h-[320px] rounded-lg overflow-hidden relative">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* Angle Slider Bar */}
          <div className="bg-[#111A30] p-3 rounded-lg border border-slate-800 mt-3 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300">Laser Angle of Incidence (θ):</span>
              <span className="text-[#55DDF5] font-bold tabular-nums">
                {incidentAngleDeg > 0 ? `+${incidentAngleDeg}` : incidentAngleDeg}°
              </span>
            </div>
            <input
              type="range"
              min={-40}
              max={40}
              step={1}
              value={incidentAngleDeg}
              onChange={(e) => setIncidentAngleDeg(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#55DDF5]"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>-40° Oblique</span>
              <button
                onClick={() => setIncidentAngleDeg(0)}
                className="hover:text-[#55DDF5] flex items-center gap-1 underline underline-offset-2"
              >
                <RefreshCw className="w-3 h-3" /> 0° Normal
              </button>
              <span>+40° Oblique</span>
            </div>
          </div>
        </div>

        {/* Scientific Inspector Card */}
        <div className="lg:col-span-5 bg-[#111A30] rounded-xl border border-slate-800 p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
              Component Specification
            </div>
            <h4 className="font-display text-base font-bold text-white mb-3">
              {activeData.name}
            </h4>

            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <span className="font-semibold text-[#55DDF5] block font-mono text-[11px] mb-0.5">
                  Optical Principle:
                </span>
                <p className="text-slate-300">{activeData.principle}</p>
              </div>

              <div>
                <span className="font-semibold text-[#75E3B0] block font-mono text-[11px] mb-0.5">
                  How Light is Redirected:
                </span>
                <p className="text-slate-300">{activeData.lightRedirection}</p>
              </div>

              <div>
                <span className="font-semibold text-[#FFC56B] block font-mono text-[11px] mb-0.5">
                  Why the Geometry Matters:
                </span>
                <p className="text-slate-300">{activeData.geometrySignificance}</p>
              </div>
            </div>
          </div>

          {/* Model Boundaries & Educational Limitation Note */}
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2 bg-[#0B1024] p-3 rounded-lg">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-300 block mb-0.5">
                Model Scope Note:
              </span>
              <p>{activeData.modelLimitations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
