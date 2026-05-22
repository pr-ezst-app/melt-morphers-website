import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const FLAVORS = [
  {
    id: "arctic",
    name: "Arctic Blast",
    tagline: "Ice-cold clarity",
    color: "#1A6EFF",
    glow: "rgba(26,110,255,0.35)",
    emoji: "🧊",
    notes: ["Peppermint", "Glacier Water", "Menthol"],
  },
  {
    id: "inferno",
    name: "Inferno Rush",
    tagline: "Ignite your limits",
    color: "#E8210A",
    glow: "rgba(232,33,10,0.35)",
    emoji: "🔥",
    notes: ["Wild Cherry", "Cayenne", "Pomegranate"],
  },
  {
    id: "nova",
    name: "Nova Surge",
    tagline: "Electrify every cell",
    color: "#2A4EFF",
    glow: "rgba(42,78,255,0.3)",
    emoji: "⚡",
    notes: ["Blue Raspberry", "Citrus", "Storm"],
  },
  {
    id: "ember",
    name: "Ember Strike",
    tagline: "Burn brighter",
    color: "#CC1A0A",
    glow: "rgba(204,26,10,0.3)",
    emoji: "💥",
    notes: ["Watermelon", "Chili", "Grapefruit"],
  },
];

const SCIENCE = [
  {
    icon: "Zap",
    label: "Rapid Absorption",
    stat: "3×",
    desc: "Faster than water alone via optimized osmolality",
    color: "#1A6EFF",
  },
  {
    icon: "Activity",
    label: "Endurance Boost",
    stat: "+28%",
    desc: "Sustained output in clinical performance trials",
    color: "#E8210A",
  },
  {
    icon: "Droplets",
    label: "Hydration Score",
    stat: "98",
    desc: "Out of 100 on the Hydration Efficiency Index",
    color: "#2A4EFF",
  },
  {
    icon: "FlaskConical",
    label: "Electrolytes",
    stat: "5",
    desc: "Key minerals: Na, K, Mg, Ca, Phosphate in exact ratios",
    color: "#CC1A0A",
  },
];

const FEATURES = [
  {
    icon: "Atom",
    title: "Ionic Balance Formula",
    body: "Engineered at the molecular level. Each sachet delivers sodium, potassium, magnesium and calcium in clinically validated ratios that mirror what elite athletes lose during peak exertion.",
  },
  {
    icon: "Timer",
    title: "Morphs in 8 Seconds",
    body: "No stirring, no shaking. The proprietary Melt-Tech crystal dissolves instantly on contact with water — so you're never slowed down by your hydration.",
  },
  {
    icon: "ShieldCheck",
    title: "Zero Sugar, Zero Compromise",
    body: "Clean fuel. No artificial sweeteners, no fillers. NSF Certified for Sport — safe for professional athletes at every level.",
  },
  {
    icon: "TrendingUp",
    title: "Performance Tested",
    body: "Developed with sports scientists and tested across marathon runners, weightlifters, and HIIT athletes. One formula built for every discipline.",
  },
];

const MARQUEE_ITEMS = [
  "ELECTROLYTE SCIENCE",
  "PEAK PERFORMANCE",
  "MELT IN 8 SECONDS",
  "ZERO SUGAR",
  "NSF CERTIFIED",
  "5 KEY MINERALS",
  "ARCTIC BLAST",
  "INFERNO RUSH",
  "NOVA SURGE",
];

function useCountUp(target: number, duration = 1800, trigger: boolean = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return val;
}

