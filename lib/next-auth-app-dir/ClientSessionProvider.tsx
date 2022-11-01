"use client";
// This module exists for the sole purpose of cloning SessionProvider & adding the compiler directive above

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export const ClientSessionProvider: React.FC<{
  session: Session | null;
  children: React.ReactNode;
}> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
