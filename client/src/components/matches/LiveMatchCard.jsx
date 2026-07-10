import { Link } from "react-router-dom";

export default function LiveMatchCard({ match }) {
  return (
    <Link
      to={`/matches/${match.id}`}
      className="block rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:border-[var(--color-cyan)]/40"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          Live
        </span>
        <span className="text-xs text-slate-500">{match.venue}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span>{match.teamA.flag}</span> {match.teamA.name}
          </span>
          <span className="font-mono text-sm text-white">
            {match.teamA.score} <span className="text-slate-500">({match.teamA.overs})</span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span>{match.teamB.flag}</span> {match.teamB.name}
          </span>
          <span className="font-mono text-sm text-white">
            {match.teamB.score} <span className="text-slate-500">({match.teamB.overs})</span>
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs font-medium" style={{ color: "var(--color-green)" }}>
        {match.status}
      </p>
    </Link>
  );
}
