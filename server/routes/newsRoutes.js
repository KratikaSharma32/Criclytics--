import { Router } from "express";
import { cricketNews } from "../controllers/newsController.js";

const router = Router();
router.get("/", cricketNews);
export default router;
