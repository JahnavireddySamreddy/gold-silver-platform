import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsCards from "../components/StatsCards";
import LivePriceTicker from "../components/LivePriceTicker";
import API from "../services/api";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area,
} from "recharts";

const COLORS = ["#D4AF37","#C0C0C0","#A8870A","#E8E8E8"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-gold px-3 py-2 rounded-lg text-xs">
      <p className="text-gold-light font-medium">{payload[0].name}</p>
      <p className="text-text-muted">₹{payload[0].value?.toLocaleString("en-IN")}</p>
    </div>
  );
};

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [prices, setPrices] = useState({});
  const [greeting, setGreeting] = useState("Good day");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");

    Promise.all([API.get("/portfolio"), API.get("/transactions"), API.get("/prices")])
      .then(([p, t, pr]) => {
        setPortfolio(p.data);
        setTransactions(t.data);
        const pm = {};
        pr.data.forEach(x => pm[x.metal_type] = x.current_price);
        setPrices(pm);
      });
  }, []);

  const pieData = portfolio.filter(h => h.quantity > 0).map(h => ({
    name: h.metal_type,
    value: parseFloat((h.quantity * (prices[h.metal_type] || 0)).toFixed(2)),
  }));

  const lineData = [...transactions].reverse().reduce((acc, tx) => {
    const prev = acc.length > 0 ? acc[acc.length - 1].total : 0;
    const delta = tx.transaction_type === "BUY" ? tx.total_amount : -tx.total_amount;
    acc.push({
      date: new Date(tx.created_at).toLocaleDateString("en-IN", { day:"2-digit", month:"short" }),
      total: parseFloat((prev + delta).toFixed(2)),
    });
    return acc;
  }, []);

  const recentTx = transactions.slice(0, 5);

  return (
    <div className="min-h-screen" style={{background:"var(--bg-deep)"}}>
      <Navbar />
      <LivePriceTicker />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Greeting */}
        <div className="mb-8 animate-fadeInUp">
          <p className="text-text-muted text-sm font-cinzel tracking-widest uppercase">{greeting}</p>
          <h1 className="font-display text-4xl font-bold mt-1">
            <span className="gold-shimmer">{user.name || "Investor"}</span>
          </h1>
          <p className="text-text-muted text-sm mt-1">
            {new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
          </p>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Portfolio Distribution */}
          <div className="glass rounded-2xl p-6 animate-fadeInUp delay-200">
            <h2 className="font-cinzel text-xs tracking-widest text-gold uppercase mb-5">Portfolio Distribution</h2>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} innerRadius={45} dataKey="value"
                    label={({name,percent}) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                    {pieData.map((_,i) => <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={8}
                    formatter={(v) => <span className="text-xs text-text-muted">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex flex-col items-center justify-center gap-2">
                <span className="text-4xl opacity-30">📊</span>
                <span className="text-text-muted text-sm">No holdings yet</span>
                <Link to="/buy" className="text-gold text-xs">Buy your first metal →</Link>
              </div>
            )}
          </div>

          {/* Investment Growth */}
          <div className="glass rounded-2xl p-6 animate-fadeInUp delay-300">
            <h2 className="font-cinzel text-xs tracking-widest text-gold uppercase mb-5">Investment Growth</h2>
            {lineData.length > 1 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={lineData}>
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#D4AF37" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
                  <XAxis dataKey="date" tick={{fill:"#8492A6",fontSize:10}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill:"#8492A6",fontSize:10}} axisLine={false} tickLine={false}
                    tickFormatter={v=>`₹${v>=1000?`${(v/1000).toFixed(1)}k`:v}`} />
                  <Tooltip formatter={v=>[`₹${v.toLocaleString("en-IN")}`, "Portfolio"]}
                    contentStyle={{background:"rgba(13,20,38,.9)",border:"1px solid rgba(212,175,55,.2)",borderRadius:"12px",fontSize:"12px"}} />
                  <Area type="monotone" dataKey="total" stroke="#D4AF37" strokeWidth={2}
                    fill="url(#goldGrad)" dot={{fill:"#D4AF37",r:3}} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex flex-col items-center justify-center gap-2">
                <span className="text-4xl opacity-30">📈</span>
                <span className="text-text-muted text-sm">Make your first investment</span>
                <Link to="/buy" className="text-gold text-xs">Trade now →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="glass rounded-2xl p-6 mb-6 animate-fadeInUp delay-400">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-cinzel text-xs tracking-widest text-gold uppercase">Recent Transactions</h2>
            <Link to="/transactions" className="text-xs text-text-muted hover:text-gold transition">View all →</Link>
          </div>
          {recentTx.length === 0 ? (
            <p className="text-text-muted text-sm text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-2">
              {recentTx.map(tx => (
                <div key={tx.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 tr-hover rounded-lg px-2 transition">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{tx.metal_type === "Gold" ? "🥇" : "🥈"}</span>
                    <div>
                      <p className="text-sm font-medium">{tx.metal_type}</p>
                      <p className="text-xs text-text-muted">
                        {new Date(tx.created_at).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tx.transaction_type==="BUY"?"bg-green-500/15 text-green-400":"bg-red-500/15 text-red-400"}`}>
                      {tx.transaction_type}
                    </span>
                    <span className="text-sm font-medium text-gold-light">
                      ₹{tx.total_amount.toLocaleString("en-IN",{maximumFractionDigits:0})}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-3 gap-4 animate-fadeInUp delay-500">
          {[
            {to:"/portfolio",    icon:"📊", label:"Portfolio",    desc:"Holdings & P&L"},
            {to:"/transactions", icon:"📑", label:"History",      desc:"All transactions"},
            {to:"/buy",          icon:"💰", label:"Trade Now",    desc:"Buy or sell metals"},
          ].map(c => (
            <Link key={c.to} to={c.to}
              className="glass glass-hover rounded-2xl p-6 flex items-center gap-4 transition group">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <p className="font-semibold text-gold-light group-hover:text-gold transition">{c.label}</p>
                <p className="text-xs text-text-muted">{c.desc}</p>
              </div>
              <span className="ml-auto text-gold/40 group-hover:text-gold transition">→</span>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
