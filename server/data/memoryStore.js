import bcrypt from "bcryptjs";

// Minimal in-memory substitute for the User + Favorite collections so the
// app is runnable with zero setup. Swapped out automatically once
// MONGO_URI is set — see config/db.js / controllers/authController.js.
let users = [];
let favorites = [];
let nextUserId = 1;

export const memoryStore = {
  async findUserByEmailOrUsername(emailOrUsername) {
    const val = emailOrUsername.toLowerCase();
    return users.find((u) => u.email === val || u.username === val) || null;
  },

  async createUser({ fullName, username, email, password, country, favoriteTeam }) {
    const hashed = await bcrypt.hash(password, 12);
    const user = {
      id: String(nextUserId++),
      fullName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashed,
      country: country || "",
      favoriteTeam: favoriteTeam || "",
      plan: "Free",
      createdAt: new Date(),
    };
    users.push(user);
    return user;
  },

  async comparePassword(user, candidate) {
    return bcrypt.compare(candidate, user.password);
  },

  toSafeObject(user) {
    const { password, ...safe } = user;
    return safe;
  },

  async addFavorite(userId, type, refId, label) {
    const exists = favorites.find((f) => f.userId === userId && f.type === type && f.refId === refId);
    if (exists) return exists;
    const fav = { id: String(favorites.length + 1), userId, type, refId, label, createdAt: new Date() };
    favorites.push(fav);
    return fav;
  },

  async removeFavorite(userId, type, refId) {
    favorites = favorites.filter((f) => !(f.userId === userId && f.type === type && f.refId === refId));
  },

  async listFavorites(userId, type) {
    return favorites.filter((f) => f.userId === userId && (!type || f.type === type));
  },
};
