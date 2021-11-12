import express from "express";
import DigitRouter from "./digit.router";
import ViewsRouter from "./views.router";

const router = express.Router();

router.use("/api/digits", DigitRouter);

router.use("/", ViewsRouter);

export default router;
