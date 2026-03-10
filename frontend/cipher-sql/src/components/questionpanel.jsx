function QuestionPanel({ assignment }) {
  if (!assignment) return null;

  return (
    <section className="question-panel">
      <h1 className="question-panel__title">{assignment.title}</h1>
      <p className="question-panel__description">{assignment.description}</p>
      <p className="question-panel__difficulty">
        Difficulty: {assignment.difficulty}
      </p>

      <h2 className="question-panel__heading">Question</h2>
      <p className="question-panel__question">{assignment.question}</p>

      <h2 className="question-panel__heading">Requirements</h2>
      <ul className="question-panel__requirements">
        {assignment.requirements?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionPanel;