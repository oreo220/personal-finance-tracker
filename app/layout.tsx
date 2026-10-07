import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

export const metadata: Metadata = {
  title: "MoneyFlow — Tahu Uangmu. Atur. Simpan.",
  description:
    "Kelola pemasukan, pengeluaran, sumber dana, dan target tabungan dalam satu tempat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}