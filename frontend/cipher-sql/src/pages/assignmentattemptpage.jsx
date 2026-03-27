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
        const assignmentRes = await getAssignmentById(id);

let schemaRes = { data: { tables: [] } };

try {
  schemaRes = await getAssignmentSchema(id);
} catch (err) {
  console.log("Schema failed, ignoring...");
}
        const fetchedAssignment = assignmentRes.data.assignment;
        setAssignment(fetchedAssignment);
        setSchemaData(schemaRes.data.tables || []);

        const firstTable = fetchedAssignment?.relevantTables?.[0];
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
      setQueryError(err.response?.data?.message || "Failed to execute query");
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
        error: queryError,
      });

      setHint(response.data.hint);
    } catch (err) {
      console.error("Hint error:", err);
    } finally {
      setLoadingHint(false);
    }
  };

  if (loading) return <p className="page-status">Loading assignment...</p>;
  if (error) return <p className="page-status page-status--error">{error}</p>;
  if (!assignment) return <p className="page-status">Assignment not found.</p>;

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
            <section className="hint-box">
              <p className="hint-box__eyebrow">AI guidance</p>
              <h3 className="hint-box__title">Hint</h3>
              <p className="hint-box__text">{hint}</p>
            </section>
          )}

          <section className="assignment-attempt-page__results">
            <div className="assignment-attempt-page__results-head">
              <div>
                <p className="assignment-attempt-page__eyebrow">Output</p>
                <h2 className="assignment-attempt-page__results-title">Results</h2>
              </div>

              {queryResult && (
                <span className="assignment-attempt-page__row-count">
                  {queryResult.rowCount} row{queryResult.rowCount !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {queryError && (
              <p className="assignment-attempt-page__error">{queryError}</p>
            )}

            {queryResult ? (
              <ResultsTable rows={queryResult.rows} />
            ) : (
              <div className="assignment-attempt-page__placeholder">
                Run a query to inspect results here.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default AssignmentAttemptPage;