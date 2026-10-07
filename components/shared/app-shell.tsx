"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ArrowLeftRight,
  WalletCards,
  Target,
  ChartNoAxesCombined,
  UserRound,
  Plus,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const nav = [
  ["/dashboard", "Beranda", Home],
  ["/transactions", "Transaksi", ArrowLeftRight],
  ["/accounts", "Sumber Dana", WalletCards],
  ["/goals", "Target", Target],
  ["/reports", "Laporan", ChartNoAxesCombined],
] as const;

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r px-5 py-7 md:block"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* BRAND */}
        <Link
          href="/dashboard"
          className="mb-10 block"
        >
          <div
            className="text-xl font-black tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Money<span style={{ color: "var(--accent)" }}>Flow</span>
          </div>

          <div
            className="mt-1 text-[11px] font-medium"
            style={{ color: "var(--muted)" }}
          >
            Tahu uangmu. Atur. Simpan.
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="space-y-1.5">
          {nav.map(([href, label, Icon]) => {
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all duration-200",
                  active
                    ? "shadow-sm"
                    : "hover:translate-x-0.5"
                )}
                style={{
                  background: active
                    ? "var(--accent-soft)"
                    : "transparent",
                  color: active
                    ? "var(--accent)"
                    : "var(--muted)",
                }}
              >
                <Icon
                  size={19}
                  strokeWidth={active ? 2.5 : 2}
                />

                <span>{label}</span>

                {active && (
                  <span
                    className="ml-auto h-1.5 w-1.5 rounded-full"
                    style={{
                      background: "var(--accent)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM MENU */}
        <div className="absolute bottom-6 left-5 right-5 space-y-1.5">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition"
            style={{
              color:
                pathname.startsWith("/profile")
                  ? "var(--accent)"
                  : "var(--muted)",
              background:
                pathname.startsWith("/profile")
                  ? "var(--accent-soft)"
                  : "transparent",
            }}
          >
            <UserRound size={19} />
            Profil
          </Link>

          <button
            onClick={() =>
              signOut({ callbackUrl: "/login" })
            }
            className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition"
            style={{
              color: "var(--muted)",
            }}
          >
            <LogOut size={19} />
            Keluar
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="md:ml-64">
        <div className="mx-auto max-w-7xl px-4 py-5 pb-28 sm:px-6 lg:px-10 lg:py-8">
          {children}
        </div>
      </main>

      {/* ================= MOBILE NAV ================= */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t px-2 py-2 backdrop-blur-xl md:hidden"
        style={{
          background:
            "color-mix(in srgb, var(--card) 94%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto flex max-w-lg items-center justify-between">
          {nav.slice(0, 2).map(([href, label, Icon]) => {
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className="flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-semibold"
                style={{
                  color: active
                    ? "var(--accent)"
                    : "var(--muted)",
                }}
              >
                <Icon size={19} />
                {label}
              </Link>
            );
          })}

          {/* CENTER BUTTON */}
          <Link
            href="/transactions/new"
            aria-label="Catat transaksi"
            className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-105"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <Plus size={24} strokeWidth={2.5} />
          </Link>

          {nav.slice(3).map(([href, label, Icon]) => {
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className="flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-semibold"
                style={{
                  color: active
                    ? "var(--accent)"
                    : "var(--muted)",
                }}
              >
                <Icon size={19} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}