import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import { getPlayer } from "../services/cricketApi";
import FavoriteButton from "../components/ui/FavoriteButton";

export default function PlayerDetails() {
  const { slug } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    let active = true;
    getPlayer(slug).then((data) => active && setPlayer(data));
    return () => {
      active = false;
    };
  }, [slug]);

  if (!player) {
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
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-4xl">
                🏏
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">{player.name} {player.flag}</h1>
                <p className="text-sm" style={{ color: "var(--color-cyan)" }}>{player.role}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span>Batting: {player.battingStyle}</span>
                  <span>Bowling: {player.bowlingStyle}</span>
                </div>
              </div>
            </div>
            <FavoriteButton type="player" refId={slug} label={player.name} className="rounded-full border border-white/10 p-2.5 hover:border-white/25" />
          </div>
        </GlassCard>

        <GlassCard className="mt-6 p-6">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
            Career statistics
          </h2>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
            {[
              ["Matches", player.stats.matches],
              ["Runs", player.stats.runs],
              ["Average", player.stats.average],
              ["100s", player.stats.hundreds],
              ["50s", player.stats.fifties],
              ["Best", player.stats.best],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-display text-xl font-bold">{value}</p>
                <p className="mt-1 text-[11px] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="mt-6 overflow-x-auto p-6">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
            Batting stats by format
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500">
                <th className="pb-2">Format</th>
                <th className="pb-2 text-right">M</th>
                <th className="pb-2 text-right">R</th>
                <th className="pb-2 text-right">Avg</th>
                <th className="pb-2 text-right">100s</th>
                <th className="pb-2 text-right">50s</th>
              </tr>
            </thead>
            <tbody>
              {player.formatStats.map((f) => (
                <tr key={f.format} className="border-t border-white/5">
                  <td className="py-2 font-medium">{f.format}</td>
                  <td className="py-2 text-right font-mono text-slate-400">{f.m}</td>
                  <td className="py-2 text-right font-mono">{f.r}</td>
                  <td className="py-2 text-right font-mono text-slate-400">{f.avg}</td>
                  <td className="py-2 text-right font-mono text-slate-400">{f.hundreds}</td>
                  <td className="py-2 text-right font-mono text-slate-400">{f.fifties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </main>
      <Footer />
    </div>
  );
}
