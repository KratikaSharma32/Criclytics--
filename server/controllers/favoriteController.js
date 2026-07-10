import { Favorite } from "../models/index.js";
import { memoryStore } from "../data/memoryStore.js";
import { isDbConnected } from "../config/db.js";

export async function list(req, res, next) {
  try {
    const { type } = req.query;
    if (isDbConnected()) {
      const query = { user: req.userId, ...(type && { type }) };
      const favorites = await Favorite.find(query).sort("-createdAt");
      return res.json({ data: favorites });
    }
    const favorites = await memoryStore.listFavorites(req.userId, type);
    res.json({ data: favorites });
  } catch (err) {
    next(err);
  }
}

export async function add(req, res, next) {
  try {
    const { type, refId, label } = req.body;
    if (!["match", "team", "player"].includes(type)) {
      return res.status(400).json({ message: "type must be one of match, team, player." });
    }
    if (isDbConnected()) {
      const favorite = await Favorite.findOneAndUpdate(
        { user: req.userId, type, refId },
        { label },
        { upsert: true, new: true }
      );
      return res.status(201).json({ data: favorite });
    }
    const favorite = await memoryStore.addFavorite(req.userId, type, refId, label);
    res.status(201).json({ data: favorite });
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const { type, refId } = req.params;
    if (isDbConnected()) {
      await Favorite.findOneAndDelete({ user: req.userId, type, refId });
    } else {
      await memoryStore.removeFavorite(req.userId, type, refId);
    }
    res.json({ message: "Removed from favorites." });
  } catch (err) {
    next(err);
  }
}
