"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { KeyRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // The invite/recovery link puts the session in the URL hash; the client
    // picks it up automatically once it initializes.
    const supabase = createClient();
    supabase.auth.getSession().then(() => setReady(true));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.replace("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="w-full max-w-sm rounded-md bg-white p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image
            src="/images/logo-icon.webp"
            alt="Grand Form Restaurant"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <h1 className="mt-3 font-display text-xl font-bold text-ink">
            Set Your Password
          </h1>
          <p className="mt-1 text-xs text-ink/50">
            Choose a password for the Grand Form admin panel.
          </p>
        </div>

        {!ready ? (
          <p className="text-center text-sm text-ink/50">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink/70">
                New Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-sm border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-maroon"
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink/70">
                Confirm Password
              </label>
              <input
                required
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-sm border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-maroon"
                placeholder="Repeat password"
              />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-maroon-deep px-6 py-3 text-sm font-semibold tracking-wide text-white hover:bg-maroon disabled:opacity-60"
            >
              {loading ? "Saving..." : "Set Password"} <KeyRound size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
