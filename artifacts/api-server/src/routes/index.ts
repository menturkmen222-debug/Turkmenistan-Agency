import { Router } from "express";
import healthRouter from "./health.js";
import chatRouter from "./chat.js";
import contactRouter from "./contact.js";
import analyticsRouter from "./analytics.js";
import notifyRouter from "./notify.js";

const router = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(contactRouter);
router.use(analyticsRouter);
router.use(notifyRouter);

export default router;
