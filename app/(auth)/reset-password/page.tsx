"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState(searchParams.get("token") || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        password,
      }),
    });

    const data = await response.json();

    setMessage(data.message || data.error || "Terjadi kesalahan.");

    if (response.ok) {
      setTimeout(() => {
        router.push("/login");
      }, 800);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="surface w-full max-w-md p-8"
      >
        <h1 className="text-2xl font-black">
          Atur password baru
        </h1>

        <div className="mt-6">
          <Label htmlFor="password">
            Password baru
          </Label>

          <Input
            id="password"
            type="password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {message && (
          <p className="mt-4 rounded-xl bg-indigo-50 p-3 text-sm">
            {message}
          </p>
        )}

        <Button className="mt-5 w-full">
          Simpan password
        </Button>
      </form>
    </main>
  );
}

function ResetPasswordFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="surface w-full max-w-md p-8">
        <h1 className="text-2xl font-black">
          Memuat halaman...
        </h1>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
}