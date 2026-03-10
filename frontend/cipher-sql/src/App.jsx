import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssignmentListPage from "./pages/assignmentlistpage";
import AssignmentAttemptPage from "./pages/AssignmentAttemptPage";
import "./style/main.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AssignmentListPage />} />
        <Route path="/assignments/:id" element={<AssignmentAttemptPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;