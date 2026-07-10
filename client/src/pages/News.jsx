import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/ui/GlassCard";
import { getNews } from "../services/cricketApi";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getNews().then((data) => {
      if (!active) return;
      setArticles(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="stadium-backdrop min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-2xl font-bold">Cricket News</h1>
        <div className="mt-6 space-y-4">
          {loading && <GlassCard className="h-24 animate-pulse p-6" />}
          {!loading &&
            articles.map((a) => (
              <GlassCard key={a.id} className="p-5">
                {a.url ? (
                  <a href={a.url} target="_blank" rel="noreferrer" className="font-medium hover:text-[var(--color-cyan)]">
                    {a.title}
                  </a>
                ) : (
                  <p className="font-medium">{a.title}</p>
                )}
                <p className="mt-1 text-xs text-slate-500">{a.time}</p>
              </GlassCard>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
