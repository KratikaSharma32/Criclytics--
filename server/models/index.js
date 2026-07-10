import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["match", "team", "player"], required: true },
    refId: { type: String, required: true },
    label: { type: String, required: true },
  },
  { timestamps: true }
);
favoriteSchema.index({ user: 1, type: 1, refId: 1 }, { unique: true });

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["Free", "Pro", "Premium"], default: "Free" },
    status: { type: String, enum: ["active", "cancelled", "expired"], default: "active" },
    startedAt: { type: Date, default: Date.now },
    renewsAt: { type: Date },
    provider: { type: String, enum: ["razorpay", "stripe", "none"], default: "none" },
    providerSubscriptionId: { type: String },
  },
  { timestamps: true }
);

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    provider: { type: String, enum: ["razorpay", "stripe"], required: true },
    providerOrderId: { type: String },
    providerPaymentId: { type: String },
    status: { type: String, enum: ["created", "paid", "failed", "refunded"], default: "created" },
  },
  { timestamps: true }
);

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["match_start", "fifty", "century", "hat_trick_chance", "wicket", "result", "favorite_team_update"],
      required: true,
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    matchId: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const aiLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    feature: {
      type: String,
      enum: ["match_analyst", "commentary_summary", "fantasy_assistant", "match_predictor"],
      required: true,
    },
    input: { type: mongoose.Schema.Types.Mixed },
    output: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Favorite = mongoose.model("Favorite", favoriteSchema);
export const Subscription = mongoose.model("Subscription", subscriptionSchema);
export const Payment = mongoose.model("Payment", paymentSchema);
export const Notification = mongoose.model("Notification", notificationSchema);
export const AiLog = mongoose.model("AiLog", aiLogSchema);
