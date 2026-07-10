import { useEffect, useState } from "react";
import { FiSearch, FiHeart } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import LiveMatchCard from "../components/matches/LiveMatchCard";
import UpcomingMatchCard from "../components/matches/UpcomingMatchCard";
import CompletedMatchCard from "../components/matches/CompletedMatchCard";
import { getLiveMatches, getUpcomingMatches, getCompletedMatches } from "../services/cricketApi";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [completedMatches, setCompletedMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([getLiveMatches(), getUpcomingMatches(), getCompletedMatches()]).then(
      ([live, upcoming, completed]) => {
        if (!active) return;
        setLiveMatches(live);
        setUpcomingMatches(upcoming);
        setCompletedMatches(completed);
        setLoading(false);
      }
    );
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="stadium-backdrop min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">
              Welcome back{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""} 👋
            </h1>
            <p className="mt-1 text-sm text-slate-400">Here's what's happening in the world of cricket.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-white/10 p-2.5 hover:border-white/25" aria-label="Favorites">
              <FiHeart className="h-4 w-4" />
            </button>
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                placeholder="Search teams, players..."
                className="rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[var(--color-cyan)]"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : liveMatches.length === 0 ? (
          <NoLiveInline />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <GlassCard className="p-5 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Live Matches</h2>
                <span className="flex items-center gap-1.5 text-xs text-red-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> {liveMatches.length} live
                </span>
              </div>
              <div className="space-y-4">
                {liveMatches.map((m) => (
                  <LiveMatchCard key={m.id} match={m} />
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <h2 className="mb-4 font-display text-lg font-semibold">Upcoming Matches</h2>
              <div className="space-y-3">
                {upcomingMatches.map((m) => (
                  <UpcomingMatchCard key={m.id} match={m} />
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {!loading && (
          <GlassCard className="mt-6 p-5">
            <h2 className="mb-4 font-display text-lg font-semibold">Recent Matches</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {completedMatches.map((m) => (
                <CompletedMatchCard key={m.id} match={m} />
              ))}
            </div>
          </GlassCard>
        )}
      </main>

      <Footer />
    </div>
  );
}

function NoLiveInline() {
  return (
    <GlassCard className="p-10 text-center">
      <p className="text-4xl">🏏</p>
      <h2 className="mt-4 font-display text-xl font-semibold">No Live Matches Currently</h2>
      <p className="mt-1 text-sm text-slate-400">Stay tuned for the next cricket action.</p>
    </GlassCard>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <GlassCard className="h-64 animate-pulse lg:col-span-2" />
      <GlassCard className="h-64 animate-pulse" />
    </div>
  );
}
