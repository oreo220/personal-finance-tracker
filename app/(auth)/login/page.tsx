"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (!result?.ok) {
        setError("Email atau password yang kamu masukkan salah.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan saat masuk. Silakan coba lagi.");
      setLoading(false);
    }
  }

  const registered = searchParams.get("registered");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-[#171513] px-12 py-12 text-[#f5f0e9] lg:flex lg:flex-col lg:justify-between xl:px-20">
          <div>
            <Link href="/" className="inline-block">
              <p className="text-sm font-bold uppercase tracking-[0.22em]">
                MoneyFlow
              </p>
            </Link>
          </div>

          <div className="relative z-10 max-w-xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#c39268]">
              Personal Finance
            </p>

            <h1 className="font-display text-6xl leading-[1.02] tracking-tight xl:text-7xl">
              Uangmu.
              <br />
              Lebih terarah.
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-[#b8afa5]">
              Catat pemasukan, atur pengeluaran, kelola sumber dana,
              dan bangun target tabunganmu dengan lebih tenang.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-sm text-[#a69d93]">
            <ShieldCheck size={18} className="text-[#c39268]" />
            Data keuanganmu tetap berada dalam kendalimu.
          </div>

          <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-[#8f6848]/30" />

          <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-[#8f6848]/20" />
        </section>

        {/* RIGHT SIDE */}
        <section className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5 py-10 transition-colors duration-300 sm:px-8">
          <div className="w-full max-w-md">
            {/* MOBILE BRAND */}
            <div className="mb-10 lg:hidden">
              <Link href="/" className="inline-block">
                <p className="text-sm font-bold uppercase tracking-[0.22em]">
                  MoneyFlow
                </p>
              </Link>

              <p className="mt-1 text-xs text-[var(--muted)]">
                Tahu Uangmu. Atur. Simpan.
              </p>
            </div>

            {/* HEADING */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                Selamat datang kembali
              </p>

              <h2 className="font-display text-5xl leading-none tracking-tight sm:text-6xl">
                Masuk.
              </h2>

              <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                Lanjutkan perjalananmu dalam mengatur keuangan dengan lebih
                terarah.
              </p>
            </div>

            {/* REGISTER SUCCESS */}
            {registered && (
              <div className="mt-7 rounded-2xl border border-[#9a6b43]/25 bg-[#eee0d1] px-4 py-3 text-sm leading-6 text-[#6f4b31] dark:border-[#c39268]/25 dark:bg-[#33271e] dark:text-[#d5b99e]">
                Akun berhasil dibuat. Silakan masuk menggunakan akunmu.
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="mt-7 rounded-2xl border border-[#a94a42]/20 bg-[#f4e3e1] px-4 py-3 text-sm leading-6 text-[#873c36] dark:border-[#d47b72]/20 dark:bg-[#3a211f] dark:text-[#e1a49e]">
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-9 space-y-7">
              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-[var(--foreground)]"
                >
                  Email
                </label>

                <div className="group flex items-center gap-3 border-b border-[var(--border)] pb-3 transition-colors focus-within:border-[var(--accent)]">
                  <Mail
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0 text-[var(--muted)] transition-colors group-focus-within:text-[var(--accent)]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nama@email.com"
                    className="w-full border-0 bg-transparent p-0 text-sm text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-0 focus:outline-none focus:ring-0"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--foreground)]"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[var(--accent)] transition-opacity hover:opacity-70"
                  >
                    Lupa password?
                  </Link>
                </div>

                <div className="group flex items-center gap-3 border-b border-[var(--border)] pb-3 transition-colors focus-within:border-[var(--accent)]">
                  <LockKeyhole
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0 text-[var(--muted)] transition-colors group-focus-within:text-[var(--accent)]"
                  />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan password"
                    className="w-full border-0 bg-transparent p-0 text-sm text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-0 focus:outline-none focus:ring-0"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#171513] px-5 py-4 text-sm font-bold text-[#f5f0e9] shadow-[0_12px_30px_rgba(23,21,19,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#292521] hover:shadow-[0_16px_35px_rgba(23,21,19,0.22)] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#f5f0e9] dark:text-[#171513] dark:hover:bg-white"
              >
                {loading ? (
                  "Memproses..."
                ) : (
                  <>
                    Masuk

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* REGISTER LINK */}
            <div className="mt-9 border-t border-[var(--border)] pt-7 text-center">
              <p className="text-sm text-[var(--muted)]">
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  className="font-bold text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--accent)]"
                >
                  Buat akun
                </Link>
              </p>
            </div>

            <p className="mt-8 text-center text-[11px] leading-5 text-[var(--muted)]">
              MoneyFlow · Pencatatan keuangan pribadi
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/**
 * Fallback yang ditampilkan sementara useSearchParams()
 * sedang diproses oleh Suspense.
 */
function LoginFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5 text-[var(--foreground)]">
      <div className="text-sm text-[var(--muted)]">
        Memuat halaman...
      </div>
    </main>
  );
}

/**
 * Penting:
 * useSearchParams() berada di dalam LoginForm,
 * sedangkan LoginForm dibungkus Suspense di sini.
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}