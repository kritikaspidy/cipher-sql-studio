import { Link } from "react-router-dom";

function AssignmentCard({ assignment }) {
  const difficulty = (assignment.difficulty || "easy").toLowerCase();

  return (
    <article className="assignment-card">
      <div className="assignment-card__glow" />

      <div className="assignment-card__top">
        <span className={`assignment-card__badge assignment-card__badge--${difficulty}`}>
          {assignment.difficulty}
        </span>

        {assignment.relevantTables?.length ? (
          <span className="assignment-card__meta">
            {assignment.relevantTables.length} table
            {assignment.relevantTables.length > 1 ? "s" : ""}
          </span>
        ) : null}
      </div>

      <div className="assignment-card__content">
        <h2 className="assignment-card__title">{assignment.title}</h2>
        <p className="assignment-card__description">{assignment.description}</p>
      </div>

      <div className="assignment-card__footer">
        <Link
          className="assignment-card__button"
          to={`/assignments/${assignment._id}`}
        >
          Start solving
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default AssignmentCard;