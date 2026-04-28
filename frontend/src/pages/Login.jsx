import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return alert("Enter email & password");
    }

    try {
      console.log("API URL:", import.meta.env.VITE_API_URL); // 🔍 debug

      const res = await login(form);

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Success ✅");

      if (res.data.role === "admin") {
        navigate("/employees");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.log("LOGIN ERROR FRONT:", err);
      alert(err.response?.data?.msg || "Login failed ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            className="border p-2 w-full mb-3"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="border p-2 w-full mb-3"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="mt-3 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}