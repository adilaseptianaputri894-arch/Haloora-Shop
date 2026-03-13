import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  
  // Mengambil fungsi dari Context
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Mohon isi semua field.");
      return;
    }

    // Memanggil logika simulasi API
    const result = login(form.email, form.password);

    if (result.success) {
      setError("");
      console.log("Login berhasil, redirect...");
      // navigate('/dashboard') jika menggunakan react-router
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        
        <h1 className="text-3xl font-bold text-center text-gray-800">
          POS Syariah
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          “Kejujuran dalam transaksi adalah bagian dari amanah.”
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
          >
            Masuk
          </button>

        </form>

        <p className="text-xs text-gray-400 mt-6 text-center">
          Sistem POS Syariah — Transaksi Transparan & Amanah
        </p>

      </div>

    </div>
  );
}
