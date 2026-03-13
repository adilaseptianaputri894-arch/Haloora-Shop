"use client";

import { useState } from "react";
import Head from "next/head";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    console.log("Login attempt:", form);
    // Add logic for authentication here
  };

  return (
    <>
      <Head>
        <title>Login | Sharia POS</title>
      </Head>
      <div className="min-h-screen flex text-slate-800 items-center justify-center bg-emerald-50 p-6 selection:bg-emerald-200">
        
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-md p-8 border border-emerald-100 transition-all duration-300 hover:shadow-emerald-200/50">
          
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-emerald-900 tracking-tight">
              Sharia POS
            </h1>
            <div className="mt-3 p-3 bg-emerald-100/50 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-800 italic font-medium">
                "Honesty (Shiddiq) in transactions is part of the trust (Amanah)."
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="merchant@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium animate-pulse">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-lg shadow-emerald-600/30 py-3 rounded-xl font-bold tracking-wide transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-slate-400 mt-8 text-center font-medium">
            Sharia POS System — Transparent & Trustworthy Transactions
          </p>

        </div>
      </div>
    </>
  );
}
