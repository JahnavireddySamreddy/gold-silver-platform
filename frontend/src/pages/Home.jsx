import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LivePriceTicker from "../components/LivePriceTicker";
import API from "../services/api";

/* ── Animated number counter ── */
function Counter({ to, prefix = "", suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        setVal(Math.floor(p * p * to));
        if (p < 1) requestAnimationFrame(tick);
        else setVal(to);
      };
      requestAnimationFrame(tick);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString("en-IN")}{suffix}</span>;
}

/* ── Single gold particle ── */
function Particle({ style }) {
  return (
    <div className="absolute rounded-full pointer-events-none"
      style={{ background:"radial-gradient(circle,rgba(212,175,55,.7),transparent)", ...style }} />
  );
}

/* ── Feature card ── */
function FeatureCard({ icon, title, desc, delay }) {
  return (
    <div className={`glass glass-hover rounded-2xl p-7 transition-all duration-500 cursor-default animate-fadeInUp`}
      style={{animationDelay:`${delay}ms`}}>
      <div className="w-12 h-12 rounded-xl glass-gold flex items-center justify-center text-2xl mb-5">{icon}</div>
      <h3 className="font-display text-xl font-semibold text-gold-light mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/* ── Step card ── */
function StepCard({ num, title, desc, delay }) {
  return (
    <div className={`relative animate-fadeInUp`} style={{animationDelay:`${delay}ms`}}>
      <div className="flex items-start gap-5">
        <div className="shrink-0 w-12 h-12 rounded-full border-2 border-gold/40 flex items-center justify-center font-price text-xl text-gold animate-borderGlow">
          {num}
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-gold-light mb-1">{title}</h3>
          <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [prices, setPrices] = useState({ Gold: 9500, Silver: 110 });
  const [pricesLoaded, setPricesLoaded] = useState(false);

  useEffect(() => {
    API.get("/prices").then((res) => {
      const pm = {};
      res.data.forEach((p) => (pm[p.metal_type] = p.current_price));
      setPrices(pm);
      setPricesLoaded(true);
    }).catch(() => setPricesLoaded(true));
  }, []);

  const FEATURES = [
    { icon:"⚡", title:"Live Market Prices",       desc:"Real-time Gold and Silver prices refreshed every 30 seconds directly from market feeds." },
    { icon:"🔐", title:"Bank-Grade Security",       desc:"JWT authentication, BCrypt hashing, rate limiting, and SQL injection prevention built in." },
    { icon:"📊", title:"Portfolio Analytics",       desc:"Track your holdings, profit/loss, average buy price and visualize growth with interactive charts." },
    { icon:"💸", title:"Instant Buy & Sell",        desc:"Enter an amount, see the quantity calculation live, confirm in one click. Simple and fast." },
    { icon:"📑", title:"Full Transaction History",  desc:"Every trade recorded with date, type, quantity, price and export to CSV at any time." },
    { icon:"📱", title:"Responsive Design",         desc:"Seamless experience across desktop, tablet and mobile with smooth animations throughout." },
  ];

  const STEPS = [
    { num:"01", title:"Create your account",    desc:"Register with name, email and password. Your data is encrypted and secure from day one." },
    { num:"02", title:"View live prices",       desc:"Check real-time Gold and Silver prices on the dashboard with 30-second auto-refresh." },
    { num:"03", title:"Buy metals",             desc:"Enter an investment amount, instantly see how many grams you receive, confirm purchase." },
    { num:"04", title:"Track your portfolio",   desc:"Monitor holdings, average buy price, current value and profit/loss with visual charts." },
  ];

  const KNOWLEDGE = [
    {
      category:"Gold",
      icon:"🥇",
      title:"Why Gold is the Ultimate Hedge",
      desc:"Gold has preserved wealth for thousands of years. As a non-correlated asset it protects against inflation, currency devaluation and market crashes.",
      tag:"Fundamental",
    },
    {
      category:"Silver",
      icon:"🥈",
      title:"Silver: Industrial & Investment Demand",
      desc:"Silver is the only precious metal with massive industrial demand — solar panels, electronics, medicine — while still functioning as a monetary metal.",
      tag:"Deep Dive",
    },
    {
      category:"Strategy",
      icon:"📐",
      title:"Gold:Silver Ratio Explained",
      desc:"The ratio of gold price to silver price is one of the oldest trading signals. Historically it oscillates between 50–80, creating systematic buy/sell signals.",
      tag:"Strategy",
    },
    {
      category:"Basics",
      icon:"📖",
      title:"SIP in Precious Metals",
      desc:"A Systematic Investment Plan in Gold or Silver averages out your purchase price over time, reducing timing risk and building wealth steadily.",
      tag:"Beginner",
    },
    {
      category:"Market",
      icon:"🌍",
      title:"Global Factors That Move Gold Price",
      desc:"Fed interest rates, USD strength, geopolitical tensions, central bank buying — understand the macro forces that drive precious metal prices.",
      tag:"Market",
    },
    {
      category:"Tax",
      icon:"📋",
      title:"Tax on Precious Metal Gains in India",
      desc:"Gains from Gold held over 3 years are taxed as LTCG at 20% with indexation. Shorter holdings are taxed as per your income slab.",
      tag:"India",
    },
  ];

  return (
    <div className="min-h-screen" style={{background:"var(--bg-deep)"}}>
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-mesh">

        {/* Particles */}
        {[
          { width:3, height:3, top:"15%", left:"8%",  animationDuration:"6s",  animationDelay:"0s"  },
          { width:2, height:2, top:"25%", right:"12%", animationDuration:"8s",  animationDelay:"1s"  },
          { width:4, height:4, top:"60%", left:"5%",  animationDuration:"7s",  animationDelay:".5s" },
          { width:2, height:2, top:"70%", right:"8%", animationDuration:"9s",  animationDelay:"2s"  },
          { width:3, height:3, top:"45%", left:"92%", animationDuration:"5s",  animationDelay:"1.5s"},
          { width:5, height:5, top:"80%", left:"50%", animationDuration:"10s", animationDelay:"3s"  },
        ].map((s, i) => (
          <Particle key={i} style={s} />
        ))}

        {/* Decorative large orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{background:"radial-gradient(circle,rgba(212,175,55,.05) 0%,transparent 65%)"}} />

        {/* Rotating hex ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold/5 animate-spin-slow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-gold/8 pointer-events-none"
          style={{animation:"spin 20s linear infinite reverse"}} />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-gold px-4 py-1.5 rounded-full mb-8 animate-fadeInUp">
              <div className="live-dot scale-75" />
              <span className="font-cinzel text-xs tracking-widest text-gold">LIVE MARKETS · SECURE TRADING</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-6 animate-fadeInUp delay-100">
              <span className="gold-shimmer">Invest in Gold</span>
              <br />
              <span className="text-silver-light italic font-light">&amp; Silver</span>
              <br />
              <span className="text-2xl md:text-4xl font-normal text-text-muted">with confidence</span>
            </h1>

            <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed mb-10 animate-fadeInUp delay-200">
              A modern investment platform for India's most trusted wealth-preserving assets.
              Track live prices, buy instantly, visualize portfolio growth — all in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fadeInUp delay-300">
              <Link to="/register" className="btn-gold px-8 py-4 rounded-xl text-base font-bold w-full sm:w-auto text-center">
                <span>Start Investing Free →</span>
              </Link>
              <Link to="/knowledge" className="btn-outline-gold px-8 py-4 rounded-xl text-base w-full sm:w-auto text-center">
                Learn First
              </Link>
            </div>

            {/* Live price cards */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto animate-fadeInUp delay-400">
              {[
                { metal:"Gold",   icon:"🥇", color:"from-gold/10 to-gold-dark/5", border:"border-gold/25", tc:"text-gold-light" },
                { metal:"Silver", icon:"🥈", color:"from-silver/10 to-silver-dark/5", border:"border-silver/25", tc:"text-silver-light" },
              ].map(({ metal, icon, color, border, tc }) => (
                <div key={metal} className={`glass-gold price-card rounded-2xl p-6 bg-gradient-to-br ${color} ${border} border text-left relative overflow-hidden`}>
                  <div className="absolute top-3 right-3">
                    <div className="live-dot scale-75" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{icon}</span>
                    <span className="font-cinzel text-xs tracking-[.2em] text-text-muted">{metal.toUpperCase()}</span>
                  </div>
                  <div className={`font-price text-5xl ${tc}`}>
                    ₹{pricesLoaded ? prices[metal]?.toLocaleString("en-IN") : "—"}
                  </div>
                  <div className="text-xs text-text-muted mt-1">per gram · live</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] font-cinzel tracking-widest text-gold/50">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
      </section>

      {/* ══ LIVE TICKER ════════════════════════════════════════════ */}
      <LivePriceTicker />

      {/* ══ STATS ══════════════════════════════════════════════════ */}
      <section className="py-24 mesh-bg relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-sep mb-6 mx-auto">
              <div className="gold-line flex-1" />
              <span>By the Numbers</span>
              <div className="gold-line flex-1" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-light">Trusted by Investors</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { to:12000, suffix:"+", label:"Active Investors",    icon:"👥" },
              { to:240,   prefix:"₹", suffix:"Cr+", label:"Volume Traded", icon:"💰" },
              { to:99,    suffix:".9% Uptime", label:"Platform Reliability", icon:"⚡" },
              { to:24,    suffix:"/7 Support", label:"Always Available",     icon:"🛡️" },
            ].map((s, i) => (
              <div key={i} className="glass glass-hover rounded-2xl p-8 text-center transition animate-fadeInUp"
                style={{animationDelay:`${i*100}ms`}}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="stat-num text-4xl mb-2">
                  <Counter to={s.to} prefix={s.prefix||""} suffix={s.suffix||""} />
                </div>
                <div className="text-xs text-text-muted tracking-widest uppercase font-cinzel">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ═══════════════════════════════════════════════ */}
      <section className="py-24 relative" style={{background:"var(--bg-dark)"}}>
        <div className="absolute inset-0 pointer-events-none"
          style={{background:"radial-gradient(ellipse 80% 40% at 50% 50%,rgba(212,175,55,.04),transparent)"}} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-sep mb-6 mx-auto">
              <div className="gold-line flex-1" /><span>Platform Features</span><div className="gold-line flex-1" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-light mb-4">
              Everything You Need
            </h2>
            <p className="text-text-muted max-w-xl mx-auto text-sm">
              Built for serious investors who want a professional, reliable platform for precious metal accumulation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => <FeatureCard key={f.title} {...f} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ═══════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden mesh-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-sep mb-6">
                <div className="gold-line flex-1" /><span>How it Works</span><div className="gold-line flex-1" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-light mb-4">
                Start in 4 Simple Steps
              </h2>
              <p className="text-text-muted mb-12 text-sm leading-relaxed">
                From registration to your first investment takes less than 5 minutes. No paperwork, no complexity.
              </p>
              <div className="space-y-8">
                {STEPS.map((s, i) => <StepCard key={s.num} {...s} delay={i * 100} />)}
              </div>
            </div>

            {/* Visual side */}
            <div className="relative flex justify-center">
              <div className="relative w-72 h-72">
                {/* Outer rings */}
                <div className="absolute inset-0 rounded-full border border-gold/10 animate-spin-slow" />
                <div className="absolute inset-6 rounded-full border border-gold/15" style={{animation:"spin 20s linear infinite reverse"}} />
                <div className="absolute inset-12 rounded-full border border-gold/20 animate-spin-slow" style={{animationDuration:"8s"}} />

                {/* Center */}
                <div className="absolute inset-16 rounded-full glass-gold flex items-center justify-center animate-float">
                  <span className="text-5xl">⬡</span>
                </div>

                {/* Orbit dots */}
                {["🥇","🥈","📊","💰"].map((icon, i) => (
                  <div key={i} className="absolute w-10 h-10 rounded-full glass flex items-center justify-center text-lg"
                    style={{
                      top:"50%", left:"50%",
                      marginTop:"-20px", marginLeft:"-20px",
                      transform:`rotate(${i*90}deg) translateX(130px) rotate(-${i*90}deg)`,
                      animation:`orbit ${12 + i*2}s linear infinite`,
                      animationDelay:`-${i*3}s`,
                    }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ KNOWLEDGE HUB PREVIEW ══════════════════════════════════ */}
      <section id="knowledge-preview" className="py-24" style={{background:"var(--bg-dark)"}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-sep mb-6 mx-auto">
              <div className="gold-line flex-1" /><span>Knowledge Hub</span><div className="gold-line flex-1" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-light mb-4">
              Invest with Insight
            </h2>
            <p className="text-text-muted max-w-xl mx-auto text-sm">
              Understand the markets before you invest. Real education for real investors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {KNOWLEDGE.map((k, i) => (
              <div key={i} className={`glass glass-hover rounded-2xl p-6 cursor-pointer transition animate-fadeInUp`}
                style={{animationDelay:`${i*80}ms`}}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{k.icon}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-cinzel tracking-widest border border-gold/20 text-gold">
                    {k.tag}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-gold-light mb-2">{k.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{k.desc}</p>
                <div className="mt-4 text-gold text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition">
                  Read more →
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/knowledge" className="btn-outline-gold px-8 py-3 rounded-xl text-sm inline-block">
              Explore Full Knowledge Hub →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ METAL COMPARISON ═══════════════════════════════════════ */}
      <section className="py-24 mesh-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-sep mb-6 mx-auto">
              <div className="gold-line flex-1" /><span>Compare</span><div className="gold-line flex-1" />
            </div>
            <h2 className="font-display text-4xl font-bold text-gold-light">Gold vs Silver</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                metal:"Gold", icon:"🥇", price: prices["Gold"], grad:"from-gold/10",
                facts:["Store of value for 5,000+ years","Safe haven in economic crises","Central bank reserve asset","High price → lower entry barrier via fractional buying"],
              },
              {
                metal:"Silver", icon:"🥈", price: prices["Silver"], grad:"from-silver/10",
                facts:["2× industrial demand vs monetary","Solar panel & EV supply surge","Higher volatility = higher upside","Low price → easier accumulation"],
              },
            ].map((m) => (
              <div key={m.metal} className={`glass glass-hover rounded-2xl p-8 bg-gradient-to-br ${m.grad} to-transparent transition`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{m.icon}</span>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold tracking-widest text-gold-light">{m.metal.toUpperCase()}</h3>
                    <div className="font-price text-3xl text-gold">₹{m.price?.toLocaleString("en-IN")}/g</div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {m.facts.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-text-muted">
                      <span className="text-gold mt-0.5">✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{background:"var(--bg-dark)"}}>
        <div className="absolute inset-0 pointer-events-none"
          style={{background:"radial-gradient(ellipse 60% 80% at 50% 50%,rgba(212,175,55,.08),transparent)"}} />
        <div className="absolute inset-0 pointer-events-none border-y border-gold/10" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-5xl block mb-6 animate-float">🏆</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-gold-light mb-4">
            Start Building Wealth Today
          </h2>
          <p className="text-text-muted text-lg mb-10 leading-relaxed">
            Join thousands of investors growing their wealth with Gold & Silver.
            No lock-in. No hidden fees. Start with as little as ₹500.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-gold px-10 py-4 rounded-xl text-base font-bold">
              <span>Create Free Account →</span>
            </Link>
            <Link to="/login" className="btn-outline-gold px-10 py-4 rounded-xl text-base">
              Login to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
