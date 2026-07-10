import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import { getTeam } from "../services/cricketApi";
import FavoriteButton from "../components/ui/FavoriteButton";

export default function TeamDetails() {
  const { slug } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    let active = true;
    getTeam(slug).then((data) => active && setTeam(data));
    return () => {
      active = false;
    };
  }, [slug]);

  if (!team) {
    return (
      <div className="stadium-backdrop min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-10">
          <GlassCard className="h-48 animate-pulse" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="stadium-backdrop min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <GlassCard className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl">
                🏏
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">{team.name}</h1>
                <p className="text-sm text-slate-500">{team.board}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FavoriteButton type="team" refId={slug} label={team.name} className="rounded-full border border-white/10 p-2.5 hover:border-white/25" />
              <div className="rounded-xl border border-white/10 px-4 py-2 text-center">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">ICC Ranking</p>
                <p className="font-display text-xl font-bold" style={{ color: "var(--color-cyan)" }}>#{team.ranking}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-500">Captain</p>
              <p className="mt-1 text-sm font-medium">{team.captain}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Coach</p>
              <p className="mt-1 text-sm font-medium">{team.coach}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Established</p>
              <p className="mt-1 text-sm font-medium">{team.established}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Recent form</p>
              <div className="mt-1 flex gap-1.5">
                {team.recentForm.map((r, i) => (
                  <span
                    key={i}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      background: r === "W" ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
                      color: r === "W" ? "var(--color-green)" : "#f87171",
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="mt-6 p-6">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">Squad</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {team.squad.map((p) => (
              <Link
                key={p}
                to={`/players/${p.split(" ")[0].toLowerCase()}-${p.split(" ")[1]?.split(" ")[0]?.toLowerCase() || ""}`}
                className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm hover:border-[var(--color-cyan)]/40"
              >
                {p}
              </Link>
            ))}
          </div>
        </GlassCard>
      </main>
      <Footer />
    </div>
  );
}
