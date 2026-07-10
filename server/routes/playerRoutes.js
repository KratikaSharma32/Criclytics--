import { Router } from "express";
import { playerDetails } from "../controllers/teamPlayerController.js";

const router = Router();
router.get("/:slug", playerDetails);
export default router;
