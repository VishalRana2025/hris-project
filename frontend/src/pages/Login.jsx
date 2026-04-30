import { useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    // 🔒 Basic validation
    if (!form.email || !form.password) {
      return alert("Please fill all fields ⚠️");
    }

    try {
      setLoading(true);

      // ✅ API call
      const res = await login({
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Navigate (App.jsx handles role)
      navigate("/dashboard");

    } catch (err) {
      console.error("LOGIN ERROR:", err?.response?.data);

      alert(
        err?.response?.data?.msg ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">

      {/* LEFT PANEL */}
      <div className="w-[480px] bg-[#1e1b2e] text-white flex flex-col justify-center px-8">

        <h1 className="text-2xl font-bold text-orange-400 mb-6 tracking-wide">
          HRMS
        </h1>

        <h2 className="text-2xl text-orange-400 mb-6">
          Login
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >

          {/* EMAIL */}
          <input
            type="email"
            autoComplete="username"
            placeholder="Enter your email"
            className="w-full mb-4 p-3 rounded bg-[#2a2640] outline-none focus:ring-2 focus:ring-orange-400"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            className="w-full mb-4 p-3 rounded bg-[#2a2640] outline-none focus:ring-2 focus:ring-orange-400"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* LINKS */}
        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-400">
            Signup
          </Link>
        </p>

      </div>

      {/* RIGHT PANEL */}
      <div
        className="flex-1 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')",
        }}
      ></div>

    </div>
  );
}