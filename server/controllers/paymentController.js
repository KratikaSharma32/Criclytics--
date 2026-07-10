import crypto from "crypto";
import Razorpay from "razorpay";
import { PLANS } from "../data/plans.js";
import { Payment, Subscription } from "../models/index.js";
import { isDbConnected } from "../config/db.js";
import User from "../models/User.js";

function getRazorpayClient() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return null;
  return new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
}

export async function getPlans(req, res) {
  res.json({ data: PLANS });
}

export async function createOrder(req, res, next) {
  try {
    const { plan } = req.body;
    if (!PLANS[plan] || plan === "Free") {
      return res.status(400).json({ message: "Choose Pro or Premium to subscribe." });
    }

    const razorpay = getRazorpayClient();
    if (!razorpay) {
      return res.status(503).json({
        message: "Payments aren't configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to the server .env.",
      });
    }

    const amount = PLANS[plan].price * 100; // paise
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `criclive_${req.userId}_${Date.now()}`,
    });

    if (isDbConnected()) {
      await Payment.create({
        user: req.userId,
        plan,
        amount: PLANS[plan].price,
        provider: "razorpay",
        providerOrderId: order.id,
        status: "created",
      });
    }

    res.json({ data: order, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    next(err);
  }
}

export async function verifyPayment(req, res, next) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment signature verification failed." });
    }

    if (isDbConnected()) {
      await Payment.findOneAndUpdate(
        { providerOrderId: razorpay_order_id },
        { providerPaymentId: razorpay_payment_id, status: "paid" }
      );
      await User.findByIdAndUpdate(req.userId, { plan });
      await Subscription.findOneAndUpdate(
        { user: req.userId },
        {
          plan,
          status: "active",
          provider: "razorpay",
          startedAt: new Date(),
          renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
        { upsert: true }
      );
    }

    res.json({ message: `Payment verified. You're now on the ${plan} plan.` });
  } catch (err) {
    next(err);
  }
}

export async function cancelSubscription(req, res, next) {
  try {
    if (isDbConnected()) {
      await Subscription.findOneAndUpdate({ user: req.userId }, { status: "cancelled" });
      await User.findByIdAndUpdate(req.userId, { plan: "Free" });
    }
    res.json({ message: "Subscription cancelled. You've been moved to the Free plan." });
  } catch (err) {
    next(err);
  }
}
