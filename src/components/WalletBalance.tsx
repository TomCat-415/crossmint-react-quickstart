"use client";

import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@crossmint/client-sdk-react-ui";
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";

export function WalletBalance() {
  const { wallet, status } = useWallet();
  const [sol, setSol] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connection = useMemo(() => {
    // devnet since you’re in staging
    return new Connection(clusterApiUrl("devnet"), "confirmed");
  }, []);

  useEffect(() => {
    const cancelled = { current: false };

    async function load() {
      try {
        setError(null);
        setSol(null);
        if (status !== "loaded" || !wallet?.address) return;

        const pk = new PublicKey(wallet.address);
        const lamports = await connection.getBalance(pk, "confirmed");
        if (!cancelled.current) setSol(lamports / LAMPORTS_PER_SOL);
      } catch (e: unknown) {
        if (!cancelled.current) setError((e as Error)?.message ?? "Failed to fetch balance");
      }
    }

    load();
    // refresh when wallet changes
  }, [status, wallet?.address, connection]);

  useEffect(() => {
    return () => {
      // Cleanup function to cancel ongoing requests
    };
  }, []);

  if (status !== "loaded" || !wallet) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded bg-white/10">
      <span className="font-medium">Balance:</span>
      {error ? <span className="text-red-400">{error}</span> :
        sol === null ? <span className="opacity-70">Loading…</span> :
        <span>{sol.toFixed(4)} SOL</span>
      }
    </div>
  );
}