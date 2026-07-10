import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import { getMatchDetails, askMatchAnalyst } from "../services/cricketApi";

const battingIndia = [
  { name: "Rohit Sharma", runs: 87, balls: 63, fours: 9, sixes: 3, sr: 138.1 },
  { name: "Shubman Gill", runs: 65, balls: 71, fours: 6, sixes: 1, sr: 91.55 },
  { name: "Virat Kohli", runs: 54, balls: 49, fours: 6, sixes: 0, sr: 110.2 },
  { name: "Shreyas Iyer", runs: 26, balls: 18, fours: 2, sixes: 1, sr: 144.44 },
];

const bowlingAustralia = [
  { name: "Pat Cummins", overs: 10.0, maidens: 1, runs: 45, wickets: 2, econ: 4.5 },
  { name: "Mitchell Starc", overs: 9.2, maidens: 0, runs: 52, wickets: 1, econ: 5.57 },
  { name: "Adam Zampa", overs: 10.0, maidens: 0, runs: 48, wickets: 1, econ: 4.8 },
];

const tabs = ["Scorecard", "Commentary", "Stats", "Analysis"];

export default function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [tab, setTab] = useState("Scorecard");

  useEffect(() => {
    let active = true;
    getMatchDetails(id).then((data) => active && setMatch(data));
    return () => {
      active = false;
    };
  }, [id]);

  if (!match) {
    return (
      <div className="stadium-backdrop min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 py-10">
          <GlassCard className="h-48 animate-pulse" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="stadium-backdrop min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <GlassCard className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500">{match.venue}</p>
              <h1 className="mt-1 font-display text-xl font-bold">
                {match.teamA.short} vs {match.teamB.short} · 1st ODI
              </h1>
            </div>
            <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">Live</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span>{match.teamA.flag} {match.teamA.name}</span>
              <span className="font-mono">{match.teamA.score} ({match.teamA.overs})</span>
            </div>
            <span className="text-slate-500">vs</span>
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span>{match.teamB.flag} {match.teamB.name}</span>
              <span className="font-mono">{match.teamB.score} ({match.teamB.overs})</span>
            </div>
          </div>
          <p className="mt-3 text-sm font-medium" style={{ color: "var(--color-green)" }}>{match.status}</p>
        </GlassCard>

        <div className="mt-6 flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t ? "text-[#081120]" : "border border-white/10 text-slate-300"
              }`}
              style={tab === t ? { background: "var(--color-cyan)" } : {}}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Scorecard" && (
          <div className="mt-6 space-y-6">
            <GlassCard className="overflow-x-auto p-6">
              <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
                Batting — India
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500">
                    <th className="pb-2">Player</th>
                    <th className="pb-2 text-right">R</th>
                    <th className="pb-2 text-right">B</th>
                    <th className="pb-2 text-right">4s</th>
                    <th className="pb-2 text-right">6s</th>
                    <th className="pb-2 text-right">SR</th>
                  </tr>
                </thead>
                <tbody>
                  {battingIndia.map((p) => (
                    <tr key={p.name} className="border-t border-white/5">
                      <td className="py-2 font-medium">{p.name}</td>
                      <td className="py-2 text-right font-mono">{p.runs}</td>
                      <td className="py-2 text-right font-mono text-slate-400">{p.balls}</td>
                      <td className="py-2 text-right font-mono text-slate-400">{p.fours}</td>
                      <td className="py-2 text-right font-mono text-slate-400">{p.sixes}</td>
                      <td className="py-2 text-right font-mono text-slate-400">{p.sr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>

            <GlassCard className="overflow-x-auto p-6">
              <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
                Bowling — Australia
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500">
                    <th className="pb-2">Bowler</th>
                    <th className="pb-2 text-right">O</th>
                    <th className="pb-2 text-right">M</th>
                    <th className="pb-2 text-right">R</th>
                    <th className="pb-2 text-right">W</th>
                    <th className="pb-2 text-right">Econ</th>
                  </tr>
                </thead>
                <tbody>
                  {bowlingAustralia.map((p) => (
                    <tr key={p.name} className="border-t border-white/5">
                      <td className="py-2 font-medium">{p.name}</td>
                      <td className="py-2 text-right font-mono text-slate-400">{p.overs}</td>
                      <td className="py-2 text-right font-mono text-slate-400">{p.maidens}</td>
                      <td className="py-2 text-right font-mono">{p.runs}</td>
                      <td className="py-2 text-right font-mono" style={{ color: "var(--color-gold)" }}>{p.wickets}</td>
                      <td className="py-2 text-right font-mono text-slate-400">{p.econ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>

            <GlassCard className="p-6">
              <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
                Partnership analytics
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Current partnership</p>
                  <p className="mt-1 font-mono text-lg">{match.partnership}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Highest partnership</p>
                  <p className="mt-1 font-mono text-lg">Rohit & Gill, 118 (94)</p>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {tab === "Analysis" && <AiMatchAnalyst match={match} />}

        {(tab === "Commentary" || tab === "Stats") && (
          <GlassCard className="mt-6 p-8 text-center text-sm text-slate-400">
            {tab} data will stream in here once the live feed is connected.
          </GlassCard>
        )}
      </main>

      <Footer />
    </div>
  );
}

function AiMatchAnalyst({ match }) {
  const [question, setQuestion] = useState("Why is this team losing?");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ask = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await askMatchAnalyst(match.id, question);
      setAnswer(data.text);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Sign in with a Pro or Premium plan to use the AI match analyst."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="mt-6 p-6">
      <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
        AI Match Analyst
      </h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask why a team is losing, or about momentum…"
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-[var(--color-cyan)]"
        />
        <button
          onClick={ask}
          disabled={loading}
          className="rounded-xl px-6 py-3 text-sm font-semibold text-[#081120] disabled:opacity-60"
          style={{ background: "var(--color-cyan)" }}
        >
          {loading ? "Analyzing…" : "Ask AI"}
        </button>
      </div>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      {answer && <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-300">{answer}</p>}
    </GlassCard>
  );
}
