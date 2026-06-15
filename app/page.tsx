import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-slate-950 to-black text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-center">
        <h1 className="text-5xl font-bold mb-3">
          VR Application
        </h1>

        <p className="text-gray-300 mb-8">
          Create, customize and save your own 3D scene.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/signup"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:opacity-90 transition"
          >
            Create Account
          </Link>

          <Link
            href="/login"
            className="w-full py-3 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}