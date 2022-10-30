/**
 * TODO
 * - Instead of making http request to self, take a `options: NextAuthOptions` prop and use NextAuth's `unstable_getServerSession()`.
 * - Why does NextAuth fetch /api/auth/session again on client in dev mode mode but not in prod mode?
 * - Once Next.js supports writing headers/cookies, make sure NextAuth token `next-auth.session-token` cookie gets updated on SSR.
 */

import { use } from "react";
import { headers } from "next/headers";
import type { Session } from "next-auth";
import { ClientNextAuthSessionProvider } from "./client";

async function getSession(): Promise<Session | null> {
  const cookie = headers().get("cookie");
  const res = await fetch("http://localhost:3000/api/auth/session", {
    headers: cookie ? { cookie } : {},
  });
  const session = await res.json();
  return session.user ? (session as Session) : null;
}

export const NextAuthSessionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const session = use(getSession());
  return (
    <ClientNextAuthSessionProvider session={session}>
      {children}
    </ClientNextAuthSessionProvider>
  );
};
