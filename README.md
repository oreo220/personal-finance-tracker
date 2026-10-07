# Personal Finance & Saving Tracker

**Tahu Uangmu. Atur. Simpan.**

Aplikasi full-stack pencatatan keuangan pribadi untuk membantu pengguna mengetahui total uang, uang yang boleh digunakan, dana yang diamankan, dan progres target tabungan.

## Fitur
- Register, login, logout, reset password
- Sumber dana bank, e-wallet, cash, other
- Income, expense, transfer
- Dana diamankan
- Saving goals + saving allocation
- Balance adjustment + audit history
- Dashboard dan laporan sederhana
- Responsive mobile-first UI
- Dark/System theme
- PostgreSQL + Prisma
- Auth.js + bcrypt + Zod
- Unit test dan smoke E2E

## Stack
Next.js, TypeScript, React, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Zod, Recharts, Lucide React, Vitest, Playwright.

## Requirements
- Node.js 20+
- npm 10+
- PostgreSQL 14+

## Local setup
1. Copy `.env.example` menjadi `.env.local`.
2. Isi `DATABASE_URL` dan `AUTH_SECRET`.
3. Install: `npm install`
4. Generate Prisma: `npm run db:generate`
5. Push schema: `npm run db:push`
6. Seed: `npm run db:seed`
7. Jalankan: `npm run dev`
8. Buka `http://localhost:3000`.

Demo account:
- Email: `demo@example.com`
- Password: `Demo12345!`

## Business rules
`currentBalance = initialBalance + income + transferIn - expense - transferOut + adjustments`.
`availableBalance = currentBalance - protectedAmount - allocatedGoalAmount`.
Saving allocation tidak mengurangi current balance dua kali.
Protected amount tidak boleh negatif atau melebihi current balance.
Transfer bukan expense dan tidak mengubah total kekayaan.

## Testing
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run build`

## Deployment Vercel
1. Push project ke GitHub.
2. Import repository ke Vercel.
3. Tambahkan `DATABASE_URL`, `AUTH_SECRET`, dan `NEXTAUTH_URL` dengan URL production.
4. Pastikan PostgreSQL provider dapat diakses Vercel.
5. Jalankan migration/push schema terhadap database production sebelum penggunaan pertama.

Untuk production reset password, hubungkan email provider. Endpoint reset sudah tersedia; mode development menampilkan reset URL agar bisa diuji tanpa layanan email.

## Security
Tidak ada kredensial bank/e-wallet. Password di-hash menggunakan bcrypt. Resource divalidasi berdasarkan session user ownership. Secret hanya melalui environment variable.

## Catatan
Aplikasi ini merupakan alat pencatatan keuangan pribadi. Saldo yang ditampilkan berdasarkan data yang dimasukkan pengguna dan tidak terhubung secara langsung dengan bank atau e-wallet.

## Future
Email delivery reset password, recurring transactions, richer reports, CSV export, notifications, and production observability.
