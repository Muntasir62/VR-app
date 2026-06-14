"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/scene");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-black to-black">

      <form
        onSubmit={handleSubmit}
        className="w-[360px] p-6 rounded-2xl 
        bg-white/10 backdrop-blur-xl 
        border border-white/20 text-white shadow-2xl"
      >
        <h1 className="text-2xl font-bold mb-5 text-center">
          Welcome Back
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-indigo-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-indigo-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg 
          bg-gradient-to-r from-indigo-500 to-purple-600 
          font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className="mt-3 text-sm text-red-400 text-center">
            {message}
          </p>
        )}
      </form>

    </div>
  );
}