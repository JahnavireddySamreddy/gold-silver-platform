import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NAV_PUBLIC  = [{ to:"/",    label:"Home" }, { to:"/knowledge", label:"Knowledge Hub" }];
const NAV_PRIVATE = [
  { to:"/dashboard",    label:"Dashboard" },
  { to:"/portfolio",    label:"Portfolio"  },
  { to:"/transactions", label:"History"    },
  { to:"/buy",          label:"Trade"      },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const token = localStorage.getItem("token");
  const user  = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navLinks = token ? [...NAV_PUBLIC, ...NAV_PRIVATE] : NAV_PUBLIC;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-[#05080F]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(212,175,55,.15)]"
                 : "py-5 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-full bg-gold-grad opacity-20 group-hover:opacity-40 transition blur-md" />
              <div className="relative w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-gold transition">
                <span className="text-lg">⬡</span>
              </div>
            </div>
            <div>
              <span className="font-cinzel text-sm font-bold tracking-widest text-gold-light block leading-none">BULLION</span>
              <span className="font-cinzel text-[10px] tracking-[.3em] text-text-muted leading-none">INVEST</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === l.to
                    ? "text-gold bg-gold/10 border border-gold/20"
                    : "text-text-muted hover:text-gold hover:bg-gold/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {token ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass">
                  <div className="w-6 h-6 rounded-full bg-gold-grad flex items-center justify-center text-xs font-bold text-bg-deep">
                    {(user.name || "U")[0].toUpperCase()}
                  </div>
                  <span className="text-sm text-text-muted">{user.name?.split(" ")[0] || "User"}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"    className="btn-outline-gold px-4 py-2 rounded-lg text-sm font-medium">Login</Link>
                <Link to="/register" className="btn-gold px-4 py-2 rounded-lg text-sm"><span>Get Started</span></Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gold p-2">
            <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 mx-4 rounded-2xl glass p-4 space-y-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm text-text-muted hover:text-gold hover:bg-gold/5 transition">
                {l.label}
              </Link>
            ))}
            <div className="gold-line my-2" />
            {token ? (
              <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition">
                Logout
              </button>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link to="/login"    onClick={() => setMenuOpen(false)} className="flex-1 text-center btn-outline-gold px-4 py-2.5 rounded-lg text-sm">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center btn-gold px-4 py-2.5 rounded-lg text-sm"><span>Register</span></Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
