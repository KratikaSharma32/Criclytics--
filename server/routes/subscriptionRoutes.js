import { Router } from "express";
import * as paymentController from "../controllers/paymentController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/plans", paymentController.getPlans);
router.post("/checkout", requireAuth, paymentController.createOrder);
router.post("/verify", requireAuth, paymentController.verifyPayment);
router.post("/cancel", requireAuth, paymentController.cancelSubscription);

export default router;