function StatCard({ stat, icon, label, desc, color, index }: {
  stat: string; icon: string; label: string; desc: string; color: string; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const numericPart = parseFloat(stat.replace(/[^0-9.]/g, "")) || 0;
  const suffix = stat.replace(/[0-9.]/g, "");
  const counted = useCountUp(numericPart, 1500, visible);

  return (
    <div
      ref={ref}
      className="glass-card rounded-2xl p-7 flex flex-col gap-3 reveal"
      style={{
        animationDelay: `${index * 0.12}s`,
        borderColor: visible ? `${color}33` : undefined,
        borderWidth: 1,
        borderStyle: "solid",
      }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-1" style={{ background: `${color}18` }}>
        <Icon name={icon} size={22} style={{ color }} />
      </div>
      <div className="stat-number text-4xl font-bold tracking-tight" style={{ color }}>
        {visible ? (numericPart % 1 !== 0 ? stat : `${counted}${suffix}`) : "—"}
      </div>
      <div className="font-semibold text-white/90 text-sm tracking-wide uppercase font-syne">{label}</div>
      <div className="text-white/45 text-sm leading-relaxed">{desc}</div>
    </div>
  );
}

function scrollToSignup() {
  document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
}

export default function Index() {
  const [activeFlavor, setActiveFlavor] = useState(0);
  const flavor = FLAVORS[activeFlavor];
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#080808", color: "#F0EDE8" }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: scrollY > 40 ? "rgba(8,8,8,0.92)" : "transparent",
          backdropFilter: scrollY > 40 ? "blur(16px)" : "none",
          borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧬</span>
          <span className="font-bold tracking-widest uppercase text-sm font-syne text-white">Melt Morphers</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-white/50 font-syne font-medium">
          <a href="#science" className="hover:text-white transition-colors">Science</a>
          <a href="#flavors" className="hover:text-white transition-colors">Flavors</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
        </div>
        <button onClick={scrollToSignup} className="btn-red text-xs px-6 py-2.5 rounded-lg tracking-widest">
          Pre-Order
        </button>
      </nav>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* ── HERO BACKGROUND: layered mesh ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Base dark */}
          <div className="absolute inset-0" style={{ background: "#060608" }} />

          {/* Red cone — top right */}
          <div className="absolute" style={{
            width: "70vw", height: "70vw",
            top: "-20%", right: "-15%",
            background: "conic-gradient(from 200deg at 60% 40%, rgba(232,33,10,0.55) 0deg, rgba(180,10,0,0.3) 40deg, transparent 100deg)",
            filter: "blur(60px)",
            transform: `translateY(${scrollY * 0.07}px)`,
          }} />

          {/* Blue cone — bottom left */}
          <div className="absolute" style={{
            width: "65vw", height: "65vw",
            bottom: "-15%", left: "-10%",
            background: "conic-gradient(from 20deg at 40% 60%, rgba(26,110,255,0.5) 0deg, rgba(0,60,200,0.25) 50deg, transparent 110deg)",
            filter: "blur(55px)",
            transform: `translateY(${scrollY * -0.05}px)`,
          }} />

          {/* Center soft glow */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(20,20,40,0.6) 0%, transparent 80%)",
          }} />

          {/* Diagonal stripe texture */}
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(120deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 60px)",
          }} />

          {/* Top vignette */}
          <div className="absolute inset-x-0 top-0 h-40" style={{
            background: "linear-gradient(to bottom, rgba(6,6,8,0.9), transparent)",
          }} />

          {/* Bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-48" style={{
            background: "linear-gradient(to top, rgba(6,6,8,1), transparent)",
          }} />
        </div>

        {/* Floating particles */}
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: i % 3 === 0 ? 7 : i % 3 === 1 ? 4 : 3,
              height: i % 3 === 0 ? 7 : i % 3 === 1 ? 4 : 3,
              left: `${8 + i * 6.5}%`,
              top: `${12 + (i % 6) * 13}%`,
              background: i % 2 === 0 ? "rgba(26,110,255,0.75)" : "rgba(232,33,10,0.75)",
              boxShadow: i % 2 === 0 ? "0 0 8px rgba(26,110,255,0.8)" : "0 0 8px rgba(232,33,10,0.8)",
              animation: `float-particle ${3.2 + i * 0.35}s ease-in-out infinite`,
              animationDelay: `${i * 0.28}s`,
            }}
          />
        ))}

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6" style={{ paddingTop: 120 }}>
          {/* Eyebrow pill */}
          <div className="reveal inline-flex items-center gap-2.5 mb-10 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-syne font-semibold"
            style={{ border: "1px solid rgba(26,110,255,0.35)", background: "rgba(26,110,255,0.07)", color: "#6AA3FF" }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-ring inline-block" style={{ background: "#6AA3FF" }} />
            Electrolyte Science Reimagined
          </div>

          {/* ── BIG BRAND TITLE ── */}
          <div className="reveal reveal-delay-1 relative mb-4 select-none" style={{ lineHeight: 0.88 }}>
            {/* Ghost outline behind */}
            <div
              aria-hidden
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <span
                className="block font-cormorant font-light"
                style={{
                  fontSize: "clamp(4.5rem, 13vw, 12rem)",
                  letterSpacing: "-0.03em",
                  WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                  color: "transparent",
                  lineHeight: 0.9,
                  userSelect: "none",
                }}
              >
                MELT
              </span>
              <span
                className="block font-cormorant font-light"
                style={{
                  fontSize: "clamp(4.5rem, 13vw, 12rem)",
                  letterSpacing: "-0.03em",
                  WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                  color: "transparent",
                  lineHeight: 0.9,
                  userSelect: "none",
                }}
              >
                MORPHERS
              </span>
            </div>

            {/* Actual title — split coloring */}
            <h1 style={{ position: "relative", zIndex: 1 }}>
              <span
                className="block font-cormorant font-semibold"
                style={{
                  fontSize: "clamp(4.5rem, 13vw, 12rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.9,
                  background: "linear-gradient(135deg, #FF6B5A 0%, #E8210A 45%, #AA1200 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 40px rgba(232,33,10,0.45))",
                }}
              >
                MELT
              </span>
              <span
                className="block font-cormorant font-semibold"
                style={{
                  fontSize: "clamp(4.5rem, 13vw, 12rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.9,
                  background: "linear-gradient(135deg, #7AB5FF 0%, #1A6EFF 50%, #003ECC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 40px rgba(26,110,255,0.45))",
                }}
              >
                MORPHERS
              </span>
            </h1>
          </div>

          {/* Subline */}
          <p className="reveal reveal-delay-2 font-cormorant italic text-white/45 text-[clamp(1.1rem,2.5vw,1.7rem)] mb-12" style={{ letterSpacing: "0.01em" }}>
            The instant-dissolve electrolyte crystal for athletes who refuse to wait.
          </p>

          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToSignup} className="btn-red w-full sm:w-auto px-10 py-4 rounded-xl text-sm tracking-widest font-syne font-bold">
              Pre-Order Now — $34
            </button>
            <button onClick={scrollToSignup} className="btn-outline-blue w-full sm:w-auto px-10 py-4 rounded-xl text-sm tracking-widest font-syne font-semibold">
              Watch It Dissolve ▶
            </button>
          </div>

          {/* Stats strip */}
          <div className="reveal reveal-delay-4 mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {[
              { val: "8s", label: "Dissolve time" },
              { val: "5", label: "Electrolytes" },
              { val: "0g", label: "Sugar" },
              { val: "28%", label: "More endurance" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="stat-number text-2xl font-bold" style={{ color: i % 2 === 0 ? "#1A6EFF" : "#E8210A" }}>{s.val}</div>
                <div className="text-white/35 text-xs tracking-widest uppercase font-syne mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 text-xs tracking-widest uppercase font-syne"
          style={{ animation: "float-particle 2.5s ease-in-out infinite" }}>
          <span>Scroll</span>
          <Icon name="ChevronDown" size={14} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
        <div className="marquee-track flex items-center gap-8 w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-8 text-xs tracking-widest font-syne font-semibold uppercase text-white/30 whitespace-nowrap">
              {item}
              <span style={{ color: i % 4 < 2 ? "#1A6EFF" : "#E8210A", opacity: 0.6 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SCIENCE STATS ── */}
      <section id="science" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block text-xs tracking-widest uppercase font-syne font-semibold mb-4 px-3 py-1 rounded-full"
            style={{ border: "1px solid rgba(232,33,10,0.3)", color: "#FF6B5A", background: "rgba(232,33,10,0.06)" }}>
            The Science
          </div>
          <h2 className="font-cormorant text-[clamp(2.5rem,5vw,5rem)] leading-tight font-light text-white">
            Performance <em className="text-red-gradient not-italic">measured</em>,<br />
            not promised.
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto text-base font-syne leading-relaxed">
            Every number is peer-reviewed. Every claim is tested on real athletes under real conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SCIENCE.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </div>

        {/* Science detail */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8" style={{ borderColor: "rgba(26,110,255,0.12)", borderWidth: 1, borderStyle: "solid" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(26,110,255,0.12)" }}>
                <Icon name="Beaker" size={18} style={{ color: "#1A6EFF" }} fallback="FlaskConical" />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-white">Ionic Precision</h3>
            </div>
            <p className="text-white/45 text-sm leading-loose font-syne">
              Most electrolyte drinks flood the body with sodium alone. Melt Morphers delivers all five key ions in the exact molar ratios found in peak-performance sweat analysis — triggering faster cellular uptake and sustained muscle function.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Na⁺ Sodium", "K⁺ Potassium", "Mg²⁺ Magnesium", "Ca²⁺ Calcium", "HPO₄ Phosphate"].map(el => (
                <span key={el} className="px-3 py-1 rounded-full text-xs font-syne font-semibold"
                  style={{ background: "rgba(26,110,255,0.1)", color: "#6AA3FF", border: "1px solid rgba(26,110,255,0.2)" }}>
                  {el}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8" style={{ borderColor: "rgba(232,33,10,0.12)", borderWidth: 1, borderStyle: "solid" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(232,33,10,0.12)" }}>
                <Icon name="Dna" size={18} style={{ color: "#E8210A" }} />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-white">Melt-Tech Crystal</h3>
            </div>
            <p className="text-white/45 text-sm leading-loose font-syne">
              Our proprietary crystal structure uses a hygroscopic lattice that collapses on contact with water within 8 seconds. No blenders, no shakers — just open, drop, and go. The chemistry does the work so you don't have to stop.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[["8s", "Dissolves"], ["100%", "Bioavailable"], ["pH 7.2", "Optimal"]].map(([n, l]) => (
                <div key={l} className="rounded-xl py-3" style={{ background: "rgba(232,33,10,0.07)" }}>
                  <div className="stat-number text-lg font-bold" style={{ color: "#E8210A" }}>{n}</div>
                  <div className="text-white/35 text-xs font-syne tracking-wide mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block text-xs tracking-widest uppercase font-syne font-semibold mb-4 px-3 py-1 rounded-full"
              style={{ border: "1px solid rgba(26,110,255,0.3)", color: "#6AA3FF", background: "rgba(26,110,255,0.06)" }}>
              Built Different
            </div>
            <h2 className="font-cormorant text-[clamp(2.5rem,5vw,5rem)] font-light text-white">
              Every detail is a <em className="text-blue-gradient not-italic">decision</em>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="glass-card rounded-2xl p-8 flex gap-5 group reveal"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  borderColor: "rgba(255,255,255,0.05)",
                  borderWidth: 1,
                  borderStyle: "solid",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = i % 2 === 0 ? "rgba(26,110,255,0.3)" : "rgba(232,33,10,0.3)";
                  (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "rgba(26,110,255,0.04)" : "rgba(232,33,10,0.04)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ background: i % 2 === 0 ? "rgba(26,110,255,0.12)" : "rgba(232,33,10,0.12)" }}>
                  <Icon name={f.icon} size={22} style={{ color: i % 2 === 0 ? "#1A6EFF" : "#E8210A" }} />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-white text-base mb-2 tracking-wide">{f.title}</h3>
                  <p className="text-white/42 text-sm leading-relaxed font-syne">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLAVORS ── */}
      <section id="flavors" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block text-xs tracking-widest uppercase font-syne font-semibold mb-4 px-3 py-1 rounded-full"
            style={{ border: "1px solid rgba(212,168,67,0.0)", color: "#FF6B5A", background: "rgba(232,33,10,0.06)", borderColor: "rgba(232,33,10,0.3)" }}>
            Flavor Lab
          </div>
          <h2 className="font-cormorant text-[clamp(2.5rem,5vw,5rem)] font-light text-white">
            Choose your <em className="text-red-gradient not-italic">weapon</em>.
          </h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto text-sm font-syne">
            Four signature profiles. Each one tuned to a different performance state.
          </p>
        </div>

        {/* Flavor selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {FLAVORS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActiveFlavor(i)}
              className="flavor-pill rounded-2xl p-5 text-left glass-card"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: activeFlavor === i ? `${f.color}BB` : "rgba(255,255,255,0.07)",
                background: activeFlavor === i ? `${f.color}10` : "rgba(255,255,255,0.02)",
                boxShadow: activeFlavor === i ? `0 0 30px ${f.glow}` : "none",
              }}
            >
              <div className="text-3xl mb-3">{f.emoji}</div>
              <div className="font-syne font-bold text-white text-sm tracking-wide">{f.name}</div>
              <div className="font-syne text-xs mt-1" style={{ color: f.color, opacity: 0.8 }}>{f.tagline}</div>
            </button>
          ))}
        </div>

        {/* Active flavor detail */}
        <div
          className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-12"
          style={{
            background: `linear-gradient(135deg, ${flavor.color}0A 0%, rgba(8,8,8,0.9) 100%)`,
            border: `1px solid ${flavor.color}30`,
            boxShadow: `0 0 80px ${flavor.glow}`,
            transition: "all 0.5s ease",
          }}
        >
          {/* Big emoji */}
          <div
            className="flex-shrink-0 w-40 h-40 rounded-3xl flex items-center justify-center text-7xl"
            style={{
              background: `${flavor.color}12`,
              border: `1px solid ${flavor.color}30`,
              boxShadow: `0 0 50px ${flavor.glow}`,
            }}
          >
            {flavor.emoji}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="text-xs tracking-widest uppercase font-syne font-semibold mb-2" style={{ color: flavor.color }}>
              Signature Profile
            </div>
            <h3 className="font-cormorant text-4xl md:text-5xl font-semibold text-white mb-2">{flavor.name}</h3>
            <div className="text-white/50 font-syne text-base italic mb-6">"{flavor.tagline}"</div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
              {flavor.notes.map(n => (
                <span key={n} className="px-4 py-1.5 rounded-full text-xs font-syne font-semibold tracking-wide"
                  style={{ background: `${flavor.color}15`, color: flavor.color, border: `1px solid ${flavor.color}35` }}>
                  {n}
                </span>
              ))}
            </div>

            <button onClick={scrollToSignup} className="px-8 py-3.5 rounded-xl text-sm font-syne font-bold tracking-widest uppercase text-white"
              style={{ background: flavor.color, boxShadow: `0 0 30px ${flavor.glow}` }}>
              Add to Pre-Order
            </button>
          </div>
        </div>
      </section>

      {/* ── SIGNUP / CTA ── */}
      <section id="signup" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(26,110,255,0.1) 0%, transparent 60%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(232,33,10,0.1) 0%, transparent 60%)" }} />
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-cormorant text-[clamp(3rem,6vw,6rem)] font-light leading-tight mb-4 text-white">
            Ready to <em className="text-red-gradient not-italic">melt</em> your <em className="text-blue-gradient not-italic">limits</em>?
          </h2>
          <p className="text-white/45 text-base font-syne mb-12 max-w-md mx-auto leading-relaxed">
            Be first in line. Drop your email and we'll notify you the moment we launch — plus an exclusive early-bird discount.
          </p>

          {submitted ? (
            <div
              className="inline-flex flex-col items-center gap-3 px-10 py-8 rounded-2xl"
              style={{ background: "rgba(26,110,255,0.08)", border: "1px solid rgba(26,110,255,0.3)" }}
            >
              <span className="text-4xl">🧬</span>
              <div className="font-cormorant text-2xl text-white font-semibold">You're on the list!</div>
              <div className="text-white/45 text-sm font-syne">We'll reach out before anyone else. Stay ready.</div>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto mb-10">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 w-full px-5 py-4 rounded-xl text-sm font-syne text-white placeholder-white/25 outline-none focus:ring-2"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  focusRingColor: "#1A6EFF",
                  caretColor: "#1A6EFF",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(26,110,255,0.6)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-red w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-syne font-bold tracking-widest whitespace-nowrap"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Joining…" : "Notify Me"}
              </button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs font-syne tracking-wide mt-8">
            <span className="flex items-center gap-1.5"><Icon name="Shield" size={12} /> NSF Certified</span>
            <span className="flex items-center gap-1.5"><Icon name="Truck" size={12} /> Free shipping $60+</span>
            <span className="flex items-center gap-1.5"><Icon name="RotateCcw" size={12} /> 30-day guarantee</span>
            <span className="flex items-center gap-1.5"><Icon name="Lock" size={12} /> No spam, ever</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/25 text-xs font-syne tracking-wide">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧬</span>
            <span className="font-bold uppercase tracking-widest text-white/40">Melt Morphers</span>
          </div>
          <div>© 2025 Melt Morphers. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}