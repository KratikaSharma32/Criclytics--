import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlay, FiTrendingUp, FiZap, FiUsers } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import { liveMatches } from "../services/mockData";

const stats = [
  { label: "Matches tracked / season", value: "1,200+" },
  { label: "Balls analyzed live", value: "2.4M" },
  { label: "Fans on CricLive", value: "48K" },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    features: ["Live matches", "Upcoming matches", "Completed matches", "Player & team details"],
  },
  {
    name: "Pro",
    price: "₹299",
    highlight: true,
    features: ["Everything in Free", "AI match analyst", "Win probability", "Fantasy suggestions", "Notifications"],
  },
  {
    name: "Premium",
    price: "₹799",
    features: ["Everything in Pro", "Historical analytics", "Personal dashboard", "Advanced AI reports", "Data export"],
  },
];

export default function Landing() {
  const match = liveMatches[0];

  return (
    <div className="stadium-backdrop min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:items-center md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "var(--color-cyan)" }} />
            Live intelligence, ball by ball
          </span>
          <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-6xl">
            Read the game <br />
            <span style={{ color: "var(--color-cyan)" }} className="text-glow-cyan">
              before it happens.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base text-slate-400">
            CricLive turns raw scorecards into win probabilities, momentum shifts and
            fantasy calls — the moment they happen, not after.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="rounded-full px-7 py-3.5 text-sm font-semibold text-[#081120] transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--color-cyan), #6ee7f2)" }}
            >
              Start free
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-semibold text-white hover:border-white/30"
            >
              <FiPlay /> Live dashboard
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="mt-1 text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <GlassCard glow className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                Live · {match.venue}
              </span>
              <FiTrendingUp className="h-4 w-4" style={{ color: "var(--color-cyan)" }} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-lg font-semibold">
                  {match.teamA.flag} {match.teamA.name}
                </span>
                <span className="font-mono text-xl">
                  {match.teamA.score}{" "}
                  <span className="text-sm text-slate-500">({match.teamA.overs})</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-lg font-semibold">
                  {match.teamB.flag} {match.teamB.name}
                </span>
                <span className="font-mono text-xl">
                  {match.teamB.score}{" "}
                  <span className="text-sm text-slate-500">({match.teamB.overs})</span>
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">Win probability</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: "72%", background: "var(--color-cyan)" }} />
                </div>
                <span className="font-mono text-sm">72%</span>
              </div>
            </div>

            <p className="mt-4 text-sm" style={{ color: "var(--color-green)" }}>
              {match.status}
            </p>
          </GlassCard>
        </motion.div>
      </section>

      {/* Feature strip */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: FiZap, title: "AI match analyst", desc: "Ask why a team is losing — get a real answer built from run rate, wickets and momentum." },
            { icon: FiTrendingUp, title: "Live win probability", desc: "Recalculated every over, not just at the toss." },
            { icon: FiUsers, title: "Fantasy assistant", desc: "Captain and vice-captain picks, ranked by risk." },
          ].map((f) => (
            <GlassCard key={f.title} className="p-6">
              <f.icon className="h-6 w-6" style={{ color: "var(--color-cyan)" }} />
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-7xl px-6 py-16" id="pricing">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold">Pick your seat</h2>
          <p className="mt-2 text-slate-400">Start free. Upgrade when you want the AI to do the reading for you.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <GlassCard
              key={p.name}
              glow={p.highlight}
              className={`flex flex-col p-8 ${p.highlight ? "border-[var(--color-cyan)]/40" : ""}`}
            >
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="mt-2 font-display text-3xl font-bold">
                {p.price} <span className="text-sm font-normal text-slate-500">/month</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-300">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-cyan)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`mt-8 rounded-full py-3 text-center text-sm font-semibold ${
                  p.highlight ? "text-[#081120]" : "border border-white/10 text-white"
                }`}
                style={p.highlight ? { background: "var(--color-cyan)" } : {}}
              >
                Choose {p.name}
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
