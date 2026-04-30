import { useEffect, useState } from "react";
import axios from "axios";
import { getMyEmployee } from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { updateEmployee } from "../services/api";


export default function Profile() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ ROLE

const [user, setUser] = useState({
  name: localStorage.getItem("name"),
  email: localStorage.getItem("email"),
  role: localStorage.getItem("role")
});
  const [employee, setEmployee] = useState(null);
  const [file, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // FETCH PROFILE
  const fetchProfile = async () => {
  try {
    const res = await getMyEmployee(token);

    console.log("EMPLOYEE DATA:", res.data); // DEBUG

    setEmployee(res.data);

  } catch (err) {
    console.log("PROFILE ERROR:", err);
  }
};

  useEffect(() => {
    if (!token) return;
    fetchProfile();
  }, [token]);

  // SAVE PROFILE (ADMIN ONLY)
 const handleSave = async () => {
  try {
    await updateEmployee(employee._id, employee, token);

    alert("Profile updated ✅");
    setEditMode(false);

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    alert("Update failed ❌");
  }
};

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">My Profile</h2>

          {/* USER CARD */}
          <div className="bg-white p-6 rounded-xl shadow mb-6 flex gap-6">
            <div className="w-20 h-20 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-blue-600 mt-1">{user.role}</p>
            </div>
          </div>

          {/* EMPLOYEE */}
          {!employee ? (
  <p className="text-gray-500">Loading employee data...</p>
) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* PRIMARY */}
              <Section title="Primary Details" role={role} setEditMode={setEditMode}>
                <Field label="First Name" value={employee.firstName}
                  editable={editMode && role === "admin"}
                  onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
                />
                <Field label="Last Name" value={employee.lastName}
                  editable={editMode && role === "admin"}
                  onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
                />
                <Field label="Gender" value={employee.gender}
                  editable={editMode && role === "admin"}
                  onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                />
                <Field label="DOB" value={formatDate(employee.dob)} />
              </Section>

              {/* CONTACT */}
              <Section title="Contact Details" role={role} setEditMode={setEditMode}>
                <Field label="Work Email" value={employee.workEmail} />
                <Field label="Mobile" value={employee.mobilePhone}
                  editable={editMode && role === "admin"}
                  onChange={(e) => setEmployee({ ...employee, mobilePhone: e.target.value })}
                />
              </Section>

              {/* JOB */}
              <Section title="Job Details" role={role} setEditMode={setEditMode}>
                <Field label="Employee Number" value={employee.employeeNumber} />
                <Field label="Job Title" value={employee.jobTitle}
                  editable={editMode && role === "admin"}
                  onChange={(e) => setEmployee({ ...employee, jobTitle: e.target.value })}
                />
                <Field label="Department" value={employee.department}
                  editable={editMode && role === "admin"}
                  onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
                />
              </Section>

              {/* ADDRESS */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-4">Addresses</h3>

                <div className="grid grid-cols-1 gap-6">

                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">Current Address</h4>
                    <Field label="City" value={employee.currentAddress?.city}
                      editable={editMode && role === "admin"}
                      onChange={(e) =>
                        setEmployee({
                          ...employee,
                          currentAddress: { ...employee.currentAddress, city: e.target.value }
                        })
                      }
                    />
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">Permanent Address</h4>
                    <Field label="City" value={employee.permanentAddress?.city}
                      editable={editMode && role === "admin"}
                      onChange={(e) =>
                        setEmployee({
                          ...employee,
                          permanentAddress: { ...employee.permanentAddress, city: e.target.value }
                        })
                      }
                    />
                  </div>

                </div>
              </div>

              {/* OTHER */}
              <Section title="Other Details" role={role} setEditMode={setEditMode}>
                <Field label="Aadhaar" value={employee.aadhaarNumber}
                  editable={editMode && role === "admin"}
                  onChange={(e) => setEmployee({ ...employee, aadhaarNumber: e.target.value })}
                />
                <Field label="PAN" value={employee.panNumber}
                  editable={editMode && role === "admin"}
                  onChange={(e) => setEmployee({ ...employee, panNumber: e.target.value })}
                />
              </Section>

            </div>
          )}

          {/* SAVE BUTTON */}
          {role === "admin" && editMode && (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded mt-6"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// SECTION
function Section({ title, children, role, setEditMode }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>

        {role === "admin" && (
          <button
            onClick={() => setEditMode(true)}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

// FIELD
function Field({ label, value, editable, onChange }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>

      {editable ? (
        <input
          value={value || ""}
          onChange={onChange}
          className="border p-1 rounded w-full text-sm"
        />
      ) : (
        <p className="font-medium">{value || "-"}</p>
      )}
    </div>
  );
}

// DATE
function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
}