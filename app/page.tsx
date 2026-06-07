import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        VR Application
      </h1>

      <Link
        href="/signup"
        className="border px-6 py-2"
      >
        Signup
      </Link>

      <Link
        href="/login"
        className="border px-6 py-2"
      >
        Login
      </Link>
    </div>
  );
}