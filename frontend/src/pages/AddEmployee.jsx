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

  const handleSubmit = async () => {
    try {
      await addEmployee(form, token);
      alert("Employee Added ✅");
      navigate("/employees");
    } catch (err) {
      alert("Error ❌");
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

            {/* 🔥 PRIMARY */}
            <Section title="Primary Details">
              <Input label="Employee Number" value={form.employeeNumber}
                onChange={(v)=>setForm({...form, employeeNumber:v})}
              />
              <Input label="First Name" value={form.firstName}
                onChange={(v)=>setForm({...form, firstName:v})}
              />
              <Input label="Middle Name" value={form.middleName}
                onChange={(v)=>setForm({...form, middleName:v})}
              />
              <Input label="Last Name" value={form.lastName}
                onChange={(v)=>setForm({...form, lastName:v})}
              />
              <Input label="Display Name" value={form.displayName}
                onChange={(v)=>setForm({...form, displayName:v})}
              />
              <Input label="Full Name" value={form.fullName}
                onChange={(v)=>setForm({...form, fullName:v})}
              />
              <Input label="Nationality" value={form.nationality}
                onChange={(v)=>setForm({...form, nationality:v})}
              />
              <Input label="Blood Group" value={form.bloodGroup}
                onChange={(v)=>setForm({...form, bloodGroup:v})}
              />
              <Input label="DOB" value={form.dob}
                onChange={(v)=>setForm({...form, dob:v})}
              />
              <Input label="Gender" value={form.gender}
                onChange={(v)=>setForm({...form, gender:v})}
              />
              <Input label="Marital Status" value={form.maritalStatus}
                onChange={(v)=>setForm({...form, maritalStatus:v})}
              />
            </Section>

            {/* 🔥 JOB */}
            <Section title="Job Details">
              <Input label="Employment Status" value={form.employmentStatus}
                onChange={(v)=>setForm({...form, employmentStatus:v})}
              />
              <Input label="Date Joined" value={form.dateJoined}
                onChange={(v)=>setForm({...form, dateJoined:v})}
              />
              <Input label="Probation End" value={form.probationEndDate}
                onChange={(v)=>setForm({...form, probationEndDate:v})}
              />
              <Input label="Reporting Manager" value={form.reportingManager}
                onChange={(v)=>setForm({...form, reportingManager:v})}
              />
              <Input label="Job Title" value={form.jobTitle}
                onChange={(v)=>setForm({...form, jobTitle:v})}
              />
              <Input label="Department" value={form.department}
                onChange={(v)=>setForm({...form, department:v})}
              />
            </Section>

            {/* 🔥 CONTACT */}
            <Section title="Contact Details">
              <Input label="Mobile" value={form.mobilePhone}
                onChange={(v)=>setForm({...form, mobilePhone:v})}
              />
              <Input label="Personal Email" value={form.personalEmail}
                onChange={(v)=>setForm({...form, personalEmail:v})}
              />
              <Input label="Work Email" value={form.workEmail}
                onChange={(v)=>setForm({...form, workEmail:v})}
              />
            </Section>

            {/* 🔥 BUTTON */}
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

/* 🔥 COMPONENTS */
function Input({ label, value, onChange }) {
  return (
    <div className="mb-3">
      <p className="text-sm">{label}</p>
      <input
        className="border p-2 w-full rounded"
        value={value || ""}
        onChange={(e)=>onChange(e.target.value)}
      />
    </div>
  );
}

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