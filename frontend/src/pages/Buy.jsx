import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`toast ${type === "success" ? "toast-success" : "toast-error"}`}>
      {msg}
    </div>
  );
}

export default function Buy() {
  const [metalType, setMetalType] = useState("Gold");
  const [amount,    setAmount]    = useState("");
  const [sellQty,   setSellQty]   = useState("");
  const [prices,    setPrices]    = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [tab,       setTab]       = useState("buy");
  const [loading,   setLoading]   = useState(false);
  const [toast,     setToast]     = useState(null);

  const refresh = () => Promise.all([API.get("/prices"), API.get("/portfolio")])
    .then(([pr, po]) => {
      const pm = {};
      pr.data.forEach(x => pm[x.metal_type] = x.current_price);
      setPrices(pm);
      setPortfolio(po.data);
    });

  useEffect(() => { refresh(); const id = setInterval(refresh, 30000); return () => clearInterval(id); }, []);

  const cp = prices[metalType] || 0;
  const estimatedGrams = amount && cp ? (parseFloat(amount)/cp).toFixed(4) : "0.0000";
  const estimatedValue = sellQty && cp  ? (parseFloat(sellQty)*cp).toFixed(0) : "0";
  const holding        = portfolio.find(h => h.metal_type === metalType);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const handleBuy = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/buy", { metal_type:metalType, amount:Number(amount) });
      showToast(`✅ Purchased ${res.data.quantity.toFixed(4)}g of ${metalType}!`);
      setAmount(""); refresh();
    } catch (err) {
      showToast(err.response?.data?.message || "Purchase failed", "error");
    } finally { setLoading(false); }
  };

  const handleSell = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/sell", { metal_type:metalType, quantity:Number(sellQty) });
      showToast(`✅ Sold ${sellQty}g for ₹${res.data.saleValue.toFixed(0)}!`);
      setSellQty(""); refresh();
    } catch (err) {
      showToast(err.response?.data?.message || "Sale failed", "error");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen" style={{background:"var(--bg-deep)"}}>
      <Navbar />
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-6xl mx-auto px-6 py-28">
        <div className="mb-10 animate-fadeInUp">
          <p className="font-cinzel text-xs tracking-widest text-gold uppercase mb-1">Trade</p>
          <h1 className="font-display text-4xl font-bold text-gold-light">Buy &amp; Sell Metals</h1>
          <p className="text-text-muted text-sm mt-1">Real-time prices · Instant settlement</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* Metal selector — LEFT */}
          <div className="lg:col-span-2 space-y-4 animate-fadeInUp delay-100">
            <h2 className="font-cinzel text-xs tracking-widest text-gold uppercase mb-3">Select Metal</h2>

            {["Gold","Silver"].map(m => {
              const hold = portfolio.find(h=>h.metal_type===m);
              return (
                <div key={m} onClick={() => setMetalType(m)}
                  className={`price-card glass rounded-2xl p-6 cursor-pointer transition border ${
                    metalType===m ? "border-gold/50 bg-gold/6 shadow-gold" : "border-white/8 hover:border-gold/20"
                  }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{m==="Gold"?"🥇":"🥈"}</span>
                      <div>
                        <p className="font-cinzel text-sm font-bold tracking-widest">{m.toUpperCase()}</p>
                        <p className="text-xs text-text-muted">per gram</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-price text-3xl text-gold">
                        ₹{(prices[m]||0).toLocaleString("en-IN")}
                      </div>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        <div className="live-dot scale-75" />
                        <span className="text-[10px] text-text-muted">live</span>
                      </div>
                    </div>
                  </div>
                  {hold && (
                    <div className="mt-4 pt-4 border-t border-white/5 text-xs text-text-muted">
                      Your {m}: <span className="text-gold">{hold.quantity.toFixed(4)} g</span>
                      <span className="ml-2">≈ ₹{(hold.quantity*(prices[m]||0)).toLocaleString("en-IN",{maximumFractionDigits:0})}</span>
                    </div>
                  )}
                  {metalType === m && (
                    <div className="mt-2 text-[10px] font-cinzel tracking-widest text-gold">● SELECTED</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Trade panel — RIGHT */}
          <div className="lg:col-span-3 glass-gold rounded-3xl p-8 border border-gold/20 animate-fadeInUp delay-200">

            {/* Tabs */}
            <div className="flex gap-2 mb-8">
              {[{id:"buy",label:"🛒 Buy"},{id:"sell",label:"💸 Sell"}].map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm transition ${
                    tab===t.id ? "btn-gold" : "glass text-text-muted hover:text-gold"
                  }`}>
                  {tab===t.id ? <span>{t.label}</span> : t.label}
                </button>
              ))}
            </div>

            {tab === "buy" ? (
              <form onSubmit={handleBuy} className="space-y-5">
                <div>
                  <label className="text-xs font-cinzel tracking-widest text-text-muted uppercase block mb-2">
                    Investment Amount (₹)
                  </label>
                  <input type="number" value={amount} onChange={e=>setAmount(e.target.value)}
                    placeholder="e.g. 10000" min="1"
                    className="input-dark w-full px-5 py-4 rounded-xl text-xl font-price" required />
                </div>

                {/* Live calc */}
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center justify-between text-xs text-text-muted mb-3">
                    <span className="font-cinzel tracking-widest uppercase">You will receive</span>
                    <span>@ ₹{cp.toLocaleString("en-IN")}/g</span>
                  </div>
                  <div className="font-price text-5xl text-gold leading-none">{estimatedGrams} g</div>
                  <div className="text-xs text-text-muted mt-2">of {metalType}</div>
                  {amount && <div className="mt-3 text-xs text-text-muted border-t border-white/5 pt-3">
                    ₹{Number(amount).toLocaleString("en-IN")} ÷ ₹{cp.toLocaleString("en-IN")}/g = {estimatedGrams} g
                  </div>}
                </div>

                <button type="submit" disabled={loading}
                  className="btn-gold w-full py-4 rounded-xl text-base disabled:opacity-50">
                  <span>{loading ? "Processing..." : `Buy ${metalType} →`}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleSell} className="space-y-5">
                <div>
                  <label className="text-xs font-cinzel tracking-widest text-text-muted uppercase block mb-2">
                    Quantity to Sell (grams)
                  </label>
                  <input type="number" value={sellQty} onChange={e=>setSellQty(e.target.value)}
                    placeholder="e.g. 0.5" min="0.0001" step="0.0001"
                    className="input-dark w-full px-5 py-4 rounded-xl text-xl font-price" required />
                  {holding && (
                    <button type="button" onClick={()=>setSellQty(holding.quantity.toFixed(4))}
                      className="mt-1 text-xs text-gold hover:text-gold-light transition">
                      Sell all ({holding.quantity.toFixed(4)} g)
                    </button>
                  )}
                </div>

                {/* Live calc */}
                <div className="glass rounded-2xl p-5" style={{borderColor:"rgba(239,68,68,.2)"}}>
                  <div className="flex items-center justify-between text-xs text-text-muted mb-3">
                    <span className="font-cinzel tracking-widest uppercase">You will receive</span>
                    <span>@ ₹{cp.toLocaleString("en-IN")}/g</span>
                  </div>
                  <div className="font-price text-5xl text-red-400 leading-none">₹{Number(estimatedValue).toLocaleString("en-IN")}</div>
                  <div className="text-xs text-text-muted mt-2">for {sellQty||"0"} g of {metalType}</div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-base font-bold disabled:opacity-50 transition">
                  {loading ? "Processing..." : `Sell ${metalType} →`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
