import { useState } from "react";
import { addEmployee } from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

const [form, setForm] = useState({
  email: "", // 🔥 ADD THIS (MOST IMPORTANT)

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

    // 🔥 IMPORTANT: fallback logic
    email: form.workEmail.toLowerCase().trim(),

    fullName:
      form.fullName ||
      `${form.firstName || ""} ${form.middleName || ""} ${form.lastName || ""}`.trim(),

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
     if (!form.firstName || !form.workEmail) {
  return alert("First Name & Work Email required");
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

            {/* PRIMARY DETAILS */}
            <Section title="Primary Details">
              
              <Input label="Employee Number" value={form.employeeNumber}
                onChange={(v) => setForm({ ...form, employeeNumber: v })}
              />
              <Input label="First Name" value={form.firstName}
                onChange={(v) => setForm({ ...form, firstName: v })}
              />
              <Input label="Middle Name" value={form.middleName}
                onChange={(v) => setForm({ ...form, middleName: v })}
              />
              <Input label="Last Name" value={form.lastName}
                onChange={(v) => setForm({ ...form, lastName: v })}
              />
              <Input label="Display Name" value={form.displayName}
                onChange={(v) => setForm({ ...form, displayName: v })}
              />
              <Input label="Full Name" value={form.fullName}
                onChange={(v) => setForm({ ...form, fullName: v })}
              />
              <Input label="Nationality" value={form.nationality}
                onChange={(v) => setForm({ ...form, nationality: v })}
              />
              <Input label="Blood Group" value={form.bloodGroup}
                onChange={(v) => setForm({ ...form, bloodGroup: v })}
              />
              <Input
                label="DOB"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                value={formatDate(form.dob)}
                onChange={(v) => setForm({ ...form, dob: v })}
              />
              <Input label="Gender" value={form.gender}
                onChange={(v) => setForm({ ...form, gender: v })}
              />
              <Input label="Marital Status" value={form.maritalStatus}
                onChange={(v) => setForm({ ...form, maritalStatus: v })}
              />
            </Section>

            {/* JOB DETAILS */}
            <Section title="Job Details">
              <Input label="Employment Status" value={form.employmentStatus}
                onChange={(v) => setForm({ ...form, employmentStatus: v })}
              />
              <Input
                label="Date Joined"
                type="date"
                value={formatDate(form.dateJoined)}
                onChange={(v) => setForm({ ...form, dateJoined: v })}
              />
              <Input
                label="Probation End Date"
                type="date"
                value={formatDate(form.probationEndDate)}
                onChange={(v) => setForm({ ...form, probationEndDate: v })}
              />
              <Input label="Reporting Manager" value={form.reportingManager}
                onChange={(v) => setForm({ ...form, reportingManager: v })}
              />
              <Input label="Job Title" value={form.jobTitle}
                onChange={(v) => setForm({ ...form, jobTitle: v })}
              />
              <Input label="Social Designation" value={form.socialDesignation}
                onChange={(v) => setForm({ ...form, socialDesignation: v })}
              />
              <Input label="Department" value={form.department}
                onChange={(v) => setForm({ ...form, department: v })}
              />
              <Input label="Band" value={form.band}
                onChange={(v) => setForm({ ...form, band: v })}
              />
              <Input label="Pay Grade" value={form.payGrade}
                onChange={(v) => setForm({ ...form, payGrade: v })}
              />
              <Input label="Shift Policy" value={form.shiftPolicy}
                onChange={(v) => setForm({ ...form, shiftPolicy: v })}
              />
              <Input
                label="Last Working Day"
                type="date"
                value={formatDate(form.lastWorkingDay)}
                onChange={(v) => setForm({ ...form, lastWorkingDay: v })}
              />
            </Section>

            {/* CONTACT DETAILS */}
            <Section title="Contact Details">
              <Input label="Mobile Phone" value={form.mobilePhone}
                onChange={(v) => setForm({ ...form, mobilePhone: v })}
              />
              <Input label="Personal Email" value={form.personalEmail}
                onChange={(v) => setForm({ ...form, personalEmail: v })}
              />
              <Input label="Work Email" value={form.workEmail}
                onChange={(v) => setForm({ ...form, workEmail: v })}
              />
            </Section>

            {/* CURRENT ADDRESS */}
            <Section title="Current Address">
              <Input label="Line 1" value={form.currentAddress?.line1}
                onChange={(v) =>
                  setForm({
                    ...form,
                    currentAddress: { ...form.currentAddress, line1: v }
                  })
                }
              />
              <Input label="Line 2" value={form.currentAddress?.line2}
                onChange={(v) =>
                  setForm({
                    ...form,
                    currentAddress: { ...form.currentAddress, line2: v }
                  })
                }
              />
              <Input label="City" value={form.currentAddress?.city}
                onChange={(v) =>
                  setForm({
                    ...form,
                    currentAddress: { ...form.currentAddress, city: v }
                  })
                }
              />
              <Input label="State" value={form.currentAddress?.state}
                onChange={(v) =>
                  setForm({
                    ...form,
                    currentAddress: { ...form.currentAddress, state: v }
                  })
                }
              />
              <Input label="Zip Code" value={form.currentAddress?.zipCode}
                onChange={(v) =>
                  setForm({
                    ...form,
                    currentAddress: { ...form.currentAddress, zipCode: v }
                  })
                }
              />
            </Section>

            {/* PERMANENT ADDRESS */}
            <Section title="Permanent Address">
              <Input label="Line 1" value={form.permanentAddress?.line1}
                onChange={(v) =>
                  setForm({
                    ...form,
                    permanentAddress: { ...form.permanentAddress, line1: v }
                  })
                }
              />
              <Input label="Line 2" value={form.permanentAddress?.line2}
                onChange={(v) =>
                  setForm({
                    ...form,
                    permanentAddress: { ...form.permanentAddress, line2: v }
                  })
                }
              />
              <Input label="City" value={form.permanentAddress?.city}
                onChange={(v) =>
                  setForm({
                    ...form,
                    permanentAddress: { ...form.permanentAddress, city: v }
                  })
                }
              />
              <Input label="State" value={form.permanentAddress?.state}
                onChange={(v) =>
                  setForm({
                    ...form,
                    permanentAddress: { ...form.permanentAddress, state: v }
                  })
                }
              />
              <Input label="Country" value={form.permanentAddress?.country}
                onChange={(v) =>
                  setForm({
                    ...form,
                    permanentAddress: { ...form.permanentAddress, country: v }
                  })
                }
              />
              <Input label="Zip Code" value={form.permanentAddress?.zipCode}
                onChange={(v) =>
                  setForm({
                    ...form,
                    permanentAddress: { ...form.permanentAddress, zipCode: v }
                  })
                }
              />
            </Section>

            {/* OTHER DETAILS */}
            <Section title="Other Details">
              <div className="flex items-center gap-2 mt-2 mb-3">
                <input
                  type="checkbox"
                  checked={form.cabFacility}
                  onChange={(e) =>
                    setForm({ ...form, cabFacility: e.target.checked })
                  }
                />
                <label className="text-sm">Cab Facility</label>
              </div>
              <Input label="Aadhaar Number" value={form.aadhaarNumber}
                onChange={(v) => setForm({ ...form, aadhaarNumber: v })}
              />
              <Input label="PAN Number" value={form.panNumber}
                onChange={(v) => setForm({ ...form, panNumber: v })}
              />
            </Section>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
      <label className="text-sm block mb-1">{label}</label>
      <input
        type={type}
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}

// 🔹 SECTION COMPONENT
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-lg mb-3 pb-2 border-b">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}