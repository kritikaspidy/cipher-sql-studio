import express from "express";
import { getAllAssignments, getAssignmentById , getAssignmentSchema} from "../controller/assigmentcontoller.js";

const router = express.Router();

router.get("/", getAllAssignments);
router.get("/:id/schema", getAssignmentSchema);
router.get("/:id", getAssignmentById);
export default router;