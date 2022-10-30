"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div>
      <h1>Hello world</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={() => signIn("google")}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
