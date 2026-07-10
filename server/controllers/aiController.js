import * as aiService from "../services/aiService.js";
import { isDbConnected } from "../config/db.js";
import { AiLog } from "../models/index.js";
import * as cricketApi from "../services/cricketApi.js";

async function logUsage(userId, feature, input, output) {
  if (!isDbConnected()) return;
  try {
    await AiLog.create({ user: userId, feature, input, output });
  } catch (err) {
    console.warn("Failed to log AI usage:", err.message);
  }
}

export async function analyst(req, res, next) {
  try {
    const { matchId, question } = req.body;
    const match = await cricketApi.getMatchDetails(matchId);
    const result = await aiService.matchAnalyst({ match, question: question || "Why is this team losing?" });
    await logUsage(req.userId, "match_analyst", { matchId, question }, result);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function commentary(req, res, next) {
  try {
    const { commentaryLines } = req.body;
    if (!Array.isArray(commentaryLines) || commentaryLines.length === 0) {
      return res.status(400).json({ message: "Provide a non-empty array of commentary lines." });
    }
    const result = await aiService.commentarySummary({ commentaryLines });
    await logUsage(req.userId, "commentary_summary", { lineCount: commentaryLines.length }, result);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function fantasy(req, res, next) {
  try {
    const { players } = req.body;
    if (!Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ message: "Provide a non-empty array of players." });
    }
    const result = await aiService.fantasyAssistant({ players });
    await logUsage(req.userId, "fantasy_assistant", { playerCount: players.length }, result);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function predictor(req, res, next) {
  try {
    const { matchId } = req.body;
    const match = await cricketApi.getMatchDetails(matchId);
    const result = await aiService.matchPredictor({ match });
    await logUsage(req.userId, "match_predictor", { matchId }, result);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
