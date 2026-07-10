import { Router } from "express";
import { teamDetails } from "../controllers/teamPlayerController.js";

const router = Router();
router.get("/:slug", teamDetails);
export default router;
