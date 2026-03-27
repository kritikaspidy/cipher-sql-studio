import Editor from "@monaco-editor/react";

function QueryEditor({
  query,
  setQuery,
  onExecute,
  executing,
  onHint,
  loadingHint,
}) {
  const handleEditorMount = (editor) => {
    editor.addCommand(window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.Enter, () => {
      if (!executing) onExecute();
    });
  };

  return (
    <section className="query-editor">
      <div className="query-editor__header">
        <div>
          <p className="query-editor__eyebrow">Workspace</p>
          <h2 className="query-editor__title">SQL Editor</h2>
        </div>

        <div className="query-editor__shortcut">⌘ / Ctrl + Enter</div>
      </div>

      <div className="query-editor__editor-shell">
        <div className="query-editor__toolbar">
          <span className="query-editor__dot" />
          <span className="query-editor__dot" />
          <span className="query-editor__dot" />
          <span className="query-editor__filename">query.sql</span>
        </div>

        <div className="query-editor__editor">
          <Editor
            height="360px"
            defaultLanguage="sql"
            value={query}
            onChange={(value) => setQuery(value || "")}
            onMount={handleEditorMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              automaticLayout: true,
              tabSize: 2,
              padding: { top: 18, bottom: 18 },
              fontLigatures: true,
            }}
          />
        </div>
      </div>

      <div className="query-editor__actions">
        <button
          className="query-editor__secondary-button"
          onClick={onHint}
          disabled={loadingHint}
          type="button"
        >
          {loadingHint ? "Generating..." : "Get hint"}
        </button>

        <button
          className="query-editor__primary-button"
          onClick={onExecute}
          disabled={executing}
          type="button"
        >
          {executing ? "Running query..." : "Run query"}
        </button>
      </div>
    </section>
  );
}

export default QueryEditor;