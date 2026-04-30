import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import EventPopup from "../components/EventPopup";

import LegalEntityForm from "../components/LegalEntityForm";
import LocationForm from "../components/LocationForm";
import BusinessUnitForm from "../components/BusinessUnitForm";
import DepartmentForm from "../components/DepartmentForm";
import JobTitleForm from "../components/JobTitleForm";

import {
  getLegal,
  getLocation,
  getBusiness,
  getDepartments,
  getJobs,
  deleteLegal,
  deleteLocation,
  deleteBusiness,
  deleteDepartment,
  deleteJob,
   getEmployees
} from "../services/api";

export default function Org() {
  const [mainTab, setMainTab] = useState("org");
  const [subTab, setSubTab] = useState("legal");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ ADD THIS

  if (role !== "admin") {
  return (
    <div className="flex items-center justify-center h-screen text-red-500 text-xl">
      Unauthorized 🚫
    </div>
  );
}

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔥 NEW STATES
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   const [employees, setEmployees] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  const fetchEmployees = async () => {
      if (role !== "admin") return; // ✅ safety

  try {
    const res = await getEmployees(token);
    setEmployees(res?.data || []);
  } catch (err) {
    console.error(err);
  }
};

  // 🔥 FETCH
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      let res;

      if (subTab === "legal") res = await getLegal(token);
      if (subTab === "location") res = await getLocation(token);
      if (subTab === "business") res = await getBusiness(token);
      if (subTab === "department") res = await getDepartments(token);
      if (subTab === "job") res = await getJobs(token);

      setData(res?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load data ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchData();

  if (role === "admin") {
    fetchEmployees(); 
  }
}, [subTab, role]);


   useEffect(() => {
  const today = new Date().toDateString();
  const alreadyShown = localStorage.getItem("eventPopup");

  if (alreadyShown !== today) {
    setShowPopup(true);
    localStorage.setItem("eventPopup", today);
  } else {
    setShowPopup(false);
  }
}, []);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    try {
      if (subTab === "legal") await deleteLegal(id, token);
      if (subTab === "location") await deleteLocation(id, token);
      if (subTab === "business") await deleteBusiness(id, token);
      if (subTab === "department") await deleteDepartment(id, token);
      if (subTab === "job") await deleteJob(id, token);

      fetchData();
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // ✅ BIRTHDAY + ANNIVERSARY LOGIC
  const getTodayEvents = () => {
    const today = new Date();
    const m = today.getMonth();
    const d = today.getDate();

    const birthdays = employees.filter(emp => {
      if (!emp.dob) return false;
      const date = new Date(emp.dob);
      return date.getMonth() === m && date.getDate() === d;
    });

    const anniversaries = employees.filter(emp => {
      if (!emp.joiningDate) return false;
      const date = new Date(emp.joiningDate);
      return date.getMonth() === m && date.getDate() === d;
    });

    return { birthdays, anniversaries };
  };

  const { birthdays, anniversaries } = getTodayEvents();


  return (
    <Layout>
       
     {/* POPUP */}
{showPopup && (
  <EventPopup
    birthdays={birthdays}
    anniversaries={anniversaries}
    onClose={() => setShowPopup(false)}
  />
)}    

      {/* MAIN NAV */}
      <div className="flex gap-8 border-b mb-4 text-sm font-medium">

        <button
          onClick={() => setMainTab("org")}
          className={`relative pb-3 transition-all ${
            mainTab === "org"
              ? "text-purple-700"
              : "text-gray-500 hover:text-purple-600"
          }`}
        >
          Org Structure
          {mainTab === "org" && (
            <span className="absolute left-0 bottom-0 w-full h-[3px] bg-purple-600 rounded"></span>
          )}
        </button>

        <button
          onClick={() => setMainTab("employee")}
          className={`relative pb-3 transition-all ${
            mainTab === "employee"
              ? "text-purple-700"
              : "text-gray-500 hover:text-purple-600"
          }`}
        >
          Employee Structure
          {mainTab === "employee" && (
           <span className="absolute left-0 bottom-0 w-full h-[3px] bg-purple-600 rounded"></span>
          )}
        </button>
      </div>

      {/* SUB NAV */}
      <div className="flex gap-6 border-b mb-6 text-sm">
        {mainTab === "org" &&
          ["legal", "business", "location", "department"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`relative pb-2 capitalize ${
                subTab === tab
                  ? "text-purple-700 font-semibold"
                  : "text-gray-500 hover:text-purple-600"
              }`}
            >
              {tab}
              {subTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-purple-600 rounded"></span>
              )}
            </button>
          ))}

        {mainTab === "employee" && (
          <button
            onClick={() => setSubTab("job")}
            className={`relative pb-2 ${
              subTab === "job"
                ? "text-purple-700 font-semibold"
                : "text-gray-500 hover:text-purple-600"
            }`}
          >
            Job Titles
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="bg-white p-6 rounded-xl shadow">

        <Header
          title={subTab.toUpperCase()}
          onAdd={() => setShowForm(true)}
        />

        {/* 🔥 LOADING / ERROR / TABLE */}
        {loading ? (
          <p className="text-center py-6 text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center py-6 text-red-500">{error}</p>
        ) : (
         <Table 
  data={data} 
  subTab={subTab} 
  onDelete={handleDelete} 
  onEdit={(row) => {
    setShowForm(true);
    setEditData(row);   // 👈 NEW
  }} 
/>
        )}

        {/* FORMS */}
      {showForm && (
  <>
    {subTab === "legal" && (
      <LegalEntityForm 
        editData={editData}
        onClose={() => { 
          setShowForm(false); 
          setEditData(null);
          fetchData(); 
        }} 
      />
    )}

    {subTab === "location" && (
      <LocationForm 
        editData={editData}
        onClose={() => { 
          setShowForm(false); 
          setEditData(null);
          fetchData(); 
        }} 
      />
    )}

    {subTab === "business" && (
      <BusinessUnitForm 
        editData={editData}
        onClose={() => { 
          setShowForm(false); 
          setEditData(null);
          fetchData(); 
        }} 
      />
    )}

    {subTab === "department" && (
      <DepartmentForm 
        editData={editData}
        onClose={() => { 
          setShowForm(false); 
          setEditData(null);
          fetchData(); 
        }} 
      />
    )}

    {subTab === "job" && (
      <JobTitleForm 
        editData={editData}
        onClose={() => { 
          setShowForm(false); 
          setEditData(null);
          fetchData(); 
        }} 
      />
    )}
  </>
)}

      </div>
    </Layout>
  );
}


