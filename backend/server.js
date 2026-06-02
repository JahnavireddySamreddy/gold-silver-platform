const express    = require("express");
const cors       = require("cors");
const dotenv     = require("dotenv");
const rateLimit  = require("express-rate-limit");

dotenv.config();
console.log("Starting Gold & Silver Investment Platform Server...");

const app = express();

// ── Middleware ─────────────────────────────────
app.use(cors({ origin: "*", methods: ["GET","POST","PUT","DELETE"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Rate Limiting ──────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 min
  max: 20,
  message: { message: "Too many requests. Please try again later." },
});
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,   // 1 min
  max: 100,
  message: { message: "Too many requests." },
});
app.use("/api/login",    authLimiter);
app.use("/api/register", authLimiter);
app.use("/api",          generalLimiter);

// ── Routes ─────────────────────────────────────
const authRoutes       = require("./routes/auth");
const investmentRoutes = require("./routes/investment");
const priceRoutes      = require("./routes/prices");
const portfolioRoutes  = require("./routes/portfolio");

app.use("/api", authRoutes);
app.use("/api", investmentRoutes);
app.use("/api", priceRoutes);
app.use("/api", portfolioRoutes);

app.get("/", (_, res) => res.json({ status:"ok", message:"Gold & Silver Platform API Running" }));
app.use((_, res) => res.status(404).json({ message:"Route not found" }));

// ── Start ──────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running On http://localhost:${PORT}`));

process.on("uncaughtException",   err => console.error("UNCAUGHT:", err));
process.on("unhandledRejection",  err => console.error("REJECTION:", err));
