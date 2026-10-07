"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Account = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
};

type TransactionType = "EXPENSE" | "INCOME" | "TRANSFER";

type TransactionForm = {
  amount: string;
  description: string;
  date: string;
  sourceAccountId: string;
  destinationAccountId: string;
  categoryId: string;
};

function NewTransactionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState<TransactionForm>({
    amount: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
    sourceAccountId: searchParams.get("account") || "",
    destinationAccountId: "",
    categoryId: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [accountsResponse, categoriesResponse] = await Promise.all([
          fetch("/api/accounts"),
          fetch("/api/categories"),
        ]);

        if (!accountsResponse.ok || !categoriesResponse.ok) {
          throw new Error("Gagal mengambil data.");
        }

        const accountsData = await accountsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setAccounts(Array.isArray(accountsData) ? accountsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch {
        setError("Gagal memuat data akun dan kategori.");
      }
    }

    loadData();
  }, []);

  function updateForm<K extends keyof TransactionForm>(
    field: K,
    value: TransactionForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function changeType(newType: TransactionType) {
    setType(newType);

    setForm((current) => ({
      ...current,
      categoryId: "",
      sourceAccountId:
        newType === "INCOME"
          ? ""
          : current.sourceAccountId,
      destinationAccountId:
        newType === "INCOME"
          ? current.destinationAccountId
          : "",
    }));

    setError("");
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        type,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(
        data.error || "Terjadi kesalahan saat menyimpan transaksi.",
      );
      return;
    }

    router.push("/transactions");
  }

  const categoryType = type === "INCOME" ? "INCOME" : "EXPENSE";

  const filteredCategories = categories.filter(
    (category) => category.type === categoryType,
  );

  return (
    <form onSubmit={save} className="mx-auto max-w-xl">
      <h1 className="text-3xl font-black">Catat transaksi</h1>

      <p className="mt-2 text-sm text-slate-500">
        Catat dengan cepat, saldo akan dihitung otomatis.
      </p>

      <div className="surface mt-6 space-y-5 p-6">
        <div className="grid grid-cols-3 gap-2">
          {[
            ["EXPENSE", "Pengeluaran"],
            ["INCOME", "Pemasukan"],
            ["TRANSFER", "Transfer"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              onClick={() =>
                changeType(value as TransactionType)
              }
              className={`rounded-xl border p-3 text-sm font-bold transition ${
                type === value
                  ? "border-indigo-500 bg-indigo-50 text-indigo-800"
                  : "border-[var(--border)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div>
          <Label htmlFor="amount">Nominal</Label>

          <Input
            id="amount"
            type="number"
            min="1"
            required
            value={form.amount}
            onChange={(event) =>
              updateForm("amount", event.target.value)
            }
          />
        </div>

        <div>
          <Label htmlFor="source">
            {type === "INCOME" ? "Masuk ke" : "Sumber dana"}
          </Label>

          <select
            id="source"
            required
            className="h-11 w-full rounded-xl border border-[var(--border)] px-3"
            value={
              type === "INCOME"
                ? form.destinationAccountId
                : form.sourceAccountId
            }
            onChange={(event) => {
              if (type === "INCOME") {
                updateForm(
                  "destinationAccountId",
                  event.target.value,
                );
              } else {
                updateForm(
                  "sourceAccountId",
                  event.target.value,
                );
              }
            }}
          >
            <option value="">Pilih sumber dana</option>

            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        {type === "TRANSFER" && (
          <div>
            <Label htmlFor="destination">
              Tujuan transfer
            </Label>

            <select
              id="destination"
              required
              className="h-11 w-full rounded-xl border border-[var(--border)] px-3"
              value={form.destinationAccountId}
              onChange={(event) =>
                updateForm(
                  "destinationAccountId",
                  event.target.value,
                )
              }
            >
              <option value="">Pilih tujuan</option>

              {accounts
                .filter(
                  (account) =>
                    account.id !== form.sourceAccountId,
                )
                .map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {type !== "TRANSFER" && (
          <div>
            <Label htmlFor="category">Kategori</Label>

            <select
              id="category"
              className="h-11 w-full rounded-xl border border-[var(--border)] px-3"
              value={form.categoryId}
              onChange={(event) =>
                updateForm("categoryId", event.target.value)
              }
            >
              <option value="">Tanpa kategori</option>

              {filteredCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <Label htmlFor="description">Catatan</Label>

          <Input
            id="description"
            maxLength={200}
            value={form.description}
            onChange={(event) =>
              updateForm("description", event.target.value)
            }
          />
        </div>

        <div>
          <Label htmlFor="date">Tanggal</Label>

          <Input
            id="date"
            type="date"
            required
            value={form.date}
            onChange={(event) =>
              updateForm("date", event.target.value)
            }
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <Button className="w-full">
          Simpan transaksi
        </Button>
      </div>
    </form>
  );
}

function NewTransactionFallback() {
  return (
    <main className="mx-auto max-w-xl">
      <div className="surface p-6">
        <h1 className="text-3xl font-black">
          Memuat halaman...
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Menyiapkan form transaksi.
        </p>
      </div>
    </main>
  );
}

export default function NewTransactionPage() {
  return (
    <Suspense fallback={<NewTransactionFallback />}>
      <NewTransactionForm />
    </Suspense>
  );
}