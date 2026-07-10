import crypto from "crypto";
import User from "../models/User.js";
import { memoryStore } from "../data/memoryStore.js";
import { isDbConnected } from "../config/db.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/tokens.js";
import { sendPasswordResetEmail } from "../services/emailService.js";

const cookieOpts = (maxAgeMs) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: maxAgeMs,
});

export async function register(req, res, next) {
  try {
    const { fullName, username, email, password, country, favoriteTeam } = req.body;

    if (isDbConnected()) {
      const existing = await User.findOne({ $or: [{ email }, { username }] });
      if (existing) {
        return res.status(409).json({ message: "An account with that email or username already exists." });
      }
      const user = await User.create({ fullName, username, email, password, country, favoriteTeam });
      return issueTokensAndRespond(res, user.id, user.toSafeObject(), 201);
    }

    const existing = await memoryStore.findUserByEmailOrUsername(email);
    if (existing) {
      return res.status(409).json({ message: "An account with that email already exists." });
    }
    const user = await memoryStore.createUser({ fullName, username, email, password, country, favoriteTeam });
    return issueTokensAndRespond(res, user.id, memoryStore.toSafeObject(user), 201);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { emailOrUsername, password } = req.body;

    if (isDbConnected()) {
      const user = await User.findOne({
        $or: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername.toLowerCase() }],
      }).select("+password");
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Incorrect email/username or password." });
      }
      return issueTokensAndRespond(res, user.id, user.toSafeObject());
    }

    const user = await memoryStore.findUserByEmailOrUsername(emailOrUsername);
    if (!user || !(await memoryStore.comparePassword(user, password))) {
      return res.status(401).json({ message: "Incorrect email/username or password." });
    }
    return issueTokensAndRespond(res, user.id, memoryStore.toSafeObject(user));
  } catch (err) {
    next(err);
  }
}

async function issueTokensAndRespond(res, userId, safeUser, status = 200) {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  res
    .cookie("accessToken", accessToken, cookieOpts(15 * 60 * 1000))
    .cookie("refreshToken", refreshToken, cookieOpts(30 * 24 * 60 * 60 * 1000))
    .status(status)
    .json({ user: safeUser, accessToken, refreshToken });
}

export async function refresh(req, res, next) {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token provided." });

    const decoded = verifyRefreshToken(token);
    const accessToken = generateAccessToken(decoded.sub);
    res.cookie("accessToken", accessToken, cookieOpts(15 * 60 * 1000)).json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: "Refresh token invalid or expired. Please log in again." });
  }
}

export async function logout(req, res) {
  res.clearCookie("accessToken").clearCookie("refreshToken").json({ message: "Logged out." });
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;

    if (!isDbConnected()) {
      // Demo mode: acknowledge without sending real email.
      return res.json({ message: "If an account exists for that email, a reset link has been sent." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal whether the email exists.
      return res.json({ message: "If an account exists for that email, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    res.json({ message: "If an account exists for that email, a reset link has been sent." });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  try {
    if (!isDbConnected()) {
      return res.status(400).json({ message: "Password reset requires a connected database." });
    }
    const { token, password } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!user) {
      return res.status(400).json({ message: "That reset link is invalid or has expired." });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password updated. You can log in now." });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    if (isDbConnected()) {
      const user = await User.findById(req.userId);
      return res.json({ user: user.toSafeObject() });
    }
    const user = await memoryStore.findUserByEmailOrUsername(req.userEmail || "");
    res.json({ user: user ? memoryStore.toSafeObject(user) : null });
  } catch (err) {
    next(err);
  }
}
