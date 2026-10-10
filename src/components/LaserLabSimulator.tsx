import React, { useState, useEffect, useRef } from 'react';
import { ExperimentTrial } from '../types';
import { Play, Pause, RotateCcw, Download, CheckCircle2, AlertCircle, HelpCircle, Sparkles } from 'lucide-react';

interface LaserLabSimulatorProps {
  reducedMotion?: boolean;
}

export const LaserLabSimulator: React.FC<LaserLabSimulatorProps> = ({
  reducedMotion = false
}) => {
  // Speed of Light in vacuum (exact SI)
  const C_KM_S = 299792.458;

  // Simulator State
  const [distanceKm, setDistanceKm] = useState<number>(384400);
  const [isRunning, setIsRunning] = useState<boolean>(!reducedMotion);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1.0); // 0.5x, 1x, 2x, 5x, real-time
  const [unitMode, setUnitMode] = useState<'km-s' | 'km-ms' | 'miles-s' | 'km-ns'>('km-s');

  // Interactive Challenges State
  const [challengeMode, setChallengeMode] = useState<'A' | 'B' | 'C'>('A');
  const [predictionInput, setPredictionInput] = useState<string>('2.56');
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);
  const [challengeSolved, setChallengeSolved] = useState<boolean>(false);

  // Challenge B comparison state
  const [distB1, setDistB1] = useState<number>(363104);
  const [distB2, setDistB2] = useState<number>(405696);

  // Experiment Recording Table (Max 5 simulated trials)
  const [trials, setTrials] = useState<ExperimentTrial[]>([]);

  // Canvas visual phase: 0 -> 2
  const [pulsePhase, setPulsePhase] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  // Physical calculations
  const calculatedRoundTripSeconds = (2 * distanceKm) / C_KM_S;
  const calculatedOneWaySeconds = distanceKm / C_KM_S;

  // Unit conversions
  const displayDistance =
    unitMode === 'miles-s' ? (distanceKm * 0.621371).toFixed(1) : distanceKm.toLocaleString();
  const distUnitLabel = unitMode === 'miles-s' ? 'miles' : 'km';

  const formatRoundTripTime = (seconds: number) => {
    switch (unitMode) {
      case 'km-ms':
        return `${(seconds * 1000).toFixed(3)} ms`;
      case 'km-ns':
        return `${(seconds * 1e9).toFixed(0)} ns`;
      default:
        return `${seconds.toFixed(6)} s`;
    }
  };

  // Animation Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const deltaSec = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isRunning) {
        setPulsePhase((prev) => {
          // base speed: full cycle takes 2.6 seconds at 1x
          const rate = (2.0 / 2.6) * animationSpeed;
          const next = prev + deltaSec * rate;
          return next >= 2.0 ? 0 : next;
        });
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isRunning, animationSpeed]);

  // Canvas Drawing
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

    // Deep space backdrop
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#050816');
    grad.addColorStop(1, '#0B1024');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle star field
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 40; i++) {
      const sx = (Math.sin(i * 123) * 0.5 + 0.5) * w;
      const sy = (Math.cos(i * 49) * 0.5 + 0.5) * h;
      ctx.globalAlpha = 0.2 + (i % 4) * 0.15;
      ctx.beginPath();
      ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Earth position
    const earthX = w * 0.14;
    const earthY = h * 0.5;
    const earthR = Math.min(w * 0.08, 44);

    // Moon position mapped by distanceKm (363,000 -> 406,000 km)
    const minD = 360000;
    const maxD = 410000;
    const fraction = Math.max(0, Math.min(1, (distanceKm - minD) / (maxD - minD)));
    const moonMinX = w * 0.72;
    const moonMaxX = w * 0.88;
    const moonX = moonMinX + fraction * (moonMaxX - moonMinX);
    const moonY = h * 0.5;
    const moonR = Math.min(w * 0.04, 22);

    // Draw Earth
    const earthGrad = ctx.createRadialGradient(
      earthX - earthR * 0.3,
      earthY - earthR * 0.3,
      earthR * 0.1,
      earthX,
      earthY,
      earthR
    );
    earthGrad.addColorStop(0, '#60A5FA');
    earthGrad.addColorStop(0.7, '#1E40AF');
    earthGrad.addColorStop(1, '#0F172A');
    ctx.fillStyle = earthGrad;
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
    ctx.fill();

    // Atmosphere
    ctx.strokeStyle = '#93C5FD';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.4;
    ctx.stroke();
    ctx.globalAlpha = 1.0;

    // Observatory telescope emitter on Earth
    const obsX = earthX + earthR;
    const obsY = earthY;
    ctx.fillStyle = '#55DDF5';
    ctx.beginPath();
    ctx.arc(obsX, obsY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw Moon
    const moonGrad = ctx.createRadialGradient(
      moonX - moonR * 0.3,
      moonY - moonR * 0.3,
      moonR * 0.1,
      moonX,
      moonY,
      moonR
    );
    moonGrad.addColorStop(0, '#F8FAFC');
    moonGrad.addColorStop(0.7, '#64748B');
    moonGrad.addColorStop(1, '#1E293B');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
    ctx.fill();

    // Apollo 11 LRRR on Moon facing edge
    const lrrrX = moonX - moonR;
    const lrrrY = moonY;
    ctx.fillStyle = '#FFC56B';
    ctx.beginPath();
    ctx.arc(lrrrX, lrrrY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Laser Beam Transit
    const isOutbound = pulsePhase < 1.0;
    const p = isOutbound ? pulsePhase : pulsePhase - 1.0;

    if (isOutbound) {
      // Outbound pulse (Cyan)
      const currentX = obsX + (lrrrX - obsX) * p;
      const tailX = Math.max(obsX, currentX - 45);

      const beam = ctx.createLinearGradient(tailX, obsY, currentX, obsY);
      beam.addColorStop(0, 'rgba(85, 221, 245, 0)');
      beam.addColorStop(1, '#55DDF5');

      ctx.strokeStyle = beam;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tailX, obsY);
      ctx.lineTo(currentX, obsY);
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(currentX, obsY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Returning reflected photons (Green)
      const currentX = lrrrX + (obsX - lrrrX) * p;
      const tailX = Math.min(lrrrX, currentX + 45);

      const returnBeam = ctx.createLinearGradient(tailX, lrrrY, currentX, lrrrY);
      returnBeam.addColorStop(0, 'rgba(117, 227, 176, 0)');
      returnBeam.addColorStop(1, '#75E3B0');

      ctx.strokeStyle = returnBeam;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tailX, lrrrY);
      ctx.lineTo(currentX, lrrrY);
      ctx.stroke();

      ctx.fillStyle = '#75E3B0';
      ctx.beginPath();
      ctx.arc(currentX, lrrrY, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Flash at LRRR
    if (pulsePhase >= 0.96 && pulsePhase <= 1.04) {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(lrrrX, lrrrY, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [distanceKm, pulsePhase]);

  // Log Experiment Row
  const handleLogExperiment = () => {
    if (trials.length >= 5) {
      alert('Maximum of 5 simulated trials reached for this session. Export or reset to log new runs.');
      return;
    }

    const predNum = parseFloat(predictionInput);
    const validPred = isNaN(predNum) ? calculatedRoundTripSeconds : predNum;
    const diffMs = Math.abs(validPred - calculatedRoundTripSeconds) * 1000;

    const newTrial: ExperimentTrial = {
      trialNumber: trials.length + 1,
      timestamp: new Date().toLocaleTimeString(),
      distanceKm: distanceKm,
      studentPredictionSeconds: validPred,
      calculatedTimeSeconds: calculatedRoundTripSeconds,
      deltaMilliseconds: diffMs,
      status: 'SIMULATED'
    };

    setTrials((prev) => [...prev, newTrial]);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (trials.length === 0) return;
    const headers = 'Trial,Timestamp,Distance_km,StudentPrediction_s,CalculatedRoundTrip_s,Delta_ms,Status\n';
    const rows = trials
      .map(
        (t) =>
          `${t.trialNumber},"${t.timestamp}",${t.distanceKm},${t.studentPredictionSeconds.toFixed(6)},${t.calculatedTimeSeconds.toFixed(6)},${t.deltaMilliseconds.toFixed(3)},${t.status}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lunar_echo_simulated_trials_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Evaluate Challenge A
  const handleCheckChallengeA = () => {
    const studentGuess = parseFloat(predictionInput);
    if (isNaN(studentGuess)) {
      setChallengeFeedback('Please enter a numeric prediction in seconds.');
      return;
    }
    const diff = Math.abs(studentGuess - calculatedRoundTripSeconds);
    if (diff < 0.05) {
      setChallengeSolved(true);
      setChallengeFeedback(
        `Outstanding! Your prediction of ${studentGuess.toFixed(3)}s is within ${(diff * 1000).toFixed(1)} ms of the idealized round-trip time (${calculatedRoundTripSeconds.toFixed(4)}s).`
      );
    } else {
      setChallengeSolved(false);
      setChallengeFeedback(
        `Close attempt! At ${distanceKm.toLocaleString()} km, round-trip light travel time is (2 × d)/c = (2 × ${distanceKm.toLocaleString()}) / 299,792.458 ≈ ${calculatedRoundTripSeconds.toFixed(4)} s. Your prediction differed by ${(diff).toFixed(3)} s.`
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Simulator Workspace Card */}
      <div className="bg-[#0B1024] rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#111A30] text-[#55DDF5] border border-slate-800">
                EDUCATIONAL SIMULATION
              </span>
              <span className="text-xs text-slate-400 font-mono">
                c = 299,792.458 km/s
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-white mt-1">
              Laser-Ranging Telemetry Console
            </h2>
          </div>

          {/* Unit Mode Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-[#111A30] rounded-lg border border-slate-800 text-xs font-mono">
            <span className="text-slate-400 px-2">Units:</span>
            <button
              onClick={() => setUnitMode('km-s')}
              className={`px-2.5 py-1 rounded transition-colors ${
                unitMode === 'km-s' ? 'bg-[#55DDF5] text-[#050816] font-bold' : 'text-slate-300'
              }`}
            >
              km / s
            </button>
            <button
              onClick={() => setUnitMode('km-ms')}
              className={`px-2.5 py-1 rounded transition-colors ${
                unitMode === 'km-ms' ? 'bg-[#55DDF5] text-[#050816] font-bold' : 'text-slate-300'
              }`}
            >
              km / ms
            </button>
            <button
              onClick={() => setUnitMode('miles-s')}
              className={`px-2.5 py-1 rounded transition-colors ${
                unitMode === 'miles-s' ? 'bg-[#55DDF5] text-[#050816] font-bold' : 'text-slate-300'
              }`}
            >
              miles / s
            </button>
          </div>
        </div>

        {/* Visual Stage */}
        <div className="relative w-full h-[260px] sm:h-[320px] rounded-xl overflow-hidden border border-slate-800 bg-[#050816]">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Live Calculations HUD */}
          <div className="absolute bottom-3 left-3 bg-[#0B1024]/90 backdrop-blur-md border border-slate-800 p-3 rounded-lg font-mono text-xs space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
              Idealized Round-Trip Transit Time
            </div>
            <div className="text-lg font-bold text-[#55DDF5] tabular-nums">
              {formatRoundTripTime(calculatedRoundTripSeconds)}
            </div>
            <div className="text-[11px] text-slate-300">
              One-way: {formatRoundTripTime(calculatedOneWaySeconds)} · Distance: {displayDistance} {distUnitLabel}
            </div>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Action buttons & Speed */}
          <div className="md:col-span-5 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-4 py-2 rounded-lg bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Pause Beam' : 'Fire Laser Beam'}</span>
            </button>

            <button
              onClick={() => {
                setPulsePhase(0);
                setIsRunning(true);
              }}
              className="px-3 py-2 rounded-lg bg-[#111A30] hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-1.5 transition-colors border border-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Animation Speed Selector */}
            <div className="flex items-center gap-1 bg-[#111A30] p-1 rounded-lg border border-slate-800 text-xs font-mono ml-auto sm:ml-0">
              {[0.5, 1.0, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => setAnimationSpeed(s)}
                  className={`px-2 py-0.5 rounded text-[11px] ${
                    animationSpeed === s ? 'bg-[#55DDF5] text-[#050816] font-bold' : 'text-slate-400'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Distance Slider & Direct Numeric Entry */}
          <div className="md:col-span-7 bg-[#111A30] p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="dist-num" className="text-slate-300 font-medium">
                Target Distance Parameter:
              </label>
              <div className="flex items-center gap-1 font-mono">
                <input
                  id="dist-num"
                  type="number"
                  min={350000}
                  max={420000}
                  step={100}
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-24 bg-[#050816] border border-slate-700 rounded px-2 py-0.5 text-right font-bold text-[#55DDF5] text-xs focus:outline-none focus:ring-1 focus:ring-[#55DDF5]"
                />
                <span className="text-slate-400 text-xs">km</span>
              </div>
            </div>

            <input
              type="range"
              min={363104}
              max={405696}
              step={100}
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#55DDF5]"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <button
                onClick={() => setDistanceKm(363104)}
                className="hover:text-[#55DDF5] underline"
              >
                Perigee (363,104 km)
              </button>
              <button
                onClick={() => setDistanceKm(384400)}
                className="hover:text-[#55DDF5] underline"
              >
                Mean (384,400 km)
              </button>
              <button
                onClick={() => setDistanceKm(405696)}
                className="hover:text-[#55DDF5] underline"
              >
                Apogee (405,696 km)
              </button>
            </div>
          </div>
        </div>

        {/* Photons Link Budget Callout */}
        <div className="bg-[#111A30]/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 uppercase tracking-wider text-[11px]">
              Photon Link Budget (Radar Equation: $1/r^4$ Divergence)
            </span>
            <span className="text-[#FFC56B] text-[11px]">Diffraction Effect</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px]">TRANSMITTED / PULSE</span>
              <span className="text-white font-bold">~10^17 photons</span>
              <span className="text-[10px] text-slate-400 block">100 picosecond Nd:YAG</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">BEAM DIAMETER ON MOON</span>
              <span className="text-white font-bold">~2.0 kilometers</span>
              <span className="text-[10px] text-slate-400 block">Diffraction spread</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">PHOTONS DETECTED ON RETURN</span>
              <span className="text-[#75E3B0] font-bold">~1 to 3 photons</span>
              <span className="text-[10px] text-slate-400 block">Single-photon avalanche diode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Experiment Challenges Section */}
      <div className="bg-[#0B1024] rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span>Interactive Student Lab Challenges</span>
              <Sparkles className="w-4 h-4 text-[#55DDF5]" />
            </h3>
            <p className="text-xs text-slate-400">
              Apply physics principles to predict, compare, and analyze lunar ranging results.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#111A30] rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => {
                setChallengeMode('A');
                setChallengeFeedback(null);
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                challengeMode === 'A' ? 'bg-[#55DDF5] text-[#050816] font-bold' : 'text-slate-300'
              }`}
            >
              Challenge A
            </button>
            <button
              onClick={() => {
                setChallengeMode('B');
                setChallengeFeedback(null);
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                challengeMode === 'B' ? 'bg-[#55DDF5] text-[#050816] font-bold' : 'text-slate-300'
              }`}
            >
              Challenge B
            </button>
            <button
              onClick={() => {
                setChallengeMode('C');
                setChallengeFeedback(null);
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                challengeMode === 'C' ? 'bg-[#55DDF5] text-[#050816] font-bold' : 'text-slate-300'
              }`}
            >
              Challenge C
            </button>
          </div>
        </div>

        {/* Challenge A */}
        {challengeMode === 'A' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-bold text-[#55DDF5] font-mono block">
                Challenge A: Predict the Round-Trip Time
              </span>
              <p>
                At the current selected distance of{' '}
                <span className="font-mono font-bold text-white">
                  {distanceKm.toLocaleString()} km
                </span>
                , predict the round-trip light transit time in seconds using c = 299,792.458 km/s.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="pred-input" className="text-xs text-slate-400 font-mono">
                  Your Prediction:
                </label>
                <input
                  id="pred-input"
                  type="text"
                  value={predictionInput}
                  onChange={(e) => setPredictionInput(e.target.value)}
                  placeholder="e.g. 2.5644"
                  className="w-28 bg-[#111A30] border border-slate-700 rounded px-2.5 py-1 text-xs font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#55DDF5]"
                />
                <span className="text-xs text-slate-400 font-mono">seconds</span>
              </div>

              <button
                onClick={handleCheckChallengeA}
                className="px-4 py-1.5 rounded-lg bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-xs transition-colors"
              >
                Validate Prediction
              </button>

              <button
                onClick={handleLogExperiment}
                className="px-3.5 py-1.5 rounded-lg bg-[#111A30] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs transition-colors"
              >
                + Log Run to Table
              </button>
            </div>

            {challengeFeedback && (
              <div
                className={`p-3 rounded-lg border text-xs leading-relaxed flex items-start gap-2.5 ${
                  challengeSolved
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                    : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}
              >
                {challengeSolved ? (
                  <CheckCircle2 className="w-4 h-4 text-[#75E3B0] shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-4 h-4 text-[#FFC56B] shrink-0 mt-0.5" />
                )}
                <div>{challengeFeedback}</div>
              </div>
            )}
          </div>
        )}

        {/* Challenge B */}
        {challengeMode === 'B' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-bold text-[#8A7CFF] font-mono block">
                Challenge B: Perigee vs. Apogee Orbital Timing Delta
              </span>
              <p>
                Compare the round-trip light travel time difference between the Moon’s closest orbital approach (Perigee: ~363,104 km) and farthest distance (Apogee: ~405,696 km).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#111A30] p-4 rounded-xl border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[11px]">POINT 1: PERIGEE</span>
                <span className="text-white font-bold">{distB1.toLocaleString()} km</span>
                <span className="block text-[#55DDF5] mt-1">
                  Δt = {((2 * distB1) / C_KM_S).toFixed(5)} seconds
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">POINT 2: APOGEE</span>
                <span className="text-white font-bold">{distB2.toLocaleString()} km</span>
                <span className="block text-[#75E3B0] mt-1">
                  Δt = {((2 * distB2) / C_KM_S).toFixed(5)} seconds
                </span>
              </div>
            </div>

            <div className="bg-[#050816] p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-[#FFC56B] font-bold block mb-1">Orbital Travel Time Variance:</span>
              <span>
                Round-trip difference: {(
                  ((2 * distB2) / C_KM_S) - ((2 * distB1) / C_KM_S)
                ).toFixed(5)} seconds (~284 milliseconds).
              </span>
            </div>
          </div>
        )}

        {/* Challenge C */}
        {challengeMode === 'C' && (
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <span className="font-bold text-[#FFC56B] font-mono block">
              Challenge C: Why Real Ranging Requires More Than Idealized Calculations
            </span>
            <p>
              An idealized classroom calculation assumes light travels in a pure geometric vacuum between point masses. In real NASA and ILRS operations, researchers must account for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>
                <strong className="text-slate-200">Tropospheric Refraction:</strong> Atmospheric gasses slow light by ~2.0 to 2.5 meters excess optical path length at zenith.
              </li>
              <li>
                <strong className="text-slate-200">Lunar Physical Librations:</strong> The Moon tilts and wobbles, changing the exact coordinate vector of the retroreflector relative to the lunar center of mass.
              </li>
              <li>
                <strong className="text-slate-200">Tectonic & Tidal Uplift:</strong> The ground observatory moves daily due to ocean tidal loading and continental drift.
              </li>
              <li>
                <strong className="text-slate-200">General Relativistic Shapiro Delay:</strong> Spacetime curvature slightly alters propagation time through the Sun and Earth gravitational fields.
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Simulated Experiments Results Table */}
      <div className="bg-[#0B1024] rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <span>Local Simulated Experiment Log (Session Only)</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/80">
                SIMULATED DATA
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Records up to 5 simulated trials performed in your current browser session. Not mixed into authentic scientific archives.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={trials.length === 0}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                trials.length > 0
                  ? 'bg-[#111A30] hover:bg-slate-800 text-slate-200 border border-slate-700'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 cursor-not-allowed'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setTrials([])}
              disabled={trials.length === 0}
              className="text-xs text-slate-400 hover:text-slate-200 font-mono"
            >
              Clear Log
            </button>
          </div>
        </div>

        {trials.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 font-mono">
            No simulated trials recorded yet. Use Challenge A and click &quot;+ Log Run to Table&quot; to save trial data.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-2 px-3">TRIAL #</th>
                  <th className="py-2 px-3">TIME</th>
                  <th className="py-2 px-3">DISTANCE (KM)</th>
                  <th className="py-2 px-3">PREDICTION (S)</th>
                  <th className="py-2 px-3">CALCULATED (S)</th>
                  <th className="py-2 px-3">DELTA (MS)</th>
                  <th className="py-2 px-3">DATA PROVENANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {trials.map((t) => (
                  <tr key={t.trialNumber} className="hover:bg-[#111A30]/50">
                    <td className="py-2.5 px-3 font-bold text-white">#{t.trialNumber}</td>
                    <td className="py-2.5 px-3 text-slate-400">{t.timestamp}</td>
                    <td className="py-2.5 px-3 text-[#55DDF5]">{t.distanceKm.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-slate-300">{t.studentPredictionSeconds.toFixed(6)}</td>
                    <td className="py-2.5 px-3 text-emerald-400">{t.calculatedTimeSeconds.toFixed(6)}</td>
                    <td className="py-2.5 px-3 text-amber-300">{t.deltaMilliseconds.toFixed(2)} ms</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/70">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
