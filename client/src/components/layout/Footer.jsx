import { GiCricketBat } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <GiCricketBat className="h-5 w-5 rotate-45" style={{ color: "var(--color-cyan)" }} />
          <span className="font-display text-lg font-bold">
            CRIC<span style={{ color: "var(--color-cyan)" }}>LIVE</span>
          </span>
        </div>
        <p className="text-sm text-slate-500">
          Built for the fans who read the game between overs. © {new Date().getFullYear()} CricLive.
        </p>
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  );
}
