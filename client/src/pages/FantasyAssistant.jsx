import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import { getFantasyPicks } from "../services/cricketApi";

const squad = [
  { name: "Rohit Sharma", recentForm: 87 },
  { name: "Virat Kohli", recentForm: 92 },
  { name: "Jasprit Bumrah", recentForm: 78 },
  { name: "Shubman Gill", recentForm: 65 },
  { name: "Ravindra Jadeja", recentForm: 54 },
  { name: "Mohammed Siraj", recentForm: 41 },
];

export default function FantasyAssistant() {
  const [picks, setPicks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getFantasyPicks(squad);
      setPicks(JSON.parse(data.text));
    } catch (err) {
      setError(err.response?.data?.message || "Sign in with a Pro or Premium plan to use the fantasy assistant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stadium-backdrop min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-2xl font-bold">AI Fantasy Assistant</h1>
        <p className="mt-1 text-sm text-slate-400">Captain, vice-captain, safe picks and risky picks for today's squad.</p>

        <GlassCard className="mt-6 p-6">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">Squad</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {squad.map((p) => (
              <div key={p.name} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-2.5 text-sm">
                <span>{p.name}</span>
                <span className="font-mono text-slate-500">form: {p.recentForm}</span>
              </div>
            ))}
          </div>
          <button
            onClick={generate}
            disabled={loading}
            className="mt-6 w-full rounded-xl py-3.5 text-sm font-semibold text-[#081120] disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, var(--color-cyan), #6ee7f2)" }}
          >
            {loading ? "Building your team…" : "Get AI picks"}
          </button>
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </GlassCard>

        {picks && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <GlassCard glow className="p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500">Captain</p>
              <p className="mt-1 font-display text-xl font-bold" style={{ color: "var(--color-cyan)" }}>{picks.captain}</p>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500">Vice-captain</p>
              <p className="mt-1 font-display text-xl font-bold">{picks.viceCaptain}</p>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500">Safe picks</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                {picks.safePicks?.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </GlassCard>
            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500" style={{ color: "var(--color-gold)" }}>Risky picks</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                {picks.riskyPicks?.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </GlassCard>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
