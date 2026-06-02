import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ARTICLES = [
  {
    id:"gold",
    category:"Gold",
    icon:"🥇",
    tag:"Fundamental",
    title:"Why Gold is the Ultimate Inflation Hedge",
    excerpt:"Gold has maintained its purchasing power for over 5,000 years. Unlike paper currencies, it cannot be printed or debased by governments.",
    readTime:"5 min",
    body:`
Gold is the oldest form of money known to humanity. Unlike fiat currencies, its supply grows only about 1.5-2% per year — roughly the rate of mining. This scarcity is what gives gold its inflation-hedging properties.

**Key Properties of Gold as an Investment:**
• Non-correlated to equities — gold often rises when stocks fall
• Global store of value — recognized in every country on earth
• Central bank reserve — RBI, Fed, ECB all hold gold
• No counterparty risk — physical gold needs no intermediary

**Historical Performance:**
In 2008, gold rose 25% while the S&P 500 fell 37%. During COVID-2020, gold hit all-time highs while global economies contracted. In India, gold has delivered ~13% CAGR in INR terms over the last 20 years.

**How Much to Allocate?**
Most financial advisors recommend 5–15% of a portfolio in gold. Higher allocations make sense in environments of monetary uncertainty, high inflation, or geopolitical risk.

**Digital Gold vs Physical:**
Digital gold platforms offer fractional ownership starting from ₹1, eliminating making charges and storage costs while retaining the same price exposure.
    `,
  },
  {
    id:"silver",
    category:"Silver",
    icon:"🥈",
    tag:"Deep Dive",
    title:"Silver: The Underrated Precious Metal",
    excerpt:"Silver has a dual identity — monetary metal and industrial commodity. This creates unique demand dynamics no other asset has.",
    readTime:"6 min",
    body:`
Silver is the only precious metal with massive industrial consumption (over 50% of annual supply) while simultaneously functioning as a monetary metal and inflation hedge.

**Industrial Demand Drivers:**
• Solar panels — each panel uses ~20g of silver; solar capacity doubling every 5 years
• Electric vehicles — EVs use 2-3× more silver than ICE vehicles
• 5G infrastructure — silver paste in circuit boards
• Medical/antimicrobial applications growing post-COVID

**Investment Case:**
When industrial demand surges alongside monetary demand (inflation/currency debasement), silver can move far faster than gold. In 2011, silver hit $50/oz — a 500% gain from 2008 lows.

**Gold-Silver Ratio:**
Historically 15:1 (reflecting earth's abundance ratio). Today ~80:1. When this ratio contracts, silver dramatically outperforms gold. This is one of the oldest trading signals in commodity markets.

**Risk Considerations:**
Silver's higher volatility (40-50% annual vs 15-20% for gold) means larger drawdowns. Suitable for investors with a 5+ year horizon willing to endure short-term swings for higher long-term returns.
    `,
  },
  {
    id:"market",
    category:"Market",
    icon:"🌍",
    tag:"Market",
    title:"Macro Factors That Move Precious Metal Prices",
    excerpt:"Interest rates, USD, geopolitics, central bank buying — understanding these forces gives you an edge in timing your investments.",
    readTime:"7 min",
    body:`
Precious metal prices are driven by a complex mix of macroeconomic, geopolitical and supply-demand forces. Understanding these helps you make more informed investment decisions.

**1. US Dollar Strength**
Gold is priced in USD globally. When the dollar weakens, gold becomes cheaper for foreign buyers, boosting demand. Inverse correlation is strong (~0.7 over long periods).

**2. Real Interest Rates**
The most critical driver. Real rates = nominal rates minus inflation. When real rates are negative (inflation exceeds bond yields), gold becomes attractive as an alternative store of value. 2020-2021: real rates went deeply negative → gold hit ATH.

**3. Central Bank Buying**
Central banks bought a record 1,000+ tonnes of gold in 2023 (World Gold Council data). China, India, Turkey leading. This structural demand has a floor effect on prices.

**4. Geopolitical Risk**
Wars, sanctions, banking crises all trigger "safe haven" buying. Russia-Ukraine (2022), COVID (2020), 2008 GFC — all coincided with gold spikes.

**5. Indian Wedding Season**
India consumes ~800-900 tonnes annually. Q4 (Oct-Dec) and Q1 (Apr-Jun) wedding seasons create seasonal demand spikes, often 5-10% price appreciation.

**6. ETF Flows**
Gold ETF inflows/outflows move prices. SPDR Gold Shares holds ~900 tonnes — when institutional investors buy/sell, impact is significant.
    `,
  },
  {
    id:"ratio",
    category:"Strategy",
    icon:"📐",
    tag:"Strategy",
    title:"The Gold-Silver Ratio: A Trading Signal",
    excerpt:"When this ratio hits extreme highs, silver is statistically cheap relative to gold. Historical mean reversion creates systematic opportunities.",
    readTime:"4 min",
    body:`
The Gold-Silver Ratio (GSR) is calculated by dividing the gold price by the silver price. If gold is ₹9500/g and silver is ₹110/g, the ratio is ~86.

**Historical Averages:**
• Earth's natural abundance ratio: ~17.5:1
• Ancient Roman Empire standard: 12:1
• Bretton Woods era average: ~45:1
• 1980-2023 average: ~65:1
• 2020 COVID peak: 125:1 (extreme)
• Today: ~80-90:1

**How to Use It:**
When the ratio is high (80+), silver is relatively cheap. Historically, switching gold exposure to silver at these levels and back when ratio normalizes (60-65) has generated significant alpha.

**Practical Application for Indian Investors:**
Rather than selling gold, consider allocating new investments toward silver when GSR is above 80. As ratio normalizes, your silver gains will outpace gold, effectively leveraging the reversion.

**Caution:**
GSR can stay extreme for years (it spent 2018-2023 mostly above 80). Use this as a long-term strategic signal, not a short-term trading tool.
    `,
  },
  {
    id:"sip",
    category:"Basics",
    icon:"📖",
    tag:"Beginner",
    title:"SIP in Gold and Silver: Build Wealth Systematically",
    excerpt:"A Systematic Investment Plan removes the fear of wrong timing. Regular small investments in precious metals create a powerful wealth compounding engine.",
    readTime:"4 min",
    body:`
A Systematic Investment Plan (SIP) means investing a fixed amount at regular intervals — weekly, monthly, or quarterly — regardless of current price.

**Why SIP Works for Precious Metals:**
• **Rupee Cost Averaging:** You buy more grams when prices are low, fewer when high. Average cost stays below average price over time.
• **Removes Emotion:** You don't need to predict market tops/bottoms.
• **Discipline:** Forces savings habit. ₹5,000/month in gold SIP for 10 years at historical CAGR of 12% ≈ ₹11.6 lakhs invested → ~₹19-22 lakhs value.

**Example:**
₹2,000/month for 12 months when gold fluctuates:
- Month 1-3: ₹9,000/g → 0.222g/month
- Month 4-6: ₹8,500/g → 0.235g/month (more grams)
- Month 7-9: ₹10,000/g → 0.200g/month (fewer grams)
- Month 10-12: ₹9,500/g → 0.211g/month
Average cost: ~₹9,200/g vs simple average of ₹9,250/g

**Starting Amount:**
With digital gold platforms, you can SIP as low as ₹500/month. No excuse to delay.

**Tax Note:**
Hold for 3+ years for Long Term Capital Gains benefit (20% with indexation).
    `,
  },
  {
    id:"tax",
    category:"Tax",
    icon:"📋",
    tag:"India",
    title:"Tax on Gold & Silver Gains in India (2024)",
    excerpt:"Understanding Indian tax rules on precious metal gains is essential for planning your exit. LTCG, STCG, and new Budget changes explained.",
    readTime:"5 min",
    body:`
Taxation of precious metal investments in India changed significantly with Budget 2024. Here is the current framework.

**Physical Gold / Digital Gold / Gold ETFs:**
• Short Term Capital Gain (STCG): Held < 24 months → taxed as per income slab
• Long Term Capital Gain (LTCG): Held ≥ 24 months → 12.5% without indexation (post Budget 2024)
• Previously it was 20% with indexation for 36+ months

**Gold Mutual Funds / FoFs:**
• STCG: < 24 months → income slab rate
• LTCG: ≥ 24 months → 12.5% without indexation

**Sovereign Gold Bonds (SGBs):**
• Capital gains on redemption at maturity (8 years) → fully tax-exempt
• Interest income (2.5% p.a.) → taxable as per slab
• Secondary market sale before maturity → same STCG/LTCG as physical gold

**Silver:**
Same taxation as physical gold/silver — STCG < 24 months (slab rate), LTCG ≥ 24 months (12.5% without indexation).

**TDS:**
TDS applies if purchase of physical gold/silver exceeds ₹1 lakh in cash. Digital gold transactions — no TDS.

**Disclaimer:** Tax laws change. Consult a CA for your specific situation before making investment decisions based on tax implications.
    `,
  },
];

