# Crossmint React Quickstart (Solana)

This is a demo Next.js project showing how to integrate Crossmint Wallets and JWT authentication into a modern React app. Built from create-next-app and extended with TypeScript, TailwindCSS, and the Crossmint React SDK.

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/TomCat-415/crossmint-react-quickstart.git
cd crossmint-react-quickstart
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file with your client key:
```env
NEXT_PUBLIC_CROSSMINT_API_KEY=ck_staging_12345
```

### 3. Run Dev Server
```bash
pnpm dev
```

App runs at [http://localhost:3000](http://localhost:3000)

---

## 🛠 Features

• ✅ Next.js 15 (App Router) with Turbopack
• ✅ TypeScript + TailwindCSS v4
• ✅ Crossmint Wallet integration
• ✅ JWT Auth (Crossmint Auth)
• ✅ Named exports + barrel file (`src/components/index.ts`)
• ✅ Components:
  - `AuthButton` → Login/Logout
  - `WalletStatus` → Show wallet connection

---

## 📌 Next Steps

• Style login/logout buttons with Tailwind
• Display wallet balance & NFTs
• Add transaction signing demo
• Deploy to Vercel with production API keys

---

## 📚 Learn More

- [Crossmint Docs](https://docs.crossmint.com/)
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Crossmint React SDK](https://www.npmjs.com/package/@crossmint/client-sdk-react-ui)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details..
