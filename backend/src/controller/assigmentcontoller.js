import Assignment from "../models/assignment.js";
import mongoose from "mongoose";
import pool from "../config/postgres.js";

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assignments",
      error: error.message,
    });
  }
};

export const getAssignmentById = async (req, res) => {
  try{
    const { id } = req.params;
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }
    res.status(200).json({
      success: true,
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assignment",
      error: error.message,
    });
  }
};

export const getAssignmentSchema = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID",
      });
    }

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    const tablesData = [];

    for (const tableName of assignment.relevantTables) {
      const columnsResult = await pool.query(
        `
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position;
        `,
        [tableName]
      );

      const rowsResult = await pool.query(
        `SELECT * FROM ${tableName} LIMIT 5`
      );

      tablesData.push({
        name: tableName,
        columns: columnsResult.rows,
        sampleRows: rowsResult.rows,
      });
    }

    res.status(200).json({
      success: true,
      assignmentId: assignment._id,
      tables: tablesData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch schema preview",
      error: error.message,
    });
  }
};