import { useEffect, useState } from "react";
import {
  getEmployees,
  checkIn,
  checkOut,
  getTodayAttendance,
  getMyEmployee,
  applyLeave,
  getMyLeaves
} from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [total, setTotal] = useState(0);
  const [present, setPresent] = useState(0);
  const [loading, setLoading] = useState(true);

  const [employee, setEmployee] = useState(null);

  // 🔥 TIMER
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  // 🔥 LEAVE STATE
  const [leaves, setLeaves] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  // =============================
  // FETCH DASHBOARD DATA
  // =============================
  const fetchData = async () => {
    try {
      const empRes = await getEmployees(token);
      setTotal(empRes.data.length);

      const attRes = await getTodayAttendance(token);
      setPresent(attRes.data.length);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // FETCH EMPLOYEE
  // =============================
  const fetchEmployee = async () => {
    try {
      const res = await getMyEmployee(token);
      setEmployee(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =============================
  // ✅ FETCH LEAVES (FIXED)
  // =============================
  const fetchLeaves = async () => {
    try {
      const res = await getMyLeaves(token);
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =============================
  // ✅ APPLY LEAVE (FIXED)
  // =============================
  const handleApplyLeave = async () => {
    if (!fromDate || !toDate || !reason) {
      return alert("Fill all fields");
    }

    try {
      await applyLeave({ fromDate, toDate, reason }, token);

      alert("Leave applied ✅");

      setFromDate("");
      setToDate("");
      setReason("");

      fetchLeaves();
    } catch (err) {
      alert("Failed ❌");
    }
  };

  // =============================
  // TIMER LOAD
  // =============================
  useEffect(() => {
    const stored = localStorage.getItem("checkInTime");
    if (stored) setStartTime(parseInt(stored));
  }, []);

  // =============================
  // TIMER RUN
  // =============================
  useEffect(() => {
    let interval;

    if (startTime) {
      interval = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime]);

  // =============================
  // LOAD DATA
  // =============================
  useEffect(() => {
    if (!token) return;

    fetchData();
    fetchEmployee();
    fetchLeaves();
  }, [token]);

  // =============================
  // FORMAT TIME
  // =============================
  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };

  // =============================
  // CHECK IN
  // =============================
  const handleCheckIn = async () => {
    try {
      await checkIn(token);

      const now = Date.now();
      localStorage.setItem("checkInTime", now);

      setStartTime(now);
      alert("Checked In ✅");
      fetchData();
    } catch {
      alert("Check In Failed ❌");
    }
  };

  // =============================
  // CHECK OUT
  // =============================
  const handleCheckOut = async () => {
    try {
      await checkOut(token);

      localStorage.removeItem("checkInTime");
      setStartTime(null);
      setElapsed(0);

      alert("Checked Out ✅");
      fetchData();
    } catch {
      alert("Check Out Failed ❌");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

          {/* EMPLOYEE CARD */}
          {employee && (
            <div className="bg-white p-6 rounded-2xl shadow mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {employee.fullName}
              </h3>
              <p className="text-gray-500">{employee.jobTitle}</p>
              <p className="text-sm mt-2">{employee.department}</p>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleCheckIn}
              disabled={startTime}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Check In
            </button>

            <button
              onClick={handleCheckOut}
              disabled={!startTime}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Check Out
            </button>
          </div>

          {/* TIMER */}
          {startTime && (
            <div className="bg-green-100 p-3 rounded mb-6">
              ⏱ {formatTime(elapsed)}
            </div>
          )}

          {/* APPLY LEAVE */}
          <div className="bg-white p-6 rounded-2xl shadow mb-6">
            <h3 className="font-semibold mb-4">Apply Leave</h3>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <button
              onClick={handleApplyLeave}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply Leave
            </button>
          </div>

          {/* MY LEAVES */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-4">My Leaves</h3>

            {leaves.length === 0 ? (
              <p>No leaves applied</p>
            ) : (
              leaves.map((l) => (
                <div
                  key={l._id}
                  className="border p-3 mb-2 rounded flex justify-between"
                >
                  <span>
                    {new Date(l.fromDate).toDateString()} →{" "}
                    {new Date(l.toDate).toDateString()}
                  </span>

                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      l.status === "approved"
                        ? "bg-green-600"
                        : l.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {l.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}