import pool from "../config/postgres.js";

export const executeQuery = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "SQL query is required",
      });
    }

    const trimmedQuery = query.trim();
    const normalizedQuery = trimmedQuery.toUpperCase();

    if (!normalizedQuery.startsWith("SELECT")) {
      return res.status(400).json({
        success: false,
        message: "Only SELECT queries are allowed",
      });
    }

    const forbiddenKeywords = [
      "INSERT",
      "UPDATE",
      "DELETE",
      "DROP",
      "ALTER",
      "TRUNCATE",
      "CREATE",
      "GRANT",
      "REVOKE",
    ];

    for (const keyword of forbiddenKeywords) {
      if (normalizedQuery.includes(keyword)) {
        return res.status(400).json({
          success: false,
          message: `Query contains forbidden keyword: ${keyword}`,
        });
      }
    }

    let safeQuery = trimmedQuery;

// remove one trailing semicolon if present
if (safeQuery.endsWith(";")) {
  safeQuery = safeQuery.slice(0, -1);
}

// block multiple statements
if (safeQuery.includes(";")) {
  return res.status(400).json({
    success: false,
    message: "Multiple SQL statements are not allowed",
  });
}

    const result = await pool.query(trimmedQuery);

    res.status(200).json({
      success: true,
      rowCount: result.rowCount,
      rows: result.rows,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};