import Link from "next/link";
import {
  ArrowRight,
  LockKeyhole,
  Wallet,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#f5f1eb] text-[#201d19] transition-colors duration-300 dark:bg-[#0d0c0b] dark:text-[#f5f0e9]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full border border-[#9a6b43]/15 dark:border-[#c39268]/15" />

      <div className="pointer-events-none absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full border border-[#9a6b43]/10 dark:border-[#c39268]/10" />

      <div className="pointer-events-none absolute -bottom-48 left-1/3 h-[620px] w-[620px] rounded-full border border-[#9a6b43]/10 dark:border-[#c39268]/10" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#201d19] text-[#f5f0e9] transition-colors duration-300 group-hover:bg-[#3f2e22] dark:bg-[#f5f0e9] dark:text-[#201d19] dark:group-hover:bg-white">
              <Wallet size={17} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-[0.18em]">
                MONEYFLOW
              </p>

              <p className="mt-0.5 text-[9px] tracking-[0.25em] text-[#8d8175] dark:text-[#8f867d]">
                PERSONAL FINANCE
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <LockKeyhole
              size={14}
              className="text-[#9a6b43] dark:text-[#c39268]"
            />

            <span className="text-[10px] font-semibold tracking-[0.14em] text-[#8d8175] dark:text-[#9f968d]">
              YOUR MONEY · YOUR RULES
            </span>
          </div>
        </header>

        {/* Main content */}
        <section className="flex flex-1 items-center justify-center py-16">
          <div className="w-full max-w-4xl text-center">
            {/* Eyebrow */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#9a6b43]/20 bg-[#eee0d1]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7c573a] backdrop-blur-sm dark:border-[#c39268]/20 dark:bg-[#33271e]/70 dark:text-[#c9a27f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9a6b43] dark:bg-[#c39268]" />
              Personal Finance & Saving Tracker
            </div>

            {/* Heading */}
            <h1 className="font-display text-6xl leading-[0.95] tracking-[-0.025em] sm:text-7xl lg:text-8xl">
              Tahu uangmu.
              <br />

              <span className="text-[#9a6b43] dark:text-[#c39268]">
                Atur. Simpan.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#756d64] sm:text-base sm:leading-8 dark:text-[#aaa198]">
              Kelola rekening, e-wallet, uang tunai, dana diamankan,
              dan target tabungan dalam satu tempat.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#201d19] px-7 text-sm font-bold text-[#fffdf9] shadow-[0_12px_30px_rgba(32,29,25,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3f2e22] hover:shadow-[0_16px_35px_rgba(32,29,25,0.22)] sm:w-auto dark:bg-[#f5f0e9] dark:text-[#171513] dark:hover:bg-white"
              >
                Mulai sekarang

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/login"
                className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-[#d8cec2] bg-[#fffdf9] px-7 text-sm font-bold text-[#201d19] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b99b7b] hover:bg-white sm:w-auto dark:border-[#3d3731] dark:bg-[#181614] dark:text-[#f5f0e9] dark:hover:border-[#6b5948] dark:hover:bg-[#211e1b]"
              >
                Masuk
              </Link>
            </div>

            {/* Small reassurance */}
            <div className="mt-10 flex items-center justify-center gap-2 text-[11px] text-[#9a9086] dark:text-[#8f877f]">
              <LockKeyhole size={13} />

              <span>
                Pencatatan sederhana. Data tetap dalam kendalimu.
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-[#ded5ca] pt-6 dark:border-[#302c27]">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[#9a9086] dark:text-[#817a72]">
            MONEYFLOW
          </p>

          <p className="text-[10px] text-[#aaa198] dark:text-[#716b64]">
            Tahu Uangmu. Atur. Simpan.
          </p>

          <p className="hidden text-[10px] tracking-[0.16em] text-[#9a9086] dark:text-[#817a72] sm:block">
            EST. 2026
          </p>
        </footer>
      </div>
    </main>
  );
}