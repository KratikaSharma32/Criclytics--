import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 8, select: false },
    country: { type: String, default: "" },
    favoriteTeam: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    plan: { type: String, enum: ["Free", "Pro", "Premium"], default: "Free" },
    refreshToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toSafeObject = function () {
  const { _id, fullName, username, email, country, favoriteTeam, profilePicture, plan, createdAt } = this;
  return { id: _id, fullName, username, email, country, favoriteTeam, profilePicture, plan, createdAt };
};

export default mongoose.model("User", userSchema);
