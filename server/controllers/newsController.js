import axios from "axios";
import cache, { CACHE_TTL } from "../config/cache.js";

const fallbackNews = [
  { id: "n1", title: "India Clinch Thrilling Victory Against Australia in 1st ODI", time: "2h ago" },
  { id: "n2", title: "ICC Announces Men's ODI Team of the Year", time: "5h ago" },
  { id: "n3", title: "Ben Stokes Ruled Out of Upcoming Series", time: "8h ago" },
];

export async function cricketNews(req, res, next) {
  try {
    const cached = await cache.get("news:cricket");
    if (cached) return res.json({ data: cached });

    if (!process.env.GNEWS_API_KEY) {
      await cache.set("news:cricket", fallbackNews, CACHE_TTL.fixtures);
      return res.json({ data: fallbackNews });
    }

    const { data } = await axios.get(`${process.env.GNEWS_BASE_URL || "https://gnews.io/api/v4"}/search`, {
      params: { q: "cricket", token: process.env.GNEWS_API_KEY, lang: "en", max: 10 },
      timeout: 8000,
    });

    const articles = (data.articles || []).map((a, i) => ({
      id: `gnews-${i}`,
      title: a.title,
      url: a.url,
      time: a.publishedAt,
    }));

    await cache.set("news:cricket", articles, CACHE_TTL.fixtures);
    res.json({ data: articles });
  } catch (err) {
    console.warn("GNews fetch failed, serving fallback news:", err.message);
    res.json({ data: fallbackNews });
  }
}
