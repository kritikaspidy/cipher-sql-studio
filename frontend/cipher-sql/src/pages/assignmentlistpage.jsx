import { useEffect, useMemo, useState } from "react";
import { getAllAssignments } from "../api/assignment";
import AssignmentCard from "../components/assignmentCard";

function AssignmentListPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

  const filteredAssignments = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return assignments;

    return assignments.filter((assignment) => {
      return (
        assignment.title?.toLowerCase().includes(term) ||
        assignment.description?.toLowerCase().includes(term) ||
        assignment.difficulty?.toLowerCase().includes(term)
      );
    });
  }, [assignments, search]);

  const total = assignments.length;
  const easy = assignments.filter(
    (a) => a.difficulty?.toLowerCase() === "easy"
  ).length;
  const medium = assignments.filter(
    (a) => a.difficulty?.toLowerCase() === "medium"
  ).length;
  const hard = assignments.filter(
    (a) => a.difficulty?.toLowerCase() === "hard"
  ).length;

  if (loading) {
    return (
      <div className="landing-page">
        <div className="landing-page__container">
          <p className="landing-page__status">Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="landing-page">
        <div className="landing-page__container">
          <p className="landing-page__status landing-page__status--error">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <div className="landing-page__container">
        <header className="landing-navbar">
          <div className="landing-navbar__brand">
            <div className="landing-navbar__logo">C</div>
            <span>CipherSQL</span>
          </div>

          <nav className="landing-navbar__links">
            <a href="#features">Features</a>
            <a href="#assignments">Assignments</a>
            <a href="#workspace">Workspace</a>
          </nav>

          <a href="#assignments" className="landing-navbar__button">
            Launch →
          </a>
        </header>

        <section className="landing-hero">
          <div className="landing-hero__left">
            <div className="landing-hero__pill">
              <span>100+</span>
              Students practice SQL smarter with CipherSQL
            </div>

            <h1 className="landing-hero__title">
              Master your SQL
              <br />
              <span>with AI-guided</span>
              <br />
              problem solving
            </h1>

            <p className="landing-hero__subtitle">
              Practice on real assignments, inspect schema beautifully, run queries
              instantly, and get hints that guide your thinking without handing you
              the answer.
            </p>

            <div className="landing-hero__actions">
              <a href="#assignments" className="landing-hero__primary-btn">
                Get started free →
              </a>

              <a href="#features" className="landing-hero__secondary-btn">
                Explore features
              </a>
            </div>
          </div>

          <div className="landing-hero__right" id="workspace">
            <div className="hero-preview">
              <div className="hero-preview__orbit hero-preview__orbit--one" />
              <div className="hero-preview__orbit hero-preview__orbit--two" />

              <div className="hero-preview__badge hero-preview__badge--top">
                Solution
              </div>

              <div className="hero-preview__badge hero-preview__badge--left">
                Hint
              </div>

              <div className="hero-preview__badge hero-preview__badge--right">
                Execute
              </div>

              <div className="hero-preview__card">
                <div className="hero-preview__editor-head">
                  <span className="hero-preview__dot" />
                  <span className="hero-preview__dot" />
                  <span className="hero-preview__dot" />
                  <span className="hero-preview__filename">query.sql</span>
                </div>

                <div className="hero-preview__code">
                  <p>
                    <span className="kw">SELECT</span>{" "}
                    <span className="id">customer_name</span>,{" "}
                    <span className="id">total_orders</span>
                  </p>
                  <p>
                    <span className="kw">FROM</span>{" "}
                    <span className="id">customers</span>
                  </p>
                  <p>
                    <span className="kw">JOIN</span>{" "}
                    <span className="id">orders</span>
                  </p>
                  <p>
                    <span className="kw">ON</span>{" "}
                    <span className="id">customers.id</span> ={" "}
                    <span className="id">orders.customer_id</span>
                  </p>
                  <p>
                    <span className="kw">WHERE</span>{" "}
                    <span className="id">total_orders</span> {">"}{" "}
                    <span className="num">5</span>
                  </p>
                  <p>
                    <span className="kw">ORDER BY</span>{" "}
                    <span className="id">total_orders</span>{" "}
                    <span className="kw">DESC</span>;
                  </p>
                </div>

                <div className="hero-preview__footer">
                  <span>Concept</span>
                  <span>Evaluate</span>
                  <span>Refine</span>
                  <button>→</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-trust-strip">
          <span>Analytics</span>
          <span>Education</span>
          <span>Practice Mode</span>
          <span>Schema Explorer</span>
          <span>Query Runner</span>
          <span>AI Hints</span>
        </section>

        <section className="landing-features" id="features">
          <div className="landing-feature-card">
            <span>Assignments</span>
            <strong>{total}</strong>
          </div>
          <div className="landing-feature-card">
            <span>Easy</span>
            <strong>{easy}</strong>
          </div>
          <div className="landing-feature-card">
            <span>Medium</span>
            <strong>{medium}</strong>
          </div>
          <div className="landing-feature-card">
            <span>Hard</span>
            <strong>{hard}</strong>
          </div>
        </section>

        <section className="landing-search-block" id="assignments">
          <div className="landing-search-block__head">
            <div>
              <p className="landing-search-block__eyebrow">Assignments</p>
              <h2>Start solving real SQL problems</h2>
            </div>
          </div>

          <input
            type="text"
            className="landing-search-block__search"
            placeholder="Search assignments"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>

        <section className="landing-page__grid">
          {filteredAssignments.length ? (
            filteredAssignments.map((assignment) => (
              <AssignmentCard key={assignment._id} assignment={assignment} />
            ))
          ) : (
            <div className="landing-page__empty">
              <p>No assignments matched your search.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AssignmentListPage;