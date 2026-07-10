import { Router } from "express";
import * as aiController from "../controllers/aiController.js";
import { requireAuth, requirePlan } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth, requirePlan(["Pro", "Premium"]));

router.post("/analyst", aiController.analyst);
router.post("/commentary-summary", aiController.commentary);
router.post("/fantasy-assistant", aiController.fantasy);
router.post("/predictor", aiController.predictor);

export default router;
