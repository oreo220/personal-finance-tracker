import { auth } from "@/auth";
import { db } from "@/lib/db";
import { formatIDR, toNumber } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowDownRight,
  Plus,
  ShieldCheck,
  Target,
  Wallet,
} from "lucide-react";

async function data(userId: string) {
  const [user, accounts, transactions, contributions, goals, adjustments] =
    await Promise.all([
      db.user.findUnique({
        where: { id: userId },
        select: { name: true },
      }),

      db.account.findMany({
        where: { userId },
      }),

      db.transaction.findMany({
        where: { userId },
        select: {
          type: true,
          amount: true,
          sourceAccountId: true,
          destinationAccountId: true,
          date: true,
        },
      }),

      db.savingContribution.findMany({
        where: {
          goal: {
            userId,
          },
        },
        select: {
          amount: true,
        },
      }),

      db.savingGoal.findMany({
        where: {
          userId,
          status: "ACTIVE",
        },
        include: {
          contributions: true,
        },
        take: 5,
      }),

      db.balanceAdjustment.findMany({
        where: { userId },
        select: {
          accountId: true,
          amount: true,
        },
      }),
    ]);

  const accountBalances = new Map<string, number>();

  for (const account of accounts) {
    accountBalances.set(
      account.id,
      toNumber(account.initialBalance),
    );
  }

  for (const transaction of transactions) {
    const amount = toNumber(transaction.amount);

    if (
      transaction.type === "INCOME" &&
      transaction.destinationAccountId
    ) {
      const current =
        accountBalances.get(transaction.destinationAccountId) ?? 0;

      accountBalances.set(
        transaction.destinationAccountId,
        current + amount,
      );
    }

    if (
      transaction.type === "EXPENSE" &&
      transaction.sourceAccountId
    ) {
      const current =
        accountBalances.get(transaction.sourceAccountId) ?? 0;

      accountBalances.set(
        transaction.sourceAccountId,
        current - amount,
      );
    }

    if (transaction.type === "TRANSFER") {
      if (transaction.sourceAccountId) {
        const current =
          accountBalances.get(transaction.sourceAccountId) ?? 0;

        accountBalances.set(
          transaction.sourceAccountId,
          current - amount,
        );
      }

      if (transaction.destinationAccountId) {
        const current =
          accountBalances.get(transaction.destinationAccountId) ?? 0;

        accountBalances.set(
          transaction.destinationAccountId,
          current + amount,
        );
      }
    }
  }

  for (const adjustment of adjustments) {
    const current =
      accountBalances.get(adjustment.accountId) ?? 0;

    accountBalances.set(
      adjustment.accountId,
      current + toNumber(adjustment.amount),
    );
  }

  const total = Array.from(accountBalances.values()).reduce(
    (sum, balance) => sum + balance,
    0,
  );

  const protectedTotal = accounts.reduce(
    (sum, account) => sum + toNumber(account.protectedAmount),
    0,
  );

  const allocated = contributions.reduce(
    (sum, contribution) => sum + toNumber(contribution.amount),
    0,
  );

  const available = Math.max(
    0,
    total - protectedTotal - allocated,
  );

  const now = new Date();

  const month = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  );

  const expense = transactions
    .filter(
      (transaction) =>
        transaction.type === "EXPENSE" &&
        transaction.date >= month,
    )
    .reduce(
      (sum, transaction) =>
        sum + toNumber(transaction.amount),
      0,
    );

  return {
    name: user?.name || "kamu",
    total,
    protectedTotal,
    allocated,
    available,
    expense,
    goals,
    accounts,
  };
}

