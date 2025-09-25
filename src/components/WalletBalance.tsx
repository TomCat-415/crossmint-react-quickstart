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
    let cancelled = false;

    async function load() {
      try {
        setError(null);
        setSol(null);
        if (status !== "loaded" || !wallet?.address) return;

        const pk = new PublicKey(wallet.address);
        const lamports = await connection.getBalance(pk, "confirmed");
        if (!cancelled) setSol(lamports / LAMPORTS_PER_SOL);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to fetch balance");
      }
    }

    load();
    // refresh when wallet changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, wallet?.address, connection]);

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