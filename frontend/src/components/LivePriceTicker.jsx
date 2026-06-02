import { useEffect, useState } from "react";
import API from "../services/api";

export default function LivePriceTicker() {
  const [prices, setPrices] = useState([]);

  const fetch = async () => {
    try {
      const res = await API.get("/prices");
      setPrices(res.data);
    } catch { /* ignore */ }
  };

  useEffect(() => {
    fetch();
    const id = setInterval(fetch, 30000);
    return () => clearInterval(id);
  }, []);

  const items = [...prices, ...prices]; // duplicate for seamless loop

  return (
    <div className="w-full overflow-hidden border-y border-gold/10 bg-gold/5 py-2">
      <div className="flex gap-16 animate-ticker whitespace-nowrap" style={{width:"max-content"}}>
        {items.map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="font-cinzel text-[10px] tracking-widest text-gold">{p.metal_type?.toUpperCase()}</span>
            <span className="font-price text-lg text-gold-light">₹{p.current_price?.toLocaleString("en-IN")}</span>
            <span className="text-green-400 text-xs">▲ 0.42%</span>
            <span className="text-gold/20">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
