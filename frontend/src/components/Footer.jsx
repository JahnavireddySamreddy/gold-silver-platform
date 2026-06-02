import { Link } from "react-router-dom";

const COLS = [
  {
    title: "Platform",
    links: [
      { label:"Dashboard",    to:"/dashboard" },
      { label:"Portfolio",    to:"/portfolio" },
      { label:"Trade",        to:"/buy"        },
      { label:"Transactions", to:"/transactions"},
    ],
  },
  {
    title: "Learn",
    links: [
      { label:"Knowledge Hub",   to:"/knowledge"       },
      { label:"Gold Investing",  to:"/knowledge#gold"  },
      { label:"Silver Guide",    to:"/knowledge#silver"},
      { label:"Market Basics",   to:"/knowledge#market"},
    ],
  },
  {
    title: "Account",
    links: [
      { label:"Login",    to:"/login"    },
      { label:"Register", to:"/register" },
    ],
  },
];

const STATS = [
  { value:"₹2.4Cr+", label:"Volume Traded" },
  { value:"12,000+", label:"Investors"      },
  { value:"99.9%",   label:"Uptime"         },
  { value:"24/7",    label:"Support"        },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{background:"var(--bg-deep)"}}>

      {/* Top gold line */}
      <div className="gold-line" />

      {/* Stats bar */}
      <div style={{borderBottom:"1px solid var(--border)"}} className="py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-price text-3xl gold-shimmer">{s.value}</div>
              <div className="text-xs text-text-muted mt-1 tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold">⬡</div>
              <div>
                <span className="font-cinzel text-sm font-bold tracking-widest text-gold-light block">BULLION</span>
                <span className="font-cinzel text-[9px] tracking-[.3em] text-text-muted">INVEST</span>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              India's modern platform for digital gold and silver investment. Transparent pricing, secure transactions, real-time market data.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {["𝕏","in","f","▶"].map((icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-sm text-text-muted hover:text-gold hover:border-gold/30 transition">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-cinzel text-xs font-bold tracking-[.2em] text-gold uppercase mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}
                      className="text-sm text-text-muted hover:text-gold transition flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="gold-line" />
      <div className="py-5 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-text-muted text-xs">
          © {new Date().getFullYear()} Bullion Invest. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {["Privacy Policy","Terms of Use","Risk Disclosure"].map((t) => (
            <a key={t} href="#" className="text-xs text-text-muted hover:text-gold transition">{t}</a>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <div className="live-dot scale-75" />
          <span>Markets live</span>
        </div>
      </div>

      {/* Decorative gold orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full"
        style={{background:"radial-gradient(ellipse,rgba(212,175,55,.04) 0%,transparent 70%)",pointerEvents:"none"}} />
    </footer>
  );
}
