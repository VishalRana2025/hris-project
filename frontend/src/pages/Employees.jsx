import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  getEmployees,
  deleteEmployee,
  updateEmployee
} from "../services/api";

export default function Employees() {
  const token = localStorage.getItem("token");

  const [employees, setEmployees] = useState([]);
  const [editEmp, setEditEmp] = useState(null);



// FETCH EMPLOYEES
const fetchEmployees = async () => {
  try {
    const res = await getEmployees(token);
    setEmployees(res.data);
  } catch (err) {
    console.log("FETCH ERROR:", err);
  }
};

useEffect(() => {
  fetchEmployees();
}, []);

// DELETE
const handleDelete = async (id) => {
  if (!window.confirm("Delete this employee?")) return;

  try {
    await deleteEmployee(id, token);
    fetchEmployees();
  } catch (err) {
    console.log("DELETE ERROR:", err);
  }
};

// SAVE EDIT
const handleSave = async () => {
  try {
    await updateEmployee(editEmp._id, editEmp, token);
    setEditEmp(null);
    fetchEmployees();
  } catch (err) {
    console.log("UPDATE ERROR:", err);
  }
};

  return (
    <div className="flex">
      <Sidebar />

     <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Employee Management</h2>

          {/* TABLE */}
          <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Department</th>
                  <th className="p-2">Job Title</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id} className="border-t text-center">
                    <td className="p-2">{emp.fullName}</td>
                    <td className="p-2">{emp.workEmail}</td>
                    <td className="p-2">{emp.department}</td>
                    <td className="p-2">{emp.jobTitle}</td>

                    <td className="p-2 flex justify-center gap-2">
                      <button
                        onClick={() => setEditEmp(emp)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EDIT MODAL */}
       {editEmp && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

    <div className="bg-white p-6 rounded-xl w-[1000px] max-h-[90vh] overflow-y-auto">

      <h2 className="text-xl font-bold mb-6">Edit Employee</h2>

      {/* 🔥 PRIMARY */}
      <Section title="Primary Details">
        <Input label="Employee Number" value={editEmp.employeeNumber}
          onChange={(v) => setEditEmp({ ...editEmp, employeeNumber: v })}
        />
        <Input label="First Name" value={editEmp.firstName}
          onChange={(v) => setEditEmp({ ...editEmp, firstName: v })}
        />
        <Input label="Middle Name" value={editEmp.middleName}
          onChange={(v) => setEditEmp({ ...editEmp, middleName: v })}
        />
        <Input label="Last Name" value={editEmp.lastName}
          onChange={(v) => setEditEmp({ ...editEmp, lastName: v })}
        />
        <Input label="Display Name" value={editEmp.displayName}
          onChange={(v) => setEditEmp({ ...editEmp, displayName: v })}
        />
        <Input label="Full Name" value={editEmp.fullName}
          onChange={(v) => setEditEmp({ ...editEmp, fullName: v })}
        />
        <Input label="Nationality" value={editEmp.nationality}
          onChange={(v) => setEditEmp({ ...editEmp, nationality: v })}
        />
        <Input label="Blood Group" value={editEmp.bloodGroup}
          onChange={(v) => setEditEmp({ ...editEmp, bloodGroup: v })}
        />
        <Input label="DOB" value={editEmp.dob}
          onChange={(v) => setEditEmp({ ...editEmp, dob: v })}
        />
        <Input label="Gender" value={editEmp.gender}
          onChange={(v) => setEditEmp({ ...editEmp, gender: v })}
        />
        <Input label="Marital Status" value={editEmp.maritalStatus}
          onChange={(v) => setEditEmp({ ...editEmp, maritalStatus: v })}
        />
      </Section>

      {/* 🔥 JOB */}
      <Section title="Job Details">
        <Input label="Employment Status" value={editEmp.employmentStatus}
          onChange={(v) => setEditEmp({ ...editEmp, employmentStatus: v })}
        />
        <Input label="Date Joined" value={editEmp.dateJoined}
          onChange={(v) => setEditEmp({ ...editEmp, dateJoined: v })}
        />
        <Input label="Probation End" value={editEmp.probationEndDate}
          onChange={(v) => setEditEmp({ ...editEmp, probationEndDate: v })}
        />
        <Input label="Reporting Manager" value={editEmp.reportingManager}
          onChange={(v) => setEditEmp({ ...editEmp, reportingManager: v })}
        />
        <Input label="Job Title" value={editEmp.jobTitle}
          onChange={(v) => setEditEmp({ ...editEmp, jobTitle: v })}
        />
        <Input label="Social Designation" value={editEmp.socialDesignation}
          onChange={(v) => setEditEmp({ ...editEmp, socialDesignation: v })}
        />
        <Input label="Department" value={editEmp.department}
          onChange={(v) => setEditEmp({ ...editEmp, department: v })}
        />
        <Input label="Band" value={editEmp.band}
          onChange={(v) => setEditEmp({ ...editEmp, band: v })}
        />
        <Input label="Pay Grade" value={editEmp.payGrade}
          onChange={(v) => setEditEmp({ ...editEmp, payGrade: v })}
        />
        <Input label="Shift Policy" value={editEmp.shiftPolicy}
          onChange={(v) => setEditEmp({ ...editEmp, shiftPolicy: v })}
        />
        <Input label="Last Working Day" value={editEmp.lastWorkingDay}
          onChange={(v) => setEditEmp({ ...editEmp, lastWorkingDay: v })}
        />
      </Section>

      {/* 🔥 CONTACT */}
      <Section title="Contact Details">
        <Input label="Mobile Phone" value={editEmp.mobilePhone}
          onChange={(v) => setEditEmp({ ...editEmp, mobilePhone: v })}
        />
        <Input label="Personal Email" value={editEmp.personalEmail}
          onChange={(v) => setEditEmp({ ...editEmp, personalEmail: v })}
        />
        <Input label="Work Email" value={editEmp.workEmail}
          onChange={(v) => setEditEmp({ ...editEmp, workEmail: v })}
        />
      </Section>

      {/* 🔥 CURRENT ADDRESS */}
      <Section title="Current Address">
        <Input label="Line 1" value={editEmp.currentAddress?.line1}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              currentAddress: { ...editEmp.currentAddress, line1: v }
            })
          }
        />
        <Input label="Line 2" value={editEmp.currentAddress?.line2}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              currentAddress: { ...editEmp.currentAddress, line2: v }
            })
          }
        />
        <Input label="City" value={editEmp.currentAddress?.city}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              currentAddress: { ...editEmp.currentAddress, city: v }
            })
          }
        />
        <Input label="State" value={editEmp.currentAddress?.state}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              currentAddress: { ...editEmp.currentAddress, state: v }
            })
          }
        />
        <Input label="Zip Code" value={editEmp.currentAddress?.zipCode}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              currentAddress: { ...editEmp.currentAddress, zipCode: v }
            })
          }
        />
      </Section>

      {/* 🔥 PERMANENT ADDRESS */}
      <Section title="Permanent Address">
        <Input label="Line 1" value={editEmp.permanentAddress?.line1}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              permanentAddress: { ...editEmp.permanentAddress, line1: v }
            })
          }
        />
        <Input label="Line 2" value={editEmp.permanentAddress?.line2}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              permanentAddress: { ...editEmp.permanentAddress, line2: v }
            })
          }
        />
        <Input label="City" value={editEmp.permanentAddress?.city}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              permanentAddress: { ...editEmp.permanentAddress, city: v }
            })
          }
        />
        <Input label="State" value={editEmp.permanentAddress?.state}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              permanentAddress: { ...editEmp.permanentAddress, state: v }
            })
          }
        />
        <Input label="Country" value={editEmp.permanentAddress?.country}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              permanentAddress: { ...editEmp.permanentAddress, country: v }
            })
          }
        />
        <Input label="Zip Code" value={editEmp.permanentAddress?.zipCode}
          onChange={(v) =>
            setEditEmp({
              ...editEmp,
              permanentAddress: { ...editEmp.permanentAddress, zipCode: v }
            })
          }
        />
      </Section>

      {/* 🔥 OTHER */}
      <Section title="Other Details">
        <Input label="Cab Facility" value={editEmp.cabFacility ? "Yes" : "No"}
          onChange={(v) => setEditEmp({ ...editEmp, cabFacility: v === "Yes" })}
        />
        <Input label="Aadhaar" value={editEmp.aadhaarNumber}
          onChange={(v) => setEditEmp({ ...editEmp, aadhaarNumber: v })}
        />
        <Input label="PAN" value={editEmp.panNumber}
          onChange={(v) => setEditEmp({ ...editEmp, panNumber: v })}
        />
      </Section>

      {/* BUTTONS */}
      <div className="flex justify-end gap-4 mt-6">
        <button onClick={() => setEditEmp(null)} className="bg-gray-400 px-4 py-2 text-white rounded">
          Cancel
        </button>

        <button onClick={handleSave} className="bg-green-600 px-4 py-2 text-white rounded">
          Save Changes
        </button>
      </div>

    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h4 className="font-semibold mb-3">{title}</h4>
      <div className="grid grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}