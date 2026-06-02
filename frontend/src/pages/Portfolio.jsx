import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#D4AF37","#C0C0C0"];

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [prices, setPrices]     = useState({});
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([API.get("/portfolio"), API.get("/prices")])
      .then(([p, pr]) => {
        setPortfolio(p.data);
        const pm = {};
        pr.data.forEach(x => pm[x.metal_type] = x.current_price);
        setPrices(pm);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalValue  = portfolio.reduce((s,h) => s + h.quantity*(prices[h.metal_type]||0), 0);
  const totalInvested = portfolio.reduce((s,h) => s + h.quantity*h.average_price, 0);
  const totalPnl    = totalValue - totalInvested;
  const pnlPct      = totalInvested > 0 ? (totalPnl/totalInvested)*100 : 0;

  const pieData = portfolio.filter(h=>h.quantity>0).map(h=>({
    name:h.metal_type,
    value:parseFloat((h.quantity*(prices[h.metal_type]||0)).toFixed(2)),
  }));

  return (
    <div className="min-h-screen" style={{background:"var(--bg-deep)"}}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-28">

        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <p className="font-cinzel text-xs tracking-widest text-gold uppercase mb-1">My Portfolio</p>
          <h1 className="font-display text-4xl font-bold text-gold-light">Holdings Overview</h1>
        </div>

        {/* Summary row */}
        {!loading && portfolio.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8 animate-fadeInUp delay-100">
            {[
              {label:"Total Value",    value:`₹${totalValue.toLocaleString("en-IN",{maximumFractionDigits:0})}`, color:"text-gold"},
              {label:"Total Invested", value:`₹${totalInvested.toLocaleString("en-IN",{maximumFractionDigits:0})}`, color:"text-silver"},
              {label:"Total P&L",      value:`${totalPnl>=0?"+":""}₹${totalPnl.toFixed(0)} (${pnlPct.toFixed(1)}%)`,
               color:totalPnl>=0?"text-green-400":"text-red-400"},
            ].map(s=>(
              <div key={s.label} className="glass rounded-2xl p-5">
                <p className="text-xs font-cinzel tracking-widest text-text-muted uppercase mb-2">{s.label}</p>
                <p className={`font-price text-3xl ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <div className="glass rounded-2xl h-64 animate-pulse" />
        ) : portfolio.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <span className="text-6xl block mb-4 opacity-40">📊</span>
            <p className="text-text-muted">No holdings yet. Start investing to see your portfolio here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 animate-fadeInUp delay-200">

            {/* Table */}
            <div className="md:col-span-2 glass rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5">
                <h2 className="font-cinzel text-xs tracking-widest text-gold uppercase">Holdings Detail</h2>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Metal","Quantity","Avg Price","Live Price","Value","P&L"].map(h=>(
                      <th key={h} className="text-left px-6 py-3 text-[11px] font-cinzel tracking-widest text-text-muted uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map(item => {
                    const cp  = prices[item.metal_type]||0;
                    const val = item.quantity*cp;
                    const inv = item.quantity*item.average_price;
                    const pnl = val-inv;
                    const pct = inv>0?(pnl/inv)*100:0;
                    return (
                      <tr key={item.id} className="border-b border-white/5 tr-hover transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.metal_type==="Gold"?"🥇":"🥈"}</span>
                            <span className="font-medium">{item.metal_type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-muted">{item.quantity.toFixed(4)} g</td>
                        <td className="px-6 py-4 text-text-muted">₹{item.average_price.toLocaleString("en-IN")}</td>
                        <td className="px-6 py-4 text-gold">₹{cp.toLocaleString("en-IN")}</td>
                        <td className="px-6 py-4 font-medium">₹{val.toLocaleString("en-IN",{maximumFractionDigits:0})}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${pnl>=0?"bg-green-500/15 text-green-400":"bg-red-500/15 text-red-400"}`}>
                            {pnl>=0?"+":""}₹{pnl.toFixed(0)} ({pct.toFixed(1)}%)
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pie */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-cinzel text-xs tracking-widest text-gold uppercase mb-5">Allocation</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value"
                    label={({percent})=>`${(percent*100).toFixed(0)}%`} labelLine={false}>
                    {pieData.map((_,i) => <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={v=>`₹${v.toLocaleString("en-IN")}`}
                    contentStyle={{background:"rgba(13,20,38,.9)",border:"1px solid rgba(212,175,55,.2)",borderRadius:"12px",fontSize:"12px"}} />
                  <Legend iconType="circle" iconSize={8}
                    formatter={v=><span className="text-xs text-text-muted">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
