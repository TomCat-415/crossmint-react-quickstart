"use client";
import { useAuth } from "@crossmint/client-sdk-react-ui";

export function AuthButton() {
  const { login, logout, jwt } = useAuth();

  const base =
    "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition";
  const primary = "bg-white text-black hover:bg-neutral-200";
  const ghost = "border border-white/20 text-white hover:bg-white/10";

  return !jwt ? (
    <button type="button" onClick={login} className={`${base} ${primary}`}>
      Login
    </button>
  ) : (
    <button type="button" onClick={logout} className={`${base} ${ghost}`}>
      Logout
    </button>
  );
}