export default async function Dashboard() {
  const session = await auth();

  const d = await data(session!.user!.id);

  return (
    <div className="pb-6">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--muted)" }}
          >
            Halo, {d.name} 👋
          </p>

          <h1
            className="mt-1 text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            Ringkasan keuanganmu
          </h1>

          <p
            className="mt-2 hidden text-sm sm:block"
            style={{ color: "var(--muted)" }}
          >
            Pantau kondisi uangmu dalam satu tampilan.
          </p>
        </div>

        <Link
          href="/transactions/new"
          className="hidden items-center rounded-2xl px-4 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 sm:inline-flex"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          <Plus size={18} className="mr-2" />
          Catat transaksi
        </Link>
      </header>

      {/* =====================================================
          MAIN BALANCE
      ====================================================== */}

      <section className="grid gap-4 lg:grid-cols-3">
        <div
          className="relative overflow-hidden rounded-[28px] p-7 sm:p-8 lg:col-span-2"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* decorative circle */}
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
            style={{
              background: "var(--accent-soft)",
              opacity: 0.8,
            }}
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: "var(--muted)" }}
                >
                  Total saldo
                </p>

                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  Seluruh sumber dana
                </p>
              </div>

              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                <Wallet size={20} />
              </div>
            </div>

            <div
              className="money mt-7 text-4xl font-black tracking-tight sm:text-5xl"
              style={{ color: "var(--foreground)" }}
            >
              {formatIDR(d.total)}
            </div>

            <div className="mt-6 flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--success)" }}
              />

              <span
                className="text-xs font-semibold"
                style={{ color: "var(--muted)" }}
              >
                Dari {d.accounts.length} sumber dana
              </span>
            </div>
          </div>
        </div>

        {/* DANA DIAMANKAN */}
        <div className="surface p-6">
          <div className="flex items-center justify-between">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              <ShieldCheck size={20} />
            </div>
          </div>

          <p
            className="mt-6 text-xs font-bold uppercase tracking-[0.14em]"
            style={{ color: "var(--muted)" }}
          >
            Dana diamankan
          </p>

          <div
            className="money mt-2 text-3xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            {formatIDR(d.protectedTotal)}
          </div>

          <p
            className="mt-2 text-sm leading-6"
            style={{ color: "var(--muted)" }}
          >
            Tidak ikut dihitung sebagai uang bebas.
          </p>
        </div>
      </section>

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="surface p-5">
          <p
            className="text-xs font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--muted)" }}
          >
            Yang bisa digunakan
          </p>

          <div
            className="money mt-3 text-3xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            {formatIDR(d.available)}
          </div>

          <p
            className="mt-2 text-xs leading-5"
            style={{ color: "var(--muted)" }}
          >
            Setelah dana diamankan dan alokasi target.
          </p>
        </div>

        <div className="surface p-5">
          <div className="flex items-center justify-between">
            <p
              className="text-xs font-bold uppercase tracking-[0.12em]"
              style={{ color: "var(--muted)" }}
            >
              Pengeluaran bulan ini
            </p>

            <ArrowDownRight
              size={18}
              style={{ color: "var(--danger)" }}
            />
          </div>

          <div
            className="money mt-3 text-3xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            {formatIDR(d.expense)}
          </div>
        </div>

        <div className="surface p-5">
          <p
            className="text-xs font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--muted)" }}
          >
            Alokasi tabungan
          </p>

          <div
            className="money mt-3 text-3xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            {formatIDR(d.allocated)}
          </div>

          <p
            className="mt-2 text-xs"
            style={{ color: "var(--muted)" }}
          >
            Dana yang dialokasikan ke target.
          </p>
        </div>
      </section>

      {/* =====================================================
          SAVING GOALS
      ====================================================== */}

      <section className="mt-9">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.16em]"
              style={{ color: "var(--accent)" }}
            >
              Saving goals
            </p>

            <h2
              className="mt-1 text-xl font-black"
              style={{ color: "var(--foreground)" }}
            >
              Target tabungan
            </h2>
          </div>

          <Link
            className="text-sm font-bold"
            style={{ color: "var(--accent)" }}
            href="/goals"
          >
            Lihat semua →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {d.goals.length ? (
            d.goals.map((g) => {
              const cur = g.contributions.reduce(
                (sum, c) => sum + toNumber(c.amount),
                0,
              );

              const pct = Math.min(
                100,
                (cur / toNumber(g.targetAmount)) * 100,
              );

              return (
                <Link
                  href={`/goals/${g.id}`}
                  key={g.id}
                  className="surface block p-5 transition hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="font-extrabold"
                        style={{ color: "var(--foreground)" }}
                      >
                        {g.name}
                      </p>

                      <p
                        className="mt-1 text-sm"
                        style={{ color: "var(--muted)" }}
                      >
                        {formatIDR(cur)} /{" "}
                        {formatIDR(
                          toNumber(g.targetAmount),
                        )}
                      </p>
                    </div>

                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                      }}
                    >
                      <Target size={19} />
                    </div>
                  </div>

                  <div
                    className="mt-5 h-2 overflow-hidden rounded-full"
                    style={{
                      background: "var(--surface-soft)",
                    }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: "var(--accent)",
                      }}
                    />
                  </div>

                  <p
                    className="mt-2 text-xs font-bold"
                    style={{ color: "var(--muted)" }}
                  >
                    {Math.round(pct)}% tercapai
                  </p>
                </Link>
              );
            })
          ) : (
            <div className="surface p-7 md:col-span-2">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                <Target size={20} />
              </div>

              <p
                className="mt-5 font-extrabold"
                style={{ color: "var(--foreground)" }}
              >
                Belum ada target tabungan
              </p>

              <p
                className="mt-1 text-sm"
                style={{ color: "var(--muted)" }}
              >
                Buat target pertamamu dan mulai kumpulkan
                sedikit demi sedikit.
              </p>

              <Link
                href="/goals/new"
                className="mt-5 inline-flex rounded-xl px-4 py-2.5 text-sm font-bold"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                Buat target
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          ACCOUNTS
      ====================================================== */}

      <section className="mt-9">
        <div className="mb-4">
          <p
            className="text-xs font-bold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            Your money
          </p>

          <h2
            className="mt-1 text-xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            Sumber dana
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {d.accounts.map((a) => (
            <Link
              key={a.id}
              href={`/accounts/${a.id}`}
              className="surface p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  {a.name}
                </span>

                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                  }}
                >
                  {a.type.replace("_", " ")}
                </span>
              </div>

              <div
                className="mt-4 h-px"
                style={{ background: "var(--border)" }}
              />

              <p
                className="mt-3 text-xs"
                style={{ color: "var(--muted)" }}
              >
                Lihat detail sumber dana →
              </p>
            </Link>
          ))}

          {!d.accounts.length && (
            <Link
              href="/accounts/new"
              className="surface p-6 text-sm font-bold"
              style={{ color: "var(--foreground)" }}
            >
              + Tambah sumber dana
            </Link>
          )}
        </div>
      </section>

      {/* =====================================================
          FOOTER NOTE
      ====================================================== */}

      <p
        className="mt-9 max-w-2xl text-xs leading-5"
        style={{ color: "var(--muted)" }}
      >
        MoneyFlow merupakan alat pencatatan keuangan pribadi.
        Saldo berdasarkan data yang kamu masukkan dan tidak
        terhubung langsung dengan bank atau e-wallet.
      </p>
    </div>
  );
}