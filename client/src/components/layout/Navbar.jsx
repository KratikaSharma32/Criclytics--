import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { GiCricketBat } from "react-icons/gi";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/dashboard", label: "Matches" },
  { to: "/teams/india", label: "Teams" },
  { to: "/players/virat-kohli", label: "Players" },
  { to: "/news", label: "News" },
  { to: "/analytics", label: "Analytics" },
  { to: "/fantasy-assistant", label: "Fantasy AI" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#081120]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <GiCricketBat className="h-7 w-7 text-cyan rotate-45" style={{ color: "var(--color-cyan)" }} />
          <span className="font-display text-xl font-bold tracking-wide">
            CRIC<span style={{ color: "var(--color-cyan)" }}>LIVE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to="/favorites" className="text-sm text-slate-300 hover:text-white">
                Favorites
              </Link>
              <Link to="/subscription" className="text-sm text-slate-300 hover:text-white">
                {user.plan} plan
              </Link>
              <Link
                to="/dashboard"
                className="text-sm text-slate-300 hover:text-white"
              >
                Hi, {user.fullName?.split(" ")[0] || "there"}
              </Link>
              <button
                onClick={logout}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 hover:border-white/30 hover:text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-full px-5 py-2 text-sm font-semibold text-[#081120] shadow-lg transition-transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, var(--color-cyan), #6ee7f2)",
                }}
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="text-sm text-slate-300" onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-3">
              <Link to="/login" className="flex-1 rounded-full border border-white/10 py-2 text-center text-sm">
                Sign in
              </Link>
              <Link
                to="/register"
                className="flex-1 rounded-full py-2 text-center text-sm font-semibold text-[#081120]"
                style={{ background: "var(--color-cyan)" }}
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
