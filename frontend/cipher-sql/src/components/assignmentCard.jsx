import { Link } from "react-router-dom";

function AssignmentCard({ assignment }) {
  return (
    <div className="assignment-card">
      <div className="assignment-card__content">
        <h2 className="assignment-card__title">{assignment.title}</h2>
        <p className="assignment-card__description">{assignment.description}</p>
        <p className="assignment-card__difficulty">
          Difficulty: {assignment.difficulty}
        </p>
      </div>

      <Link
        className="assignment-card__button"
        to={`/assignments/${assignment._id}`}
      >
        Attempt Assignment
      </Link>
    </div>
  );
}

export default AssignmentCard;