import { useState } from "react";

export default function DepartmentForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const input =
    "border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-purple-500 outline-none";

  const label = "text-sm text-gray-600 mb-1";

  const handleSubmit = () => {
    console.log(form);
    alert("Department Added ✅");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">

      {/* 🔥 RIGHT SIDE PANEL */}
      <div className="w-[420px] bg-white h-full p-6 shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            Add Department
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <div className="flex-1 space-y-5">

          {/* NAME */}
          <div>
            <label className={label}>Name</label>
            <input
              placeholder="Enter name"
              className={input}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className={label}>Description</label>
            <textarea
              rows="5"
              placeholder="Enter description"
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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  );
}