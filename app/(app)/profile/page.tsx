"use client";

import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import {
  Check,
  LogOut,
  Moon,
  Monitor,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react";

export default function Profile() {
  const { data: session } = useSession();

  // INI yang sebelumnya hilang
  const { theme, setTheme } = useTheme();

  const name = session?.user?.name || "Pengguna";
  const email = session?.user?.email || "Email belum tersedia";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const themes = [
    {
      value: "light",
      label: "Light",
      description: "Terang & hangat",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Gelap & elegan",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      description: "Ikuti perangkat",
      icon: Monitor,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl pb-24 md:pb-10">
      {/* HEADER */}
      <div className="mb-8">
        <p
          className="mb-2 text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          Account Center
        </p>

        <h1
          className="text-4xl font-black tracking-tight sm:text-5xl"
          style={{ color: "var(--foreground)" }}
        >
          Profil
        </h1>

        <p
          className="mt-3 max-w-xl text-sm leading-6"
          style={{ color: "var(--muted)" }}
        >
          Kelola akun, preferensi tampilan, dan informasi pribadi kamu.
        </p>
      </div>

      {/* PROFILE HERO */}
      <section
        className="surface relative overflow-hidden p-6 sm:p-8"
      >
        <div
          className="absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--accent-soft)" }}
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* AVATAR */}
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl text-2xl font-black"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            {initials}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                className="text-2xl font-black"
                style={{ color: "var(--foreground)" }}
              >
                {name}
              </h2>

              <span
                className="rounded-full px-3 py-1 text-[11px] font-bold"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                Personal
              </span>
            </div>

            <p
              className="mt-1 text-sm"
              style={{ color: "var(--muted)" }}
            >
              {email}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
              <ShieldCheck
                size={15}
                style={{ color: "var(--success)" }}
              />

              <span style={{ color: "var(--success)" }}>
                Data pribadi kamu terlindungi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* APPEARANCE */}
      <section className="mt-6">
        <div className="mb-4">
          <p
            className="text-lg font-black"
            style={{ color: "var(--foreground)" }}
          >
            Tampilan
          </p>

          <p
            className="mt-1 text-sm"
            style={{ color: "var(--muted)" }}
          >
            Pilih tampilan yang paling nyaman untuk kamu.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {themes.map((item) => {
            const Icon = item.icon;

            // SEKARANG theme SUDAH TERDEFINISI
            const active = theme === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setTheme(item.value)}
                className="group rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: active
                    ? "var(--accent-soft)"
                    : "var(--card)",
                  borderColor: active
                    ? "var(--accent)"
                    : "var(--border)",
                  color: "var(--foreground)",
                  boxShadow: active
                    ? "0 8px 25px rgba(154, 107, 67, 0.10)"
                    : "none",
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{
                      background: active
                        ? "var(--accent)"
                        : "var(--surface-soft)",
                      color: active
                        ? "#ffffff"
                        : "var(--foreground)",
                    }}
                  >
                    <Icon size={19} />
                  </div>

                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full border"
                    style={{
                      borderColor: active
                        ? "var(--accent)"
                        : "var(--border)",
                      background: active
                        ? "var(--accent)"
                        : "transparent",
                    }}
                  >
                    {active && (
                      <Check
                        size={14}
                        strokeWidth={3}
                        color="#ffffff"
                      />
                    )}
                  </div>
                </div>

                <p className="mt-5 font-bold">{item.label}</p>

                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ACCOUNT INFORMATION */}
      <section className="mt-8">
        <div className="mb-4">
          <p
            className="text-lg font-black"
            style={{ color: "var(--foreground)" }}
          >
            Informasi akun
          </p>

          <p
            className="mt-1 text-sm"
            style={{ color: "var(--muted)" }}
          >
            Informasi dasar yang digunakan oleh MoneyFlow.
          </p>
        </div>

        <div className="surface divide-y overflow-hidden">
          <div className="flex items-center gap-4 p-5">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "var(--surface-soft)",
                color: "var(--foreground)",
              }}
            >
              <UserRound size={18} />
            </div>

            <div className="min-w-0">
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--muted)" }}
              >
                Nama
              </p>

              <p
                className="mt-1 truncate text-sm font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black"
              style={{
                background: "var(--surface-soft)",
                color: "var(--accent)",
              }}
            >
              Rp
            </div>

            <div>
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--muted)" }}
              >
                Mata uang
              </p>

              <p
                className="mt-1 text-sm font-bold"
                style={{ color: "var(--foreground)" }}
              >
                Indonesian Rupiah (IDR)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section
        className="mt-8 rounded-2xl border p-5 sm:p-6"
        style={{
          background: "var(--accent-soft)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: "var(--card)",
              color: "var(--accent)",
            }}
          >
            <ShieldCheck size={19} />
          </div>

          <div>
            <p
              className="font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Data keuangan tetap milikmu
            </p>

            <p
              className="mt-1 text-sm leading-6"
              style={{ color: "var(--muted)" }}
            >
              MoneyFlow merupakan aplikasi pencatatan keuangan pribadi.
              Data saldo dan transaksi berasal dari informasi yang kamu
              masukkan sendiri dan tidak terhubung langsung dengan bank
              maupun e-wallet.
            </p>
          </div>
        </div>
      </section>

      {/* LOGOUT */}
      <section className="mt-8">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border px-5 py-4 text-sm font-bold transition hover:opacity-80"
          style={{
            borderColor: "var(--border)",
            color: "var(--danger)",
            background: "var(--card)",
          }}
        >
          <LogOut size={17} />
          Keluar dari akun
        </button>
      </section>

      <p
        className="mt-8 text-center text-xs"
        style={{ color: "var(--muted)" }}
      >
        MoneyFlow · Tahu Uangmu. Atur. Simpan.
      </p>
    </div>
  );
}