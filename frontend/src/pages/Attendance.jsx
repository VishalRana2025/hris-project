import { useEffect, useState } from "react";
import { getAttendanceHistory } from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Attendance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔥 CALCULATE WORKING HOURS
  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "—";

    try {
      const today = new Date().toDateString();

      const inTime = new Date(`${today} ${checkIn}`);
      const outTime = new Date(`${today} ${checkOut}`);

      const diff = outTime - inTime;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours}h ${minutes}m`;
    } catch {
      return "—";
    }
  };

  // ✅ Fetch attendance
  const fetchAttendance = async () => {
    try {
      const res = await getAttendanceHistory(token);
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load attendance ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAttendance();
  }, [token]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Attendance Dashboard
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <>
              {/* SUMMARY CARDS */}
              <div className="grid grid-cols-3 gap-6 mb-6">

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-gray-500">Total Records</p>
                  <p className="text-3xl font-bold">{data.length}</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-gray-500">Checked In</p>
                  <p className="text-3xl font-bold text-green-600">
                    {data.filter(d => d.checkIn).length}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-gray-500">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {data.filter(d => !d.checkOut).length}
                  </p>
                </div>

              </div>

              {data.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  No attendance records found 📅
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-6">

                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-700">
                      Attendance History
                    </h3>

                    <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
                      {data.length} Records
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">

                      <thead>
                        <tr className="bg-gray-100 text-gray-600">
                          <th className="p-3">Date</th>
                          <th className="p-3">Check In</th>
                          <th className="p-3">Check Out</th>
                          <th className="p-3">Hours</th> {/* ✅ NEW */}
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((item) => (
                          <tr
                            key={item._id}
                            className="border-b hover:bg-gray-50 transition"
                          >
                            <td className="p-3 font-medium text-gray-700">
                              {item.date}
                            </td>

                            <td className="p-3">
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                {item.checkIn}
                              </span>
                            </td>

                            <td className="p-3">
                              {item.checkOut ? (
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                  {item.checkOut}
                                </span>
                              ) : (
                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                  Pending
                                </span>
                              )}
                            </td>

                            {/* 🔥 HOURS COLUMN */}
                            <td className="p-3">
                              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                {calculateHours(item.checkIn, item.checkOut)}
                              </span>
                            </td>

                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}