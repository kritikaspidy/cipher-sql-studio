import express from "express";
import cors from "cors";
import pool from "./config/postgres.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import assignmentRoutes from "./routes/assigmentroutes.js";
import queryRoutes from "./routes/queryroutes.js";
import hintRoutes from "./routes/hintroutes.js";


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


connectDB();

app.get("/api", (req, res) => {
    res.json({ message: "Server running" });
});

app.get("/api/test-postgres", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({
      success: true,
      time: result.rows[0],
    });
  } catch (error) {
    console.error("Postgres test route error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.use("/api/assignments", assignmentRoutes);

app.use("/api/query", queryRoutes);
app.use("/api/hint", hintRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;