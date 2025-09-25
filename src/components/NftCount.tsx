"use client";

import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@crossmint/client-sdk-react-ui";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export function NftCount() {
  const { wallet, status } = useWallet();
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connection = useMemo(() => new Connection(clusterApiUrl("devnet"), "confirmed"), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setError(null);
        setCount(null);
        if (status !== "loaded" || !wallet?.address) return;

        const owner = new PublicKey(wallet.address);

        // Get all parsed token accounts owned by the wallet
        const resp = await connection.getParsedTokenAccountsByOwner(owner, { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") });

        // Very rough heuristic:
        // count accounts with amount > 0 and decimals === 0 as “NFT-like” (SPL w/ 0 decimals).
        // Real NFT detection requires metadata program lookups (Metaplex).
        const nftish = resp.value.filter((acc) => {
          const info = acc.account.data.parsed.info;
          const amount = Number(info.tokenAmount.amount);
          const decimals = Number(info.tokenAmount.decimals);
          return amount > 0 && decimals === 0;
        });

        if (!cancelled) setCount(nftish.length);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to fetch tokens");
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, wallet?.address, connection]);

  if (status !== "loaded" || !wallet) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded bg-white/10">
      <span className="font-medium">NFTs (rough count):</span>
      {error ? <span className="text-red-400">{error}</span> :
        count === null ? <span className="opacity-70">Loading…</span> :
        <span>{count}</span>
      }
    </div>
  );
}