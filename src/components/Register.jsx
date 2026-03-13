import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    store: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const { register } = useAuth();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Nama wajib diisi";
    if (!form.email.includes("@")) newErrors.email = "Email tidak valid";
    if (!form.store) newErrors.store = "Nama toko wajib diisi";
    if (form.password.length < 6) newErrors.password = "Password minimal 6 karakter";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Password tidak sama";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const result = register(form);

    if (result.success) {
      console.log("Register vendor sukses:", form);
    } else {
      setErrors({ global: "Terjadi kesalahan sistem. Coba lagi nanti." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="bg-white shadow-xl rounded-xl w-full max-w-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Daftar Vendor POS Syariah
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Nama Pemilik"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="text"
            name="store"
            placeholder="Nama Toko"
            value={form.store}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.store && <p className="text-red-500 text-sm">{errors.store}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          {errors.global && (
            <p className="text-red-500 text-sm text-center">{errors.global}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
          >
            Daftar Vendor
          </button>

        </form>

      </div>

    </div>
  );
}
