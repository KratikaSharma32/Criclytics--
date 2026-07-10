import { Server } from "socket.io";
import { fallbackLive } from "../data/fallbackCricketData.js";

// This simulates a live feed by nudging the bundled fallback scores every
// few seconds. Swap the setInterval body for a poll of cricketApi.getLiveMatches()
// (or a SportMonks webhook) once you're plugged into a real provider —
// the socket event names below can stay the same.
export function initWebSocket(httpServer, corsOrigin) {
  const io = new Server(httpServer, {
    cors: { origin: corsOrigin, credentials: true },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.emit("live:matches", fallbackLive);

    socket.on("join:match", (matchId) => {
      socket.join(`match:${matchId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  // Simulated live tick every 15s — demonstrates the real-time architecture
  // requested in the spec without needing a paid live-data plan to test it.
  setInterval(() => {
    fallbackLive.forEach((m) => {
      io.to(`match:${m.id}`).emit("score:update", m);
    });
    io.emit("live:matches", fallbackLive);
  }, 15000);

  return io;
}
