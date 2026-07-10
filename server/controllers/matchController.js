import * as cricketApi from "../services/cricketApi.js";

export async function liveMatches(req, res, next) {
  try {
    const matches = await cricketApi.getLiveMatches();
    res.json({ data: matches });
  } catch (err) {
    next(err);
  }
}

export async function upcomingMatches(req, res, next) {
  try {
    const matches = await cricketApi.getUpcomingMatches();
    res.json({ data: matches });
  } catch (err) {
    next(err);
  }
}

export async function completedMatches(req, res, next) {
  try {
    const matches = await cricketApi.getCompletedMatches();
    res.json({ data: matches });
  } catch (err) {
    next(err);
  }
}

export async function matchDetails(req, res, next) {
  try {
    const match = await cricketApi.getMatchDetails(req.params.id);
    res.json({ data: match });
  } catch (err) {
    next(err);
  }
}
