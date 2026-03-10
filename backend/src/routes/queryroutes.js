import express from "express";
import { executeQuery } from "../controller/querycontroller.js";

const router = express.Router();

router.post("/execute", executeQuery);

export default router;