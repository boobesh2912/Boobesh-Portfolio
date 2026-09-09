"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("that didn't work, try again");
    }
  };

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-cream px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-line bg-paper p-8 shadow-[0_6px_0_0_var(--line)]"
      >
        <p className="font-hand text-2xl text-coral-deep">boobesh.com</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink">
          admin login
        </h1>

        <label className="mt-6 block font-body text-xs font-bold uppercase tracking-wide text-ink-soft">
          username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2 font-body text-ink focus:outline-none"
          autoComplete="username"
        />

        <label className="mt-4 block font-body text-xs font-bold uppercase tracking-wide text-ink-soft">
          password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2 font-body text-ink focus:outline-none"
          autoComplete="current-password"
        />

        {error && (
          <p className="mt-3 font-body text-sm font-semibold text-pink">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-ink px-5 py-3 font-body text-sm font-bold text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? "checking..." : "log in"}
        </button>
      </form>
    </main>
  );
}
