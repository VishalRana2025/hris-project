import { useState, useEffect } from "react";
import { addLocation, updateLocation } from "../services/api";

export default function LocationForm({ onClose, editData }) {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    timezone: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
    country: "India",
    state: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    description: ""
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // ✅ PREFILL DATA (EDIT MODE)
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        timezone: editData.timezone || "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
        country: editData.country || "India",
        state: editData.state || "",
        address1: editData.address1 || "",
        address2: editData.address2 || "",
        city: editData.city || "",
        zip: editData.zip || "",
        description: editData.description || ""
      });
    }
  }, [editData]);

  const input =
    "border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-purple-500 outline-none";

  const label = "text-sm text-gray-600 mb-1";

  // ✅ SUBMIT (ADD + UPDATE)
  const handleSubmit = async () => {
    try {
      if (!form.name) {
        return alert("Name is required ❗");
      }

      if (editData) {
        await updateLocation(editData._id, form, token);
        alert("Updated Successfully ✅");
      } else {
        await addLocation(form, token);
        alert("Location Added ✅");
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">

      {/* RIGHT PANEL */}
      <div className="w-[500px] bg-white h-full p-6 overflow-y-auto shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            {editData ? "Edit Location" : "Add Location"}
          </h2>
          <button onClick={onClose} className="text-gray-500 text-xl">×</button>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          {/* NAME */}
          <div>
            <label className={label}>Name *</label>
            <input
              className={input}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* TIMEZONE */}
          <div>
            <label className={label}>Timezone</label>
            <select
              className={input}
              value={form.timezone}
              onChange={(e) => handleChange("timezone", e.target.value)}
            >
              <option>(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
            </select>
          </div>

          {/* COUNTRY + STATE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Country</label>
              <select
                className={input}
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
              >
                <option>India</option>
              </select>
            </div>

            <div>
              <label className={label}>State</label>
              <input
                className={input}
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Address Line 1</label>
              <input
                className={input}
                value={form.address1}
                onChange={(e) => handleChange("address1", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Address Line 2</label>
              <input
                className={input}
                value={form.address2}
                onChange={(e) => handleChange("address2", e.target.value)}
              />
            </div>
          </div>

          {/* CITY + ZIP */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>City</label>
              <input
                className={input}
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Zip</label>
              <input
                className={input}
                value={form.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className={label}>Description</label>
            <textarea
              rows="4"
              className={input}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            {editData ? "Update" : "Add"}
          </button>
        </div>

      </div>
    </div>
  );
}