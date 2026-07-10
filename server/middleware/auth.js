import { verifyAccessToken } from "../utils/tokens.js";
import { isDbConnected } from "../config/db.js";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated. Please log in." });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.userId = decoded.sub;

    if (isDbConnected()) {
      const user = await User.findById(decoded.sub);
      if (!user) return res.status(401).json({ message: "User no longer exists." });
      req.user = user;
      req.plan = user.plan;
    } else {
      req.plan = req.memoryPlan || "Free";
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Session expired. Please log in again." });
  }
}

// Usage: requirePlan(["Pro", "Premium"]) on any AI/analytics route
export function requirePlan(allowedPlans) {
  return (req, res, next) => {
    if (!allowedPlans.includes(req.plan)) {
      return res.status(403).json({
        message: `This feature needs the ${allowedPlans.join(" or ")} plan. You're currently on ${req.plan}.`,
        upgradeRequired: true,
      });
    }
    next();
  };
}
