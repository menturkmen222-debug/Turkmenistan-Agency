import { Router } from "express";
import healthRouter from "./health.js";
import chatRouter from "./chat.js";
import contactRouter from "./contact.js";
import analyticsRouter from "./analytics.js";

const router = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(contactRouter);
router.use(analyticsRouter);

export default router;
