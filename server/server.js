import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import { initWebSocket } from "./websocket/socket.js";
import { apiLimiter, authLimiter } from "./middleware/rateLimiter.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(helmet());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(apiLimiter);

app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(notFound);
app.use(errorHandler);

const httpServer = http.createServer(app);
initWebSocket(httpServer, CLIENT_URL);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`🏏 CricLive API running on http://localhost:${PORT}`);
  });
});
