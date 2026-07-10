import admin from "firebase-admin";
import { Notification } from "../models/index.js";
import { isDbConnected } from "../config/db.js";

let app = null;

function getFirebaseApp() {
  if (app) return app;
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) return null;

  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
  return app;
}

// notificationTypes: match_start, fifty, century, hat_trick_chance, wicket, result, favorite_team_update
export async function sendNotification({ userId, deviceToken, type, title, body, matchId }) {
  // Always persist so the in-app notifications list works even without FCM.
  if (isDbConnected() && userId) {
    try {
      await Notification.create({ user: userId, type, title, body, matchId });
    } catch (err) {
      console.warn("Failed to persist notification:", err.message);
    }
  }

  const fcmApp = getFirebaseApp();
  if (!fcmApp || !deviceToken) {
    console.log(`🔔 [FCM not configured] ${title}: ${body}`);
    return { sent: false, reason: "fcm_not_configured" };
  }

  try {
    await admin.messaging().send({
      token: deviceToken,
      notification: { title, body },
      data: { type, matchId: matchId || "" },
    });
    return { sent: true };
  } catch (err) {
    console.warn("FCM send failed:", err.message);
    return { sent: false, reason: err.message };
  }
}

// Convenience helpers matching the spec's notification triggers.
export const notifyMatchStart = (args) => sendNotification({ ...args, type: "match_start" });
export const notifyFifty = (args) => sendNotification({ ...args, type: "fifty" });
export const notifyCentury = (args) => sendNotification({ ...args, type: "century" });
export const notifyHatTrickChance = (args) => sendNotification({ ...args, type: "hat_trick_chance" });
export const notifyWicket = (args) => sendNotification({ ...args, type: "wicket" });
export const notifyResult = (args) => sendNotification({ ...args, type: "result" });
export const notifyFavoriteTeamUpdate = (args) => sendNotification({ ...args, type: "favorite_team_update" });
