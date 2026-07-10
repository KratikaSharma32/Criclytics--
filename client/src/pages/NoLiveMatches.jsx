import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import { getUpcomingMatches, getNews } from "../services/cricketApi";

const aiFacts = [
  "The fastest recorded delivery in international cricket is 161.3 km/h, bowled by Shoaib Akhtar.",
  "A team's required run rate rises fastest in the last 5 overs — momentum, not average, wins run chases.",
  "Only four bowlers have ever taken all ten wickets in a single Test innings.",
];

function useCountdown(target) {
  const [remaining, setRemaining] = useState(target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setRemaining(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const clamp = Math.max(remaining, 0);
  const hrs = Math.floor(clamp / 3.6e6);
  const mins = Math.floor((clamp % 3.6e6) / 6e4);
  const secs = Math.floor((clamp % 6e4) / 1000);
  return { hrs, mins, secs };
}

export default function NoLiveMatches() {
  const target = Date.now() + (12 * 3600 + 45 * 60 + 30) * 1000;
  const { hrs, mins, secs } = useCountdown(target);
  const fact = aiFacts[new Date().getDate() % aiFacts.length];
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    let active = true;
    Promise.all([getUpcomingMatches(), getNews()]).then(([upcoming, newsData]) => {
      if (!active) return;
      setUpcomingMatches(upcoming);
      setNews(newsData);
    });
    return () => {
      active = false;
    };
  }, []);

  const next = upcomingMatches[0];

  return (
    <div className="stadium-backdrop min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-5xl">🏟️</p>
        <h1 className="mt-6 font-display text-3xl font-bold">No Live Matches Currently</h1>
        <p className="mt-2 text-slate-400">But the game never stops. Stay tuned for the next cricket action.</p>

        <GlassCard glow className="mx-auto mt-8 max-w-md p-8">
          <p className="text-xs uppercase tracking-wide text-slate-500">Next match starts in</p>
          <div className="mt-4 flex justify-center gap-4 font-mono text-3xl font-bold">
            {[["hrs", hrs], ["mins", mins], ["secs", secs]].map(([label, val]) => (
              <div key={label}>
                <span style={{ color: "var(--color-cyan)" }}>{String(val).padStart(2, "0")}</span>
                <p className="mt-1 text-[10px] font-normal uppercase tracking-wide text-slate-500">{label}</p>
              </div>
            ))}
          </div>
          {next && (
            <p className="mt-5 text-sm text-slate-300">
              {next.teamA.flag} {next.teamA.short} vs {next.teamB.flag} {next.teamB.short} · {next.venue}
            </p>
          )}
          <p className="mt-6 border-t border-white/5 pt-4 text-sm italic text-slate-500">
            "Pressure is just a privilege that comes with playing cricket." — MS Dhoni
          </p>
        </GlassCard>

        <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
          <GlassCard className="p-6">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
              Trending news
            </h2>
            <ul className="mt-4 space-y-3">
              {news.map((n) => (
                <li key={n.id} className="text-sm">
                  <p className="font-medium text-white">{n.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{n.time}</p>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
              AI cricket fact
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">{fact}</p>
            <Link
              to="/analytics"
              className="mt-6 inline-block text-sm font-semibold"
              style={{ color: "var(--color-cyan)" }}
            >
              Explore analytics →
            </Link>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
