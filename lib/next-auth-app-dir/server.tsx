/**
 * TODO
 * - NEXTAUTH_URL_INTERNAL
 * - getToken() - https://github.com/nextauthjs/next-auth/issues/5647#issuecomment-1297832836
 * - Why does NextAuth fetch /api/auth/session again on client in dev mode mode but not in prod mode?
 * - Once Next.js supports writing headers/cookies, make sure NextAuth token `next-auth.session-token` cookie gets updated on SSR.
 */

import { use } from "react";
import { headers } from "next/headers";
import type { Session } from "next-auth";
import { ClientSessionProvider } from "./ClientSessionProvider";

if (typeof window !== "undefined") throw new Error("server-only module");

export async function getSession(): Promise<Session | null> {
  const cookie = headers().get("cookie");
  const res = await fetch("http://localhost:3000/api/auth/session", {
    headers: cookie ? { cookie } : {},
  });
  const session = await res.json();
  return session.user ? (session as Session) : null;
}

export const SessionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const session = use(getSession());
  return (
    <ClientSessionProvider session={session}>{children}</ClientSessionProvider>
  );
};
