import { useEffect, useState } from "react";
import API from "../services/api";

export default function StatsCards() {
  const [data, setData] = useState({ total:0, gold:0, silver:0, txCount:0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([API.get("/portfolio"), API.get("/transactions"), API.get("/prices")])
      .then(([p, t, pr]) => {
        const pm = {};
        pr.data.forEach(x => pm[x.metal_type] = x.current_price);
        let total = 0, gold = 0, silver = 0;
        p.data.forEach(h => {
          total += h.quantity * (pm[h.metal_type] || 0);
          if (h.metal_type === "Gold")   gold   = h.quantity;
          if (h.metal_type === "Silver") silver = h.quantity;
        });
        setData({ total, gold, silver, txCount: t.data.length });
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label:"Total Holdings",  value:`₹${data.total.toLocaleString("en-IN",{maximumFractionDigits:0})}`, icon:"💼", sub:"portfolio value" },
    { label:"Gold Holdings",   value:`${data.gold.toFixed(4)} g`,    icon:"🥇", sub:"in grams" },
    { label:"Silver Holdings", value:`${data.silver.toFixed(4)} g`,  icon:"🥈", sub:"in grams" },
    { label:"Transactions",    value:data.txCount,                   icon:"📊", sub:"total trades" },
  ];

  if (loading) return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_,i)=>(
        <div key={i} className="glass rounded-2xl h-28 animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((c, i) => (
        <div key={c.label} className="glass glass-hover rounded-2xl p-5 transition animate-fadeInUp"
          style={{animationDelay:`${i*80}ms`}}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-cinzel tracking-widest text-text-muted uppercase">{c.label}</span>
            <span className="text-xl">{c.icon}</span>
          </div>
          <div className="font-price text-3xl gold-shimmer leading-none mb-1">{c.value}</div>
          <div className="text-[10px] text-text-muted">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
