import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getDashboardStats } from "../services/api"; // ✅ use API service

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    onLeave: 0,
    pendingRequests: 0
  });

  // 🔥 FETCH DASHBOARD DATA
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await getDashboardStats(token); // ✅ FIXED

      setStats(res.data);
    } catch (err) {
      console.log("Dashboard error:", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

          {/* 🔥 STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card title="Total Employees" value={stats.totalEmployees} />
            <Card title="Present Today" value={stats.presentToday} />
            <Card title="On Leave" value={stats.onLeave} />
            <Card title="Pending Requests" value={stats.pendingRequests} />
          </div>

          {/* 🔥 QUICK ACTIONS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Quick Actions</h3>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/add-employee")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Employee
              </button>

              <button
                onClick={() => navigate("/leaves")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Approve Leaves
              </button>

              <button
                onClick={() => navigate("/attendance")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                View Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔥 CARD COMPONENT
function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}