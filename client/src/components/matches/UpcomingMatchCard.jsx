export default function UpcomingMatchCard({ match }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
      <div className="flex items-center gap-3 text-sm">
        <span>{match.teamA.flag}</span>
        <span className="font-medium">{match.teamA.short}</span>
        <span className="text-slate-500">vs</span>
        <span>{match.teamB.flag}</span>
        <span className="font-medium">{match.teamB.short}</span>
      </div>
      <div className="text-right">
        <p className="text-xs font-medium text-white">{match.date}, {match.time}</p>
        <p className="text-[11px] text-slate-500">{match.venue}</p>
      </div>
    </div>
  );
}
