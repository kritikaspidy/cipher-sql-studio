import { useEffect, useState } from "react";
import { getAllAssignments } from "../api/assignment";
import AssignmentCard from "../components/assignmentCard";

function AssignmentListPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await getAllAssignments();
        setAssignments(response.data.assignments || []);
      } catch (err) {
        setError("Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="assignment-list-page">
  <div className="assignment-list-page__container">
    <h1 className="assignment-list-page__title">SQL Assignments</h1>

    <div className="assignment-list-page__grid">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment._id} assignment={assignment} />
      ))}
    </div>
  </div>
</div>
  );
}

export default AssignmentListPage;