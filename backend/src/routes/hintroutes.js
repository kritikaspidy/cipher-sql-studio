import express from "express";
import { getHint } from "../controller/hintcontroller.js";

const router = express.Router();

router.post("/", getHint);

export default router;