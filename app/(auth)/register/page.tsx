"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Wallet,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      setError("Nama wajib diisi.");
      return;
    }

    if (!cleanEmail) {
      setError("Email wajib diisi.");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          data?.error || "Terjadi kesalahan saat membuat akun.",
        );
        return;
      }

      router.push("/login?registered=true");
      router.refresh();
    } catch {
      setError(
        "Tidak dapat terhubung ke server. Pastikan aplikasi sedang berjalan.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f0e9] text-[#201d19]">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        {/* =====================================================
            LEFT — BRAND EXPERIENCE
        ====================================================== */}

        <section className="relative hidden overflow-hidden bg-[#171512] text-[#f8f3eb] lg:flex">
          {/* Decorative circles */}
          <div className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full border border-[#8b6b50]/20" />

          <div className="absolute -left-20 -top-20 h-[360px] w-[360px] rounded-full border border-[#8b6b50]/15" />

          <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full border border-[#8b6b50]/10" />

          {/* Small decorative line */}
          <div className="absolute left-14 top-1/2 h-32 w-px bg-[#8b6b50]/30" />

          <div className="relative z-10 flex min-h-screen w-full flex-col justify-between px-12 py-10 xl:px-20 xl:py-12">
            {/* Logo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-[#8b6b50]/40 bg-[#8b6b50]/10">
                  <Wallet className="h-4 w-4 text-[#cbb092]" />
                </div>

                <div>
                  <p className="font-sans text-sm font-extrabold tracking-[0.18em]">
                    MONEYFLOW
                  </p>

                  <p className="mt-0.5 font-sans text-[9px] tracking-[0.25em] text-[#a99682]">
                    PERSONAL FINANCE
                  </p>
                </div>
              </div>

              <p className="font-sans text-[10px] tracking-[0.2em] text-[#76695c]">
                EST. 2026
              </p>
            </div>

            {/* Main statement */}
            <div className="max-w-2xl py-20">
              <p className="mb-8 font-sans text-[11px] font-bold tracking-[0.35em] text-[#a88b70]">
                FINANCIAL CLARITY
              </p>

              <h1 className="max-w-xl text-[72px] leading-[0.95] tracking-[-0.025em] xl:text-[88px]">
                Tahu uangmu.
                <br />
                <span className="text-[#b99b7b]">
                  Atur. Simpan.
                </span>
              </h1>

              <p className="mt-10 max-w-md font-sans text-sm leading-7 text-[#9d9185]">
                Ruang sederhana untuk memahami ke mana uangmu
                pergi, mengatur sumber dana, dan membangun
                kebiasaan menabung yang lebih terarah.
              </p>

              {/* Statement */}
              <div className="mt-12 flex items-start gap-4">
                <div className="mt-2 h-px w-10 bg-[#8b6b50]" />

                <p className="max-w-sm font-sans text-xs leading-6 text-[#76695c]">
                  Karena mengelola uang seharusnya tidak terasa
                  rumit.
                </p>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-end justify-between border-t border-white/10 pt-6">
              <div className="space-y-1">
                <p className="font-sans text-[10px] tracking-[0.18em] text-[#6e6257]">
                  YOUR MONEY
                </p>

                <p className="font-sans text-xs text-[#95887a]">
                  Your rules. Your goals.
                </p>
              </div>

              <p className="font-serif text-3xl italic text-[#66584c]">
                01
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT — REGISTER FORM
        ====================================================== */}

        <section className="flex min-h-screen items-center bg-[#f8f5ef]">
          <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-10 lg:px-16 xl:px-20">
            {/* Mobile branding */}
            <div className="mb-16 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#201d19]">
                  <Wallet className="h-4 w-4 text-[#dbc3a8]" />
                </div>

                <div>
                  <p className="font-sans text-sm font-extrabold tracking-[0.15em]">
                    MONEYFLOW
                  </p>

                  <p className="font-sans text-[9px] tracking-[0.2em] text-[#9b8d7d]">
                    PERSONAL FINANCE
                  </p>
                </div>
              </div>

              <p className="font-sans text-[10px] tracking-[0.2em] text-[#9b8d7d]">
                01 / 03
              </p>
            </div>

            {/* Header */}
            <div>
              <p className="mb-5 font-sans text-[10px] font-bold tracking-[0.3em] text-[#8b6b50]">
                CREATE YOUR SPACE
              </p>

              <h2 className="text-5xl leading-[1.05] tracking-[-0.02em] text-[#201d19] sm:text-6xl">
                Mulai dari
                <br />
                <span className="italic text-[#8b6b50]">
                  sini.
                </span>
              </h2>

              <p className="mt-6 max-w-md font-sans text-sm leading-7 text-[#8d8175]">
                Buat akun untuk mulai mengatur keuanganmu dengan
                lebih sadar, sederhana, dan terarah.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="mt-12 space-y-7">
              {/* Name */}
              <div>
                <Label
                  htmlFor="name"
                  className="mb-2.5 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#65594e]"
                >
                  Nama
                </Label>

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nama kamu"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  disabled={loading}
                  className="h-14 rounded-none border-0 border-b border-[#d7ccc0] bg-transparent px-0 font-sans text-sm text-[#201d19] shadow-none transition-all placeholder:text-[#b2a69a] focus:border-[#201d19] focus:ring-0"
                />
              </div>

              {/* Email */}
              <div>
                <Label
                  htmlFor="email"
                  className="mb-2.5 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#65594e]"
                >
                  Email
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  disabled={loading}
                  className="h-14 rounded-none border-0 border-b border-[#d7ccc0] bg-transparent px-0 font-sans text-sm text-[#201d19] shadow-none transition-all placeholder:text-[#b2a69a] focus:border-[#201d19] focus:ring-0"
                />
              </div>

              {/* Password */}
              <div>
                <Label
                  htmlFor="password"
                  className="mb-2.5 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#65594e]"
                >
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    disabled={loading}
                    className="h-14 rounded-none border-0 border-b border-[#d7ccc0] bg-transparent px-0 pr-10 font-sans text-sm text-[#201d19] shadow-none transition-all placeholder:text-[#b2a69a] focus:border-[#201d19] focus:ring-0"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#9d9185] transition hover:text-[#201d19]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="mb-2.5 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#65594e]"
                >
                  Konfirmasi password
                </Label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Masukkan ulang password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    disabled={loading}
                    className="h-14 rounded-none border-0 border-b border-[#d7ccc0] bg-transparent px-0 pr-10 font-sans text-sm text-[#201d19] shadow-none transition-all placeholder:text-[#b2a69a] focus:border-[#201d19] focus:ring-0"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword,
                      )
                    }
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#9d9185] transition hover:text-[#201d19]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="border border-[#d7b7b0] bg-[#f8ebe8] px-4 py-3 font-sans text-xs leading-5 text-[#8f443b]">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex h-14 w-full items-center justify-between bg-[#201d19] px-6 font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#fffdf9] transition-all duration-200 hover:bg-[#3f2e22] disabled:opacity-60"
              >
                <span>
                  {loading ? "Creating..." : "Create my space"}
                </span>

                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </form>

            {/* Footer */}
            <div className="mt-10 border-t border-[#ded5ca] pt-6">
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-2 text-[#9b8d7d]">
                  <LockKeyhole className="h-3.5 w-3.5" />

                  <span className="font-sans text-[10px] tracking-wide">
                    Your data stays private
                  </span>
                </div>

                <p className="font-sans text-xs text-[#8d8175]">
                  Sudah punya akun?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-[#201d19] underline decoration-[#b99b7b] underline-offset-4 transition hover:text-[#8b6b50]"
                  >
                    Masuk
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}