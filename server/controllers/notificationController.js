import { Notification } from "../models/index.js";
import { isDbConnected } from "../config/db.js";

export async function list(req, res, next) {
  try {
    if (!isDbConnected()) {
      return res.json({ data: [] }); // in-memory mode: nothing persisted yet
    }
    const notifications = await Notification.find({ user: req.userId }).sort("-createdAt").limit(50);
    res.json({ data: notifications });
  } catch (err) {
    next(err);
  }
}

export async function markRead(req, res, next) {
  try {
    if (isDbConnected()) {
      await Notification.findOneAndUpdate({ _id: req.params.id, user: req.userId }, { read: true });
    }
    res.json({ message: "Marked as read." });
  } catch (err) {
    next(err);
  }
}
