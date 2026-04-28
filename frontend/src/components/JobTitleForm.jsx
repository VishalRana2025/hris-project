import { useState, useEffect } from "react";
import { addJob, updateJob } from "../services/api";

export default function JobTitleForm({ onClose, editData }) {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    department: "",
    description: ""
  });

  const input =
    "border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-purple-500 outline-none";

  const label = "text-sm text-gray-600 mb-1";

  // ✅ PREFILL (EDIT MODE)
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        department: editData.department || "",
        description: editData.description || ""
      });
    }
  }, [editData]);

  // ✅ SUBMIT (ADD + UPDATE)
  const handleSubmit = async () => {
    try {
      if (!form.title) {
        return alert("Job Title is required ❗");
      }

      if (editData) {
        await updateJob(editData._id, form, token);
        alert("Updated Successfully ✅");
      } else {
        await addJob(form, token);
        alert("Job Title Added ✅");
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
      <div className="w-[420px] bg-white h-full p-6 shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            {editData ? "Edit Job Title" : "Add Job Title"}
          </h2>

          <button onClick={onClose} className="text-xl">
            ×
          </button>
        </div>

        {/* FORM */}
        <div className="flex-1 space-y-5">

          {/* JOB TITLE */}
          <div>
            <label className={label}>Job Title *</label>
            <input
              className={input}
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
          </div>

          {/* DEPARTMENT */}
          <div>
            <label className={label}>Department</label>
            <select
              className={input}
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
            >
              <option value="">Select Department</option>
              <option>HR</option>
              <option>IT</option>
              <option>Finance</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className={label}>Description</label>
            <textarea
              rows="4"
              className={input}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            {editData ? "Update" : "Add"}
          </button>
        </div>

      </div>
    </div>
  );
}