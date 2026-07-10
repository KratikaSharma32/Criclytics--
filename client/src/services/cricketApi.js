import api from "./api";
import * as mock from "./mockData";

// Every function tries the real backend first and falls back to bundled
// mock data if the request fails (backend not running yet, no network,
// etc.) — so the UI is never blank while you're wiring things up.
async function safeGet(path, fallback) {
  try {
    const { data } = await api.get(path);
    return data.data ?? fallback;
  } catch {
    return fallback;
  }
}

export const getLiveMatches = () => safeGet("/matches/live", mock.liveMatches);
export const getUpcomingMatches = () => safeGet("/matches/upcoming", mock.upcomingMatches);
export const getCompletedMatches = () => safeGet("/matches/completed", mock.completedMatches);
export const getMatchDetails = (id) => safeGet(`/matches/${id}`, mock.liveMatches.find((m) => m.id === id) || mock.liveMatches[0]);
export const getTeam = (slug) => safeGet(`/teams/${slug}`, mock.teams[slug] || mock.teams.india);
export const getPlayer = (slug) => safeGet(`/players/${slug}`, mock.players[slug] || mock.players["virat-kohli"]);
export const getNews = () => safeGet("/news", mock.news);

export const askMatchAnalyst = async (matchId, question) => {
  const { data } = await api.post("/ai/analyst", { matchId, question });
  return data;
};

export const getFantasyPicks = async (players) => {
  const { data } = await api.post("/ai/fantasy-assistant", { players });
  return data;
};

export const getMatchPrediction = async (matchId) => {
  const { data } = await api.post("/ai/predictor", { matchId });
  return data;
};

export const getPlans = () => safeGet("/subscriptions/plans", null);
export const checkout = (plan) => api.post("/subscriptions/checkout", { plan });
export const verifyPayment = (payload) => api.post("/subscriptions/verify", payload);
