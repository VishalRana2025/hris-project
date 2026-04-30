import { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(form);

      alert("Signup successful ✅");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed ❌");
    }
  };

  return (
    <div className="flex h-screen">

      {/* LEFT */}
      <div className="w-[480px] bg-[#1e1b2e] text-white flex flex-col justify-center px-8">

        <h1 className="text-2xl font-bold text-orange-400 mb-6 tracking-wide">
          HRMS
        </h1>

        <h2 className="text-2xl text-orange-400 mb-6">
          Employee Signup
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >

          {/* 🔥 EMAIL ONLY */}
          <input
            placeholder="Enter your official email"
            className="w-full mb-4 p-3 rounded bg-[#2a2640]"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* 🔥 PASSWORD */}
          <input
            type="password"
            placeholder="Create password"
            className="w-full mb-4 p-3 rounded bg-[#2a2640]"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full bg-orange-500 py-3 rounded hover:bg-orange-600 transition">
            Register
          </button>
        </form>

        {/* INFO MESSAGE */}
        <p className="mt-4 text-xs text-gray-400">
          ⚠️ You can only register if your email is already added by admin.
        </p>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-orange-400">
            Login
          </Link>
        </p>
      </div>

      {/* RIGHT */}
      <div
        className="flex-1 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/originals/84/ef/0d/84ef0d6caf899307ac0582678613af3e.jpg')"
        }}
      ></div>

    </div>
  );
}