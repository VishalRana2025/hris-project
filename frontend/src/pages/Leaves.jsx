import { useEffect, useState } from "react";
import { applyLeave, getLeaves, updateLeaveStatus } from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Leaves() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [form, setForm] = useState({
    from: "",
    to: "",
    reason: ""
  });

  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await getLeaves(token);
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleSubmit = async () => {
    try {
      await applyLeave(form, token);
      alert("Leave Applied ✅");
      setForm({ from: "", to: "", reason: "" });
      fetchLeaves();
    } catch (err) {
      alert("Error applying leave ❌");
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateLeaveStatus(id, status, token);
      fetchLeaves();
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Leave Management</h2>

          {/* APPLY FORM */}
          <div className="bg-white p-6 rounded-xl shadow mb-8 w-96">
            <h3 className="font-semibold mb-3">Apply Leave</h3>

            <input
              type="date"
              className="border p-2 w-full mb-3 rounded"
              value={form.from}
              onChange={(e)=>setForm({...form,from:e.target.value})}
            />

            <input
              type="date"
              className="border p-2 w-full mb-3 rounded"
              value={form.to}
              onChange={(e)=>setForm({...form,to:e.target.value})}
            />

            <textarea
              className="border p-2 w-full mb-3 rounded"
              placeholder="Reason"
              value={form.reason}
              onChange={(e)=>setForm({...form,reason:e.target.value})}
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white w-full py-2 rounded"
            >
              Apply Leave
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Leave History</h3>

            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Status</th>
                  {role === "admin" && <th>Action</th>}
                </tr>
              </thead>

              <tbody>
                {leaves.map((l) => (
                  <tr key={l._id} className="border-t">
                    <td>{l.from}</td>
                    <td>{l.to}</td>
                    <td>{l.reason}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full ${
                          l.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : l.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>

                    {role === "admin" && (
                      <td className="flex gap-2">
                        <button
                          onClick={()=>handleStatus(l._id,"approved")}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={()=>handleStatus(l._id,"rejected")}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Reject
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}