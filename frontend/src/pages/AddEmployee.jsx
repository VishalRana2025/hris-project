import { useState } from "react";
import { addEmployee } from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    employeeNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    displayName: "",
    fullName: "",
    nationality: "",
    bloodGroup: "",
    dob: "",
    gender: "",
    maritalStatus: "",

    employmentStatus: "",
    dateJoined: "",
    probationEndDate: "",
    reportingManager: "",
    jobTitle: "",
    socialDesignation: "",
    department: "",
    band: "",
    payGrade: "",
    shiftPolicy: "",
    lastWorkingDay: "",

    mobilePhone: "",
    personalEmail: "",
    workEmail: "",

    currentAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipCode: ""
    },

    permanentAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      zipCode: ""
    },

    cabFacility: false,
    aadhaarNumber: "",
    panNumber: ""
  });

  // 🔥 SAFE DATE FUNCTION
  const safeDate = (value) => {
    if (!value) return null;
    const d = new Date(value.toString().trim());
    return isNaN(d.getTime()) ? null : d;
  };

  // 🔥 FORMAT DATE FOR INPUT DISPLAY
  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().split("T")[0];
  };

  // 🔥 PREPARE DATA
  const prepareData = () => {
    return {
      ...form,
      fullName:
        form.fullName ||
        `${form.firstName || ""} ${form.lastName || ""}`.trim(),

      dob: safeDate(form.dob),
      dateJoined: safeDate(form.dateJoined),
      probationEndDate: safeDate(form.probationEndDate),
      lastWorkingDay: safeDate(form.lastWorkingDay),

      currentAddress: form.currentAddress || {},
      permanentAddress: form.permanentAddress || {},

      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      personalEmail: form.personalEmail.trim()
    };
  };

  const handleSubmit = async () => {
    try {
      if (!form.firstName || !form.personalEmail) {
        return alert("First Name & Email required");
      }

      const payload = prepareData();

      console.log("🚀 SENDING:", payload);

      await addEmployee(payload, token);

      alert("Employee Added ✅");
      navigate("/employees");

    } catch (err) {
      console.log("❌ ERROR:", err);
      alert(err.response?.data?.msg || "Error ❌");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Add Employee</h2>

          <div className="bg-white p-6 rounded-xl shadow max-w-6xl">

            {/* PRIMARY */}
            <Section title="Primary Details">
              <Input label="Employee Number" value={form.employeeNumber}
                onChange={(v)=>setForm({...form, employeeNumber:v})}
              />
              <Input label="First Name" value={form.firstName}
                onChange={(v)=>setForm({...form, firstName:v})}
              />
              <Input label="Last Name" value={form.lastName}
                onChange={(v)=>setForm({...form, lastName:v})}
              />
              <Input label="Full Name" value={form.fullName}
                onChange={(v)=>setForm({...form, fullName:v})}
              />

              <Input
                label="DOB"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                value={formatDate(form.dob)}
                onChange={(v)=>setForm({...form, dob:v})}
              />
            </Section>

            {/* JOB */}
            <Section title="Job Details">
              <Input label="Department" value={form.department}
                onChange={(v)=>setForm({...form, department:v})}
              />
              <Input label="Job Title" value={form.jobTitle}
                onChange={(v)=>setForm({...form, jobTitle:v})}
              />

              <Input
                label="Date Joined"
                type="date"
                value={formatDate(form.dateJoined)}
                onChange={(v)=>setForm({...form, dateJoined:v})}
              />

              <Input
                label="Probation End Date"
                type="date"
                value={formatDate(form.probationEndDate)}
                onChange={(v)=>setForm({...form, probationEndDate:v})}
              />

              <Input
                label="Last Working Day"
                type="date"
                value={formatDate(form.lastWorkingDay)}
                onChange={(v)=>setForm({...form, lastWorkingDay:v})}
              />
            </Section>

            {/* CONTACT */}
            <Section title="Contact Details">
              <Input label="Mobile" value={form.mobilePhone}
                onChange={(v)=>setForm({...form, mobilePhone:v})}
              />
              <Input label="Email" value={form.personalEmail}
                onChange={(v)=>setForm({...form, personalEmail:v})}
              />
            </Section>

            {/* CAB */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={form.cabFacility}
                onChange={(e) =>
                  setForm({ ...form, cabFacility: e.target.checked })
                }
              />
              <label>Cab Facility</label>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Save Employee
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// 🔹 INPUT COMPONENT
function Input({ label, value, onChange, type = "text", ...props }) {
  return (
    <div className="mb-3">
      <p className="text-sm">{label}</p>
      <input
        type={type}
        className="border p-2 w-full rounded"
        value={value || ""}
        onChange={(e)=>onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}

// 🔹 SECTION COMPONENT
function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}