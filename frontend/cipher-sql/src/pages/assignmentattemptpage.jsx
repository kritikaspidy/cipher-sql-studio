import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentById, getAssignmentSchema } from "../api/assignment";
import { executeQuery } from "../api/queryapi";
import ResultsTable from "../components/resultstable";
import QueryEditor from "../components/QueryEditor";
import QuestionPanel from "../components/questionpanel";
import SchemaViewer from "../components/SchemaViewer";
import { getHint } from "../api/hintapi";


function AssignmentAttemptPage() {
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [schemaData, setSchemaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState(null);
  const [queryError, setQueryError] = useState("");
  const [executing, setExecuting] = useState(false);
  const [hint, setHint] = useState("");
const [loadingHint, setLoadingHint] = useState(false);

  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const [assignmentRes, schemaRes] = await Promise.all([
          getAssignmentById(id),
          getAssignmentSchema(id),
        ]);

        setAssignment(assignmentRes.data.assignment);
        setSchemaData(schemaRes.data.tables || []);

        const firstTable = assignmentRes.data.assignment?.relevantTables?.[0];
if (firstTable) {
  setQuery(`SELECT * FROM ${firstTable};`);
}

      } catch (err) {
        setError("Failed to load assignment details");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentData();
  }, [id]);

  const handleExecuteQuery = async () => {
    try {
      setExecuting(true);
      setQueryError("");
      setQueryResult(null);

      const response = await executeQuery(query);
      setQueryResult(response.data);
    } catch (err) {
      setQueryError(
        err.response?.data?.message || "Failed to execute query"
      );
    } finally {
      setExecuting(false);
    }
  };

  const handleGetHint = async () => {
  try {
    setLoadingHint(true);

    const response = await getHint({
      assignmentId: id,
      query,
      error: queryError
    });

    setHint(response.data.hint);

  } catch (err) {
    console.error("Hint error:", err);
  } finally {
    setLoadingHint(false);
  }
};

  if (loading) return <p>Loading assignment...</p>;
  if (error) return <p>{error}</p>;
  if (!assignment) return <p>Assignment not found.</p>;

  return (
    <div className="assignment-attempt-page">
  <div className="assignment-attempt-page__container">

    <div className="assignment-attempt-page__left">
      <QuestionPanel assignment={assignment} />
      <SchemaViewer schemaData={schemaData} />
    </div>

    <div className="assignment-attempt-page__right">
      <QueryEditor
        query={query}
        setQuery={setQuery}
        onExecute={handleExecuteQuery}
        executing={executing}
        onHint={handleGetHint}
        loadingHint={loadingHint}
      />

      {hint && (
        <div className="hint-box">
            <h3>Hint</h3>
            <p>{hint}</p>
        </div>
        )}

      <section className="assignment-attempt-page__results">
        <h2>Results</h2>

        {queryError && (
          <p className="assignment-attempt-page__error">{queryError}</p>
        )}

        {queryResult && (
          <p className="assignment-attempt-page__row-count">
            Rows returned: {queryResult.rowCount}
          </p>
        )}

        {queryResult && <ResultsTable rows={queryResult.rows} />}
      </section>
    </div>

  </div>
</div>
  );
}

export default AssignmentAttemptPage;