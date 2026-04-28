import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // ✅ OPEN BY DEFAULT
  const [openOrg, setOpenOrg] = useState(true);
  const [openOrgStructure, setOpenOrgStructure] = useState(true);
  const [openEmpStructure, setOpenEmpStructure] = useState(true);

  const linkClass = ({ isActive }) =>
    isActive
      ? "block bg-blue-700 p-2 rounded font-semibold"
      : "block hover:bg-blue-700 p-2 rounded";

  const subLinkClass =
    "block text-sm pl-3 border-l-2 border-blue-400 hover:text-white";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-5 flex flex-col">

      {/* LOGO */}
      <h1 className="text-2xl font-bold mb-2">HRMS</h1>

      <p className="text-xs text-gray-300 mb-6 uppercase">
        {role === "admin" ? "Admin Panel" : "Employee Panel"}
      </p>

      <ul className="space-y-3 flex-1">

        {/* DASHBOARD */}
        <li>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </li>

        {/* PROFILE */}
        <li>
          <NavLink to="/profile" className={linkClass}>
            My Profile
          </NavLink>
        </li>

        {/* ATTENDANCE */}
        <li>
          <NavLink to="/attendance" className={linkClass}>
            Attendance
          </NavLink>
        </li>

        {/* 🔥 ADMIN ONLY */}
        {role === "admin" && (
          <>
            <p className="text-xs text-gray-400 mt-4 uppercase">
              Management
            </p>

            <li>
              <NavLink to="/employees" className={linkClass}>
                Employees
              </NavLink>
            </li>

            <li>
              <NavLink to="/leaves" className={linkClass}>
                Leaves
              </NavLink>
            </li>

           
    <li>
      <NavLink to="/org" className={linkClass}>
        Org
      </NavLink>
    </li>
            
          </>
        )}
      </ul>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 p-2 rounded mt-4"
      >
        Logout
      </button>

    </div>
  );
}