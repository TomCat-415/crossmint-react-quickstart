"use client";
import { useWallet } from "@crossmint/client-sdk-react-ui";

export function WalletStatus() {
  const { wallet, status } = useWallet();

  if (status === "in-progress") return <span className="text-white/70">Loading…</span>;
  if (status === "loaded" && wallet)
    return (
      <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/10">
        <span className="size-2 rounded-full bg-green-400" />
        Connected: {wallet.address}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/10">
      <span className="size-2 rounded-full bg-red-400" />
      Wallet not connected
    </span>
  );
}