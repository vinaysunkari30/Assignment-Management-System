import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { admins, students } from "./data/seededUsers";
import { seededAssignments } from "./data/seededAssigments";
import Toast from "./components/Toast";

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem("admins")) {
      localStorage.setItem("admins", JSON.stringify(admins));
    }

    if (!localStorage.getItem("students")) {
      localStorage.setItem("students", JSON.stringify(students));
    }

    if (!localStorage.getItem("assignments")) {
      localStorage.setItem("assignments", JSON.stringify(seededAssignments));
    }
  }, []);

  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <Toast />
    </>
  );
};

export default App;
