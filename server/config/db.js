import mongoose from "mongoose";

// If MONGO_URI isn't set, we don't crash the whole server — routes that need
// persistence check `isDbConnected()` and fall back to the in-memory store
// in services/memoryStore.js. This lets someone clone the repo and try the
// live-match / analytics / AI endpoints before they've set up Atlas.
let connected = false;

export const isDbConnected = () => connected;

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn(
      "⚠️  MONGO_URI not set — running with the in-memory data store. " +
        "Auth and favorites will work for local dev but won't persist across restarts."
    );
    return;
  }

  try {
    await mongoose.connect(uri);
    connected = true;
    console.log("✅ MongoDB Atlas connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed, falling back to in-memory store:", err.message);
    connected = false;
  }
}