/* 🔥 TABLE */
function Table({ data, subTab, onDelete, onEdit }) {
  const columnsMap = {
    legal: ["entityName","legalName","city"],
    location: ["name","city","state"],
    business: ["name","description"],
    department: ["name","description"],
    job: ["title","department"]
  };

  const cols = columnsMap[subTab];

  return (
    <table className="w-full border rounded-xl mt-4 overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {cols.map(c => (
            <th key={c} className="p-3 text-left capitalize">{c}</th>
          ))}
          <th className="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={cols.length + 1} className="p-6 text-center text-gray-500">
              🚫 No data found
            </td>
          </tr>
        ) : (
          data.map(row => (
            <tr key={row._id} className="border-t hover:bg-gray-50 transition">
              {cols.map(c => (
                <td key={c} className="p-3">{row[c]}</td>
              ))}

             <td className="p-3 flex gap-3">
  {/* EDIT */}
  <button
    onClick={() => onEdit(row)}
    className="text-blue-600 hover:text-blue-800 transition"
  >
    Edit
  </button>

  {/* DELETE */}
  <button
    onClick={() => onDelete(row._id)}
    className="text-red-600 hover:text-red-800 transition"
  >
    Delete
  </button>
</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

/* 🔥 HEADER */
function Header({ title, onAdd }) {
  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <button
        onClick={onAdd}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
      >
        + Add
      </button>
    </div>
  );
}