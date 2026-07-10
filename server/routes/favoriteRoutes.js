import { Router } from "express";
import * as favoriteController from "../controllers/favoriteController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.get("/", favoriteController.list);
router.post("/", favoriteController.add);
router.delete("/:type/:refId", favoriteController.remove);

export default router;
