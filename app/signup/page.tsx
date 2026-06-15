"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Signup successful");
      router.push("/login");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 to-black">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-2 text-center">
          Create Account
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Sign up to access your 3D scene workspace
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 mb-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full p-3 mb-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:scale-[1.02] transition"
        >
          Create Account
        </button>

        {message && (
          <p className="mt-4 text-center text-red-400">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}