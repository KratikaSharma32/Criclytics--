import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import api from "../services/api";

const tabs = [
  { label: "Saved Matches", type: "match" },
  { label: "Saved Teams", type: "team" },
  { label: "Saved Players", type: "player" },
];

export default function Favorites() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get("/favorites", { params: { type: activeTab.type } })
      .then(({ data }) => active && setItems(data.data))
      .catch(() => active && setError("Sign in to see your saved items."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [activeTab]);

  const removeFavorite = async (item) => {
    await api.delete(`/favorites/${activeTab.type}/${item.refId}`);
    setItems((prev) => prev.filter((i) => i.refId !== item.refId));
  };

  return (
    <div className="stadium-backdrop min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="font-display text-2xl font-bold">Favorites</h1>

        <div className="mt-6 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.type}
              onClick={() => setActiveTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                activeTab.type === t.type ? "text-[#081120]" : "border border-white/10 text-slate-300"
              }`}
              style={activeTab.type === t.type ? { background: "var(--color-cyan)" } : {}}
            >
              {t.label}
            </button>
          ))}
        </div>

        <GlassCard className="mt-6 p-6">
          {loading && <p className="py-8 text-center text-sm text-slate-500">Loading…</p>}
          {!loading && error && <p className="py-8 text-center text-sm text-slate-500">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-500">
              Nothing saved here yet — tap the heart icon on any {activeTab.type} page to add it.
            </p>
          )}
          {!loading && !error && items.length > 0 && (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id || item._id} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                  <p className="text-sm font-medium">{item.label}</p>
                  <button onClick={() => removeFavorite(item)} aria-label="Remove favorite">
                    <FiHeart className="h-4 w-4 fill-current" style={{ color: "var(--color-gold)" }} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </main>
      <Footer />
    </div>
  );
}
