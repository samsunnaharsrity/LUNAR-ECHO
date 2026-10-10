import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Eye, EyeOff, Info } from 'lucide-react';

interface InteractiveEarthMoonProps {
  reducedMotion?: boolean;
}

export const InteractiveEarthMoon: React.FC<InteractiveEarthMoonProps> = ({
  reducedMotion = false
}) => {
  const [isPlaying, setIsPlaying] = useState(!reducedMotion);
  const [distanceKm, setDistanceKm] = useState(384400); // average
  const [showLabels, setShowLabels] = useState(true);
  const [showOrbit, setShowOrbit] = useState(true);
  
  // Laser pulse progression: 0 to 1 outbound (Earth -> Moon), 1 to 2 returning (Moon -> Earth)
  const [pulsePhase, setPulsePhase] = useState(0); 
  const [roundTripsCompleted, setRoundTripsCompleted] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Speed of light constant
  const C_KM_S = 299792.458;
  const roundTripTime = (2 * distanceKm) / C_KM_S;
  const oneWayTime = distanceKm / C_KM_S;

  useEffect(() => {
    let lastTimestamp = performance.now();

    const animate = (timestamp: number) => {
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (isPlaying) {
        setPulsePhase((prev) => {
          // One full round trip takes about 3 seconds visually for clear observation
          const visualSpeed = 2 / 3.0; // cycle through 0 -> 2 in 3 seconds
          const next = prev + delta * visualSpeed;
          if (next >= 2) {
            setRoundTripsCompleted((c) => c + 1);
            return 0;
          }
          return next;
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  // Render on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Deep space background with subtle stars
    const starCount = 60;
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < starCount; i++) {
      const sx = (Math.sin(i * 99) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 37) * 0.5 + 0.5) * height;
      const sRadius = (i % 3 === 0) ? 1.2 : 0.7;
      ctx.globalAlpha = 0.2 + (i % 5) * 0.15;
      ctx.beginPath();
      ctx.arc(sx, sy, sRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Scale distance horizontally: Min 363,000 -> Max 405,000 km mapped across canvas
    const minD = 360000;
    const maxD = 410000;
    const distFraction = (distanceKm - minD) / (maxD - minD);

    const earthX = width * 0.16;
    const earthY = height * 0.52;
    const earthRadius = Math.min(width * 0.08, 48);

    const moonMinX = width * 0.72;
    const moonMaxX = width * 0.88;
    const moonX = moonMinX + distFraction * (moonMaxX - moonMinX);
    const moonY = height * 0.44;
    const moonRadius = Math.min(width * 0.035, 20);

    // Orbital path guideline
    if (showOrbit) {
      ctx.strokeStyle = '#8A7CFF';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.ellipse(earthX, earthY, moonX - earthX, height * 0.38, 0.05, -0.6, 0.6);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1.0;
    }

    // Ground observatory on Earth's upper limb
    const obsAngle = -Math.PI / 4;
    const obsX = earthX + Math.cos(obsAngle) * earthRadius;
    const obsY = earthY + Math.sin(obsAngle) * earthRadius;

    // Apollo 11 LRRR on Moon's facing limb (Mare Tranquillitatis, ~0.67° N, 23.47° E)
    const lrrrAngle = Math.PI * 0.95;
    const lrrrX = moonX + Math.cos(lrrrAngle) * moonRadius;
    const lrrrY = moonY + Math.sin(lrrrAngle) * moonRadius;

    // Draw Earth
    const earthGrad = ctx.createRadialGradient(
      earthX - earthRadius * 0.3,
      earthY - earthRadius * 0.3,
      earthRadius * 0.1,
      earthX,
      earthY,
      earthRadius
    );
    earthGrad.addColorStop(0, '#60A5FA');
    earthGrad.addColorStop(0.6, '#1D4ED8');
    earthGrad.addColorStop(1, '#0B1E48');

    ctx.fillStyle = earthGrad;
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
    ctx.fill();

    // Atmosphere halo
    ctx.strokeStyle = '#93C5FD';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.4;
    ctx.stroke();
    ctx.globalAlpha = 1.0;

    // Draw Observatory marker
    ctx.fillStyle = '#55DDF5';
    ctx.beginPath();
    ctx.arc(obsX, obsY, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Draw Moon
    const moonGrad = ctx.createRadialGradient(
      moonX - moonRadius * 0.3,
      moonY - moonRadius * 0.3,
      moonRadius * 0.1,
      moonX,
      moonY,
      moonRadius
    );
    moonGrad.addColorStop(0, '#F1F5F9');
    moonGrad.addColorStop(0.7, '#94A3B8');
    moonGrad.addColorStop(1, '#334155');

    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fill();

    // Apollo 11 LRRR site marker
    ctx.fillStyle = '#FFC56B';
    ctx.beginPath();
    ctx.arc(lrrrX, lrrrY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Laser Beam Transit Logic
    const isOutbound = pulsePhase < 1.0;
    const progress = isOutbound ? pulsePhase : pulsePhase - 1.0;

    // Outbound laser pulse (Cyan)
    if (isOutbound) {
      const currentX = obsX + (lrrrX - obsX) * progress;
      const currentY = obsY + (lrrrY - obsY) * progress;

      // Faint guide beam line
      ctx.strokeStyle = 'rgba(85, 221, 245, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(obsX, obsY);
      ctx.lineTo(lrrrX, lrrrY);
      ctx.stroke();

      // Traveling pulse packet
      const trailLength = 0.12;
      const tailProgress = Math.max(0, progress - trailLength);
      const tailX = obsX + (lrrrX - obsX) * tailProgress;
      const tailY = obsY + (lrrrY - obsY) * tailProgress;

      const beamGrad = ctx.createLinearGradient(tailX, tailY, currentX, currentY);
      beamGrad.addColorStop(0, 'rgba(85, 221, 245, 0)');
      beamGrad.addColorStop(1, '#55DDF5');

      ctx.strokeStyle = beamGrad;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

      // Pulse leading photon head
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Returning reflected photons (Green / Violet subtle pulse)
      const currentX = lrrrX + (obsX - lrrrX) * progress;
      const currentY = lrrrY + (obsY - lrrrY) * progress;

      // Returning guide line
      ctx.strokeStyle = 'rgba(117, 227, 176, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lrrrX, lrrrY);
      ctx.lineTo(obsX, obsY);
      ctx.stroke();

      const trailLength = 0.14;
      const tailProgress = Math.max(0, progress - trailLength);
      const tailX = lrrrX + (obsX - lrrrX) * tailProgress;
      const tailY = lrrrY + (obsY - lrrrY) * tailProgress;

      const returnGrad = ctx.createLinearGradient(tailX, tailY, currentX, currentY);
      returnGrad.addColorStop(0, 'rgba(117, 227, 176, 0)');
      returnGrad.addColorStop(1, '#75E3B0');

      ctx.strokeStyle = returnGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

      // Reflected photon head
      ctx.fillStyle = '#75E3B0';
      ctx.beginPath();
      ctx.arc(currentX, currentY, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Flash at retroreflector on reflection boundary
    if (pulsePhase >= 0.96 && pulsePhase <= 1.04) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(lrrrX, lrrrY, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Labels
    if (showLabels) {
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#AAB6CC';

      // Earth & Observatory label
      ctx.fillText('EARTH', earthX - 18, earthY + earthRadius + 16);
      ctx.fillStyle = '#55DDF5';
      ctx.fillText('Ground Laser Observatory', obsX - 20, obsY - 10);

      // Moon & LRRR label
      ctx.fillStyle = '#AAB6CC';
      ctx.fillText('MOON', moonX - 14, moonY + moonRadius + 16);
      ctx.fillStyle = '#FFC56B';
      ctx.fillText('Apollo 11 LRRR (1969)', lrrrX - 30, lrrrY - 10);

      // Pulse indicator
      ctx.fillStyle = isOutbound ? '#55DDF5' : '#75E3B0';
      ctx.font = '10px "JetBrains Mono", monospace';
      const labelText = isOutbound ? 'OUTBOUND: 10^17 Photons' : 'RETURNING: Single-Photon Return';
      ctx.fillText(labelText, width * 0.42, height * 0.32);
    }
  }, [distanceKm, isPlaying, pulsePhase, showLabels, showOrbit]);

  const handleReset = () => {
    setPulsePhase(0);
    setIsPlaying(true);
  };

  return (
    <div className="bg-[#0B1024] rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Visual Canvas Stage */}
      <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl bg-[#050816] overflow-hidden border border-slate-800/80">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />

        {/* Real-time Telemetry Overlay HUD */}
        <div className="absolute top-3 left-3 bg-[#0B1024]/85 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 font-mono text-xs space-y-1">
          <div className="text-slate-400 text-[10px] uppercase tracking-wider">
            Idealized Light Travel Time
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#55DDF5] tabular-nums">
              {roundTripTime.toFixed(4)}
            </span>
            <span className="text-slate-400 text-[11px]">sec (Round-trip)</span>
          </div>
          <div className="text-[11px] text-slate-300 tabular-nums">
            One-way: {oneWayTime.toFixed(4)} s · c = 299,792.458 km/s
          </div>
        </div>

        {/* Status Chip */}
        <div className="absolute top-3 right-3 bg-[#0B1024]/85 backdrop-blur-md border border-slate-800 rounded-lg px-2.5 py-1.5 font-mono text-[11px] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#55DDF5] animate-ping" />
          <span className="text-slate-300">
            {pulsePhase < 1 ? 'Outbound Transmission' : 'Lunar Echo Return'}
          </span>
        </div>
      </div>

      {/* Control Console */}
      <div className="mt-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-lg bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Start Laser Pulse'}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-[#111A30] hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-1.5 transition-colors border border-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Display toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-colors ${
                showLabels
                  ? 'bg-[#111A30] text-[#55DDF5] border-[#55DDF5]/40'
                  : 'bg-transparent text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Labels</span>
            </button>

            <button
              onClick={() => setShowOrbit(!showOrbit)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-colors ${
                showOrbit
                  ? 'bg-[#111A30] text-[#8A7CFF] border-[#8A7CFF]/40'
                  : 'bg-transparent text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <span>Orbit Path</span>
            </button>
          </div>
        </div>

        {/* Distance Slider with Reference Markers */}
        <div className="bg-[#111A30] p-3.5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label htmlFor="distance-slider" className="text-slate-300 font-medium">
              Illustrative Earth–Moon Distance:
            </label>
            <div className="font-mono text-sm font-bold text-[#55DDF5] tabular-nums">
              {distanceKm.toLocaleString()} <span className="text-xs text-slate-400 font-normal">km</span>
            </div>
          </div>

          <input
            id="distance-slider"
            type="range"
            min={363104} // Perigee
            max={405696} // Apogee
            step={100}
            value={distanceKm}
            onChange={(e) => setDistanceKm(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#55DDF5]"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>Perigee: ~363,104 km</span>
            <button
              onClick={() => setDistanceKm(384400)}
              className="hover:text-[#55DDF5] underline underline-offset-2"
            >
              Mean: 384,400 km
            </button>
            <span>Apogee: ~405,696 km</span>
          </div>
        </div>
      </div>

      {/* Mandatory Educational Disclaimer */}
      <div className="mt-4 flex items-start gap-2 text-[11px] text-slate-400 bg-[#050816]/70 p-3 rounded-lg border border-slate-800">
        <Info className="w-4 h-4 text-[#FFC56B] shrink-0 mt-0.5" />
        <p>
          This visualization is a simplified educational model. Actual lunar laser ranging requires detailed observations, timing corrections, and scientific analysis.
        </p>
      </div>
    </div>
  );
};
