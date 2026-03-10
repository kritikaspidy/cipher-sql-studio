import Editor from "@monaco-editor/react";

function QueryEditor({ query, setQuery, onExecute, executing , onHint, loadingHint}) {
  return (
    <section className="query-editor">
      <h2 className="query-editor__title">Write SQL Query</h2>

      <div className="query-editor__editor">
        <Editor
          height="300px"
          defaultLanguage="sql"
          value={query}
          onChange={(value) => setQuery(value || "")}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>

      <button
        className="query-editor__hint-button"
        onClick={onHint}
        disabled={loadingHint}
        >
        {loadingHint ? "Generating Hint..." : "Get Hint"}
        </button>    

      <button
        className="query-editor__button"
        onClick={onExecute}
        disabled={executing}
      >
        {executing ? "Executing..." : "Execute Query"}
      </button>
    </section>
  );
}

export default QueryEditor;