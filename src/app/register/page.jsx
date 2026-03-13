"use client";

import { useState } from "react";
import Head from "next/head";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    store: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid Email is required";
    if (!form.store.trim()) newErrors.store = "Store Name is required";
    if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

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
    console.log("Register merchant:", form);
    // Add logic for registration API integration
  };

  return (
    <>
      <Head>
        <title>Merchant Registration | Sharia POS</title>
      </Head>
      <div className="min-h-screen text-slate-800 flex items-center justify-center bg-gray-50 py-10 px-6 selection:bg-emerald-200">

        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-xl p-10 border border-gray-100 transition-shadow duration-300 hover:shadow-emerald-100/30">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Join Sharia POS
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Start managing your store with transparency and blessing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    errors.name ? 'border-red-400 focus:ring-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    errors.email ? 'border-red-400 focus:ring-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="store">Store Name</label>
              <input
                id="store"
                type="text"
                name="store"
                placeholder="Ex: Barakah Supermarket"
                value={form.store}
                onChange={handleChange}
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                  errors.store ? 'border-red-400 focus:ring-red-500' : 'border-gray-200'
                }`}
              />
              {errors.store && <p className="text-red-500 text-xs mt-1 font-medium">{errors.store}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    errors.password ? 'border-red-400 focus:ring-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    errors.confirmPassword ? 'border-red-400 focus:ring-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-black active:bg-gray-800 text-white rounded-xl py-3.5 font-bold tracking-wide transition-all transform hover:-translate-y-0.5 shadow-md"
              >
                Register Merchant Account
              </button>
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              By registering, you agree to our Sharia Compliance Terms & Conditions.
            </p>

          </form>

        </div>

      </div>
    </>
  );
}
