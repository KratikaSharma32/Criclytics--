import Redis from "ioredis";

// Wrapper gives every service the same get/set/del API whether Redis is
// configured or not, so caching code never has to branch on REDIS_URL.
class MemoryCache {
  constructor() {
    this.store = new Map();
  }
  async get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }
  async set(key, value, ttlSeconds) {
    this.store.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
    });
    return "OK";
  }
  async del(key) {
    this.store.delete(key);
  }
}

class RedisCache {
  constructor(url) {
    this.client = new Redis(url, { maxRetriesPerRequest: 2, lazyConnect: true });
    this.client.on("error", (err) => console.error("Redis error:", err.message));
  }
  async get(key) {
    const val = await this.client.get(key);
    return val ? JSON.parse(val) : null;
  }
  async set(key, value, ttlSeconds) {
    const payload = JSON.stringify(value);
    return ttlSeconds
      ? this.client.set(key, payload, "EX", ttlSeconds)
      : this.client.set(key, payload);
  }
  async del(key) {
    return this.client.del(key);
  }
}

const cache = process.env.REDIS_URL ? new RedisCache(process.env.REDIS_URL) : new MemoryCache();

if (!process.env.REDIS_URL) {
  console.warn("⚠️  REDIS_URL not set — using an in-memory cache (fine for local dev, not for multiple instances).");
}

// Standard TTLs from the product spec.
export const CACHE_TTL = {
  liveMatches: 30,
  fixtures: 300,
  teams: 86400,
  players: 86400,
  standings: 900,
  analytics: 300,
};

export default cache;
