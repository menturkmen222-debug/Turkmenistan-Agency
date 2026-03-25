import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import contactRouter from "./contact";
import analyticsRouter from "./analytics";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(contactRouter);
router.use(analyticsRouter);

export default router;
