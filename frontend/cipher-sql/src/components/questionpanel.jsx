function QuestionPanel({ assignment }) {
  if (!assignment) return null;

  return (
    <section className="question-panel">
      <div className="question-panel__hero">
        <div className="question-panel__hero-text">
          <p className="question-panel__eyebrow">Assignment</p>
          <h1 className="question-panel__title">{assignment.title}</h1>
          <p className="question-panel__description">{assignment.description}</p>
        </div>

        <span
          className={`question-panel__badge question-panel__badge--${(
            assignment.difficulty || "easy"
          ).toLowerCase()}`}
        >
          {assignment.difficulty}
        </span>
      </div>

      <div className="question-panel__section">
        <h2 className="question-panel__heading">Question</h2>
        <p className="question-panel__question">{assignment.question}</p>
      </div>

      <div className="question-panel__section">
        <h2 className="question-panel__heading">Requirements</h2>
        <ul className="question-panel__requirements">
          {assignment.requirements?.map((item, index) => (
            <li key={index} className="question-panel__requirement-item">
              <span className="question-panel__bullet">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default QuestionPanel;