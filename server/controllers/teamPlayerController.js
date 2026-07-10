import * as cricketApi from "../services/cricketApi.js";

export async function teamDetails(req, res, next) {
  try {
    const team = await cricketApi.getTeam(req.params.slug);
    res.json({ data: team });
  } catch (err) {
    next(err);
  }
}

export async function playerDetails(req, res, next) {
  try {
    const player = await cricketApi.getPlayer(req.params.slug);
    res.json({ data: player });
  } catch (err) {
    next(err);
  }
}
