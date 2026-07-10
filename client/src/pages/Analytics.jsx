import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import { runRateSeries, winProbability, topPlayers } from "../services/mockData";
import { getMatchPrediction } from "../services/cricketApi";

const chartData = runRateSeries.overs.map((o, i) => ({
  over: o,
  india: runRateSeries.india[i],
  australia: runRateSeries.australia[i],
}));

export default function Analytics() {
  return (
    <div className="stadium-backdrop min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-display text-2xl font-bold">Match Analytics</h1>
        <p className="mt-1 text-sm text-slate-400">IND vs AUS · 1st ODI</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-6 lg:col-span-2">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
              Run rate comparison
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="over" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: "#0c1830", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                  />
                  <Line type="monotone" dataKey="india" stroke="#00e5ff" strokeWidth={2} dot={false} name="India" />
                  <Line type="monotone" dataKey="australia" stroke="#ffd369" strokeWidth={2} dot={false} name="Australia" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
              Win probability
            </h2>
            <div className="flex flex-col items-center">
              <div
                className="flex h-32 w-32 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(var(--color-cyan) 0% ${winProbability.teamA}%, rgba(255,255,255,0.08) ${winProbability.teamA}% 100%)`,
                }}
              >
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#081120]">
                  <span className="font-display text-2xl font-bold" style={{ color: "var(--color-cyan)" }}>
                    {winProbability.teamA}%
                  </span>
                  <span className="text-[10px] text-slate-500">India</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-400">Australia {winProbability.teamB}%</p>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="mt-6 p-6">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
            Top players this series
          </h2>
          <div className="space-y-3">
            {topPlayers.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                <span className="flex items-center gap-3 text-sm font-medium">
                  <span className="text-slate-500">{i + 1}.</span> {p.name}
                </span>
                <span className="font-mono text-sm" style={{ color: "var(--color-gold)" }}>{p.runs} runs</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <AiPredictor />
      </main>
      <Footer />
    </div>
  );
}

function AiPredictor() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const predict = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMatchPrediction("m1");
      setResult(JSON.parse(data.text));
    } catch (err) {
      setError(err.response?.data?.message || "Sign in with a Pro or Premium plan to use the AI predictor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="mt-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
          AI Match Predictor
        </h2>
        <button
          onClick={predict}
          disabled={loading}
          className="rounded-full px-5 py-2 text-sm font-semibold text-[#081120] disabled:opacity-60"
          style={{ background: "var(--color-cyan)" }}
        >
          {loading ? "Predicting…" : "Predict"}
        </button>
      </div>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      {result && (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-slate-500">Predicted winner</p>
            <p className="mt-1 font-mono text-lg">{result.winner}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Win probability</p>
            <p className="mt-1 font-mono text-lg" style={{ color: "var(--color-cyan)" }}>{result.probability}%</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Projected score</p>
            <p className="mt-1 font-mono text-lg">{result.projectedScore}</p>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