function ArticleModal({ article, onClose }) {
  if (!article) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 pb-8 px-4 overflow-y-auto"
      style={{background:"rgba(5,8,15,.92)", backdropFilter:"blur(16px)"}}>
      <div className="relative max-w-2xl w-full glass-gold rounded-3xl p-8 md:p-10 animate-fadeInUp">
        <button onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center text-text-muted hover:text-gold transition">
          ✕
        </button>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{article.icon}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-cinzel tracking-widest border border-gold/20 text-gold">{article.tag}</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gold-light mb-2">{article.title}</h2>
        <div className="text-xs text-text-muted mb-6">{article.readTime} read</div>
        <div className="gold-line mb-6" />
        <div className="text-text-muted text-sm leading-loose space-y-3">
          {article.body.trim().split("\n").map((line, i) => {
            if (line.startsWith("**") && line.endsWith("**")) {
              return <p key={i} className="font-semibold text-gold-light mt-4">{line.replace(/\*\*/g,"")}</p>;
            }
            if (line.startsWith("•")) {
              return <p key={i} className="flex gap-2"><span className="text-gold mt-1 shrink-0">✦</span><span>{line.slice(1).trim()}</span></p>;
            }
            if (line.trim() === "") return <div key={i} className="h-1" />;
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default function Knowledge() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(ARTICLES.map(a => a.category))];
  const filtered = filter === "All" ? ARTICLES : ARTICLES.filter(a => a.category === filter);

  return (
    <div className="min-h-screen" style={{background:"var(--bg-deep)"}}>
      <Navbar />
      {active && <ArticleModal article={active} onClose={() => setActive(null)} />}

      {/* Hero */}
      <section className="relative pt-36 pb-20 text-center hero-mesh">
        <div className="section-sep mb-6 mx-auto">
          <div className="gold-line flex-1" /><span>Knowledge Hub</span><div className="gold-line flex-1" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-gold-light mb-4">Invest with Insight</h1>
        <p className="text-text-muted max-w-xl mx-auto text-sm leading-relaxed">
          In-depth education on gold, silver, market dynamics, strategy and Indian tax rules. Real knowledge for real investors.
        </p>
      </section>

      {/* Filter tabs */}
      <div className="sticky top-16 z-30 py-4 border-b border-white/5" style={{background:"rgba(5,8,15,.95)", backdropFilter:"blur(20px)"}}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filter === c ? "bg-gold text-bg-deep" : "glass text-text-muted hover:text-gold"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Articles grid */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a, i) => (
            <div key={a.id}
              onClick={() => setActive(a)}
              className="glass glass-hover rounded-2xl p-6 cursor-pointer transition animate-fadeInUp"
              style={{animationDelay:`${i*60}ms`}}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{a.icon}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-muted">{a.readTime}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-cinzel tracking-widest border border-gold/20 text-gold">{a.tag}</span>
                </div>
              </div>
              <h3 className="font-display text-lg font-semibold text-gold-light mb-2">{a.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">{a.excerpt}</p>
              <span className="text-gold text-xs font-medium">Read Article →</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
