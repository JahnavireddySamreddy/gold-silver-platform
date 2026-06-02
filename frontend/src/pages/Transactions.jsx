import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter]   = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/transactions").then(res => setTransactions(res.data)).finally(() => setLoading(false));
  }, []);

  const exportCSV = () => {
    const rows = [
      ["Date","Type","Metal","Quantity","Price/g","Amount"],
      ...filtered.map(t => [
        new Date(t.created_at).toLocaleDateString("en-IN"),
        t.transaction_type, t.metal_type,
        t.quantity.toFixed(4), t.price, t.total_amount,
      ]),
    ];
    const blob = new Blob([rows.map(r=>r.join(",")).join("\n")], {type:"text/csv"});
    const a = Object.assign(document.createElement("a"), {href:URL.createObjectURL(blob), download:"transactions.csv"});
    a.click();
  };

  const filtered = transactions.filter(t => {
    const m = filter    === "ALL" || t.metal_type        === filter;
    const y = typeFilter === "ALL" || t.transaction_type  === typeFilter;
    const s = !search    || t.metal_type.toLowerCase().includes(search.toLowerCase());
    return m && y && s;
  });

  const totalBuy  = transactions.filter(t=>t.transaction_type==="BUY") .reduce((s,t)=>s+t.total_amount,0);
  const totalSell = transactions.filter(t=>t.transaction_type==="SELL").reduce((s,t)=>s+t.total_amount,0);

  return (
    <div className="min-h-screen" style={{background:"var(--bg-deep)"}}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-28">

        <div className="flex items-start justify-between mb-8 animate-fadeInUp">
          <div>
            <p className="font-cinzel text-xs tracking-widest text-gold uppercase mb-1">History</p>
            <h1 className="font-display text-4xl font-bold text-gold-light">Transaction History</h1>
            <p className="text-text-muted text-sm mt-1">{transactions.length} total trades</p>
          </div>
          <button onClick={exportCSV}
            className="btn-gold px-5 py-2.5 rounded-xl text-sm hidden md:block">
            <span>⬇ Export CSV</span>
          </button>
        </div>

        {/* Summary */}
        {transactions.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6 animate-fadeInUp delay-100">
            {[
              {label:"Total Bought",  value:`₹${totalBuy.toLocaleString("en-IN",{maximumFractionDigits:0})}`,  color:"text-green-400"},
              {label:"Total Sold",    value:`₹${totalSell.toLocaleString("en-IN",{maximumFractionDigits:0})}`,  color:"text-red-400"},
              {label:"Net Invested",  value:`₹${(totalBuy-totalSell).toLocaleString("en-IN",{maximumFractionDigits:0})}`, color:"text-gold"},
            ].map(s=>(
              <div key={s.label} className="glass rounded-2xl p-4">
                <p className="text-[10px] font-cinzel tracking-widest text-text-muted uppercase mb-1">{s.label}</p>
                <p className={`font-price text-2xl ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5 animate-fadeInUp delay-200">
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search metal..." className="input-dark px-4 py-2 rounded-xl text-sm w-44" />
          {["ALL","Gold","Silver"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition ${filter===f?"bg-gold text-bg-deep":"glass text-text-muted hover:text-gold"}`}>
              {f==="ALL"?"All Metals":f==="Gold"?"🥇 Gold":"🥈 Silver"}
            </button>
          ))}
          {["ALL","BUY","SELL"].map(f=>(
            <button key={f} onClick={()=>setTypeFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition ${typeFilter===f?"bg-gold text-bg-deep":"glass text-text-muted hover:text-gold"}`}>
              {f==="ALL"?"All Types":f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="glass rounded-2xl h-64 animate-pulse" />
        ) : filtered.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <span className="text-5xl block mb-3 opacity-30">📑</span>
            <p className="text-text-muted">No transactions found</p>
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden animate-fadeInUp delay-300">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Date","Type","Metal","Quantity","Price / g","Total"].map(h=>(
                    <th key={h} className="text-left px-6 py-3 text-[11px] font-cinzel tracking-widest text-text-muted uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(tx=>(
                  <tr key={tx.id} className="border-b border-white/5 tr-hover transition">
                    <td className="px-6 py-4 text-text-muted text-xs">
                      {new Date(tx.created_at).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${tx.transaction_type==="BUY"?"bg-green-500/15 text-green-400":"bg-red-500/15 text-red-400"}`}>
                        {tx.transaction_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2">
                        {tx.metal_type==="Gold"?"🥇":"🥈"} <span className="font-medium">{tx.metal_type}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{tx.quantity.toFixed(4)} g</td>
                    <td className="px-6 py-4 text-text-muted">₹{tx.price.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 font-semibold text-gold">
                      ₹{tx.total_amount.toLocaleString("en-IN",{maximumFractionDigits:0})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
