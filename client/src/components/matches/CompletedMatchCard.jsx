import { FiHeart } from "react-icons/fi";

export default function CompletedMatchCard({ match, showFavorite = false }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
      <div className="flex items-center gap-3 text-sm">
        <span>{match.teamA.flag}</span>
        <span className="font-medium">{match.teamA.short}</span>
        <span className="text-slate-500">vs</span>
        <span>{match.teamB.flag}</span>
        <span className="font-medium">{match.teamB.short}</span>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-xs font-medium" style={{ color: "var(--color-green)" }}>
          {match.winner} {match.margin}
        </p>
        {showFavorite && (
          <button aria-label="Saved match">
            <FiHeart className="h-4 w-4 fill-current" style={{ color: "var(--color-gold)" }} />
          </button>
        )}
      </div>
    </div>
  );
}
