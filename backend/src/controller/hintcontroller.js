import mongoose from "mongoose";
import Assignment from "../models/assignment.js";

export const getHint = async (req, res) => {
  try {

    const { assignmentId, query, error } = req.body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Grok API key not configured"
      });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found"
      });
    }

    const prompt = `
You are an SQL tutor. Give a helpful hint but DO NOT give the full solution.

Question:
${assignment.question}

Requirements:
${assignment.requirements?.join(", ")}

Student Query:
${query || "None"}

Error:
${error || "None"}

Give only a short hint.
`;

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [
          { role: "system", content: "You are a helpful SQL tutor." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    const hint = data.choices?.[0]?.message?.content || "Try reviewing the tables and joins required.";

    res.json({
      success: true,
      hint
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate hint",
      error: error.message
    });
  }
};