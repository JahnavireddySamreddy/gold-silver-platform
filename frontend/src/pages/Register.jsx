import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await API.post("/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen hero-mesh flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full glass-gold border border-gold/30 flex items-center justify-center text-3xl mx-auto mb-4">⬡</div>
            <h1 className="font-display text-4xl font-bold text-gold-light mb-1">Create Account</h1>
            <p className="text-text-muted text-sm">Start your precious metals journey</p>
          </div>

          <div className="glass-gold rounded-3xl p-8 border border-gold/20">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-5 text-sm">{error}</div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="text-xs font-cinzel tracking-widest text-text-muted uppercase block mb-2">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm" placeholder="Your name" required />
              </div>
              <div>
                <label className="text-xs font-cinzel tracking-widest text-text-muted uppercase block mb-2">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="text-xs font-cinzel tracking-widest text-text-muted uppercase block mb-2">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm" placeholder="Min 6 characters" required minLength={6} />
              </div>
              <button type="submit" disabled={loading}
                className="btn-gold w-full py-3.5 rounded-xl text-sm disabled:opacity-50 mt-2">
                <span>{loading ? "Creating account..." : "Create Account →"}</span>
              </button>
            </form>

            <div className="gold-line my-6" />
            <p className="text-center text-sm text-text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-gold hover:text-gold-light transition">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
