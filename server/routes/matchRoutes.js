import { Router } from "express";
import * as matchController from "../controllers/matchController.js";

const router = Router();

router.get("/live", matchController.liveMatches);
router.get("/upcoming", matchController.upcomingMatches);
router.get("/completed", matchController.completedMatches);
router.get("/:id", matchController.matchDetails);

export default router;
