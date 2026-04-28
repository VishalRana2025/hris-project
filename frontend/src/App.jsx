import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import AddEmployee from "./pages/AddEmployee";
import Org from "./pages/Org";

function App() {
  const role = localStorage.getItem("role");

  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {role === "admin" ? <AdminDashboard /> : <Dashboard />}
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute role="admin">
            <Employees />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-employee"
        element={
          <ProtectedRoute role="admin">
            <AddEmployee />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leaves"
        element={
          <ProtectedRoute role="admin">
            <Leaves />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/org"
        element={
          <ProtectedRoute role="admin">
            <Org />
          </ProtectedRoute>
        }
      />

      <Route path="/register" element={<Register />} />

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;