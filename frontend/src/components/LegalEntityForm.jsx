import { useState, useEffect } from "react";
import { addLegal, updateLegal } from "../services/api";

export default function LegalEntityForm({ onClose, editData }) {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    entityName: "",
    legalName: "",
    cin: "",
    date: "",
    type: "",
    sector: "Manufacturing Industry",
    nature: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "India"
  });

  console.log("EDIT DATA:", editData);

  // ✅ AUTO FILL FORM WHEN EDITING
  useEffect(() => {
    if (editData) {
      setForm({
        entityName: editData.entityName || "",
        legalName: editData.legalName || "",
        cin: editData.cin || "",
        date: editData.date ? editData.date.slice(0, 10) : "",
        type: editData.type || "",
        sector: editData.sector || "Manufacturing Industry",
        nature: editData.nature || "",
        address1: editData.address1 || "",
        address2: editData.address2 || "",
        city: editData.city || "",
        state: editData.state || "",
        zip: editData.zip || "",
        country: editData.country || "India"
      });
    }
  }, [editData]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // ✅ HANDLE ADD + UPDATE
  const handleSubmit = async () => {
    try {
      if (editData) {
        await updateLegal(editData._id, form, token);
        alert("Updated Successfully ✅");
      } else {
        await addLegal(form, token);
        alert("Legal Entity Saved ✅");
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Save failed ❌");
    }
  };

  const inputClass =
    "border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500";

  const labelClass = "text-sm font-medium text-gray-600";

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-xl p-6">

        {/* HEADER */}
        <h2 className="text-xl font-semibold mb-6">
          {editData ? "Edit Legal Entity" : "New Legal Entity"}
        </h2>

        {/* SECTION */}
        <div className="mb-4 text-gray-700 font-medium">
          Entity Details
        </div>

        {/* COUNTRY */}
        <div className="mb-4">
          <label className={labelClass}>Country</label>
          <select
            className={inputClass}
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
          >
            <option>India</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className={labelClass}>Entity Name *</label>
            <input
              className={inputClass}
              value={form.entityName}
              onChange={(e) => handleChange("entityName", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Legal Name *</label>
            <input
              className={inputClass}
              value={form.legalName}
              onChange={(e) => handleChange("legalName", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>CIN *</label>
            <input
              className={inputClass}
              value={form.cin}
              onChange={(e) => handleChange("cin", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Date *</label>
            <input
              type="date"
              className={inputClass}
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Type *</label>
            <input
              className={inputClass}
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Sector *</label>
            <select
              className={inputClass}
              value={form.sector}
              onChange={(e) => handleChange("sector", e.target.value)}
            >
              <option>Manufacturing Industry</option>
              <option>IT</option>
              <option>Finance</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Nature *</label>
            <input
              className={inputClass}
              value={form.nature}
              onChange={(e) => handleChange("nature", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Address 1 *</label>
            <input
              className={inputClass}
              value={form.address1}
              onChange={(e) => handleChange("address1", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Address 2</label>
            <input
              className={inputClass}
              value={form.address2}
              onChange={(e) => handleChange("address2", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>City *</label>
            <input
              className={inputClass}
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>State *</label>
            <input
              className={inputClass}
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Zip *</label>
            <input
              className={inputClass}
              value={form.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            {editData ? "Update" : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
}