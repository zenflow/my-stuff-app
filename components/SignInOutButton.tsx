"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export const SignInOutButton: React.FC<{}> = () => {
  const { data: session } = useSession();
  const handler = session ? () => signOut() : () => signIn("google");
  const label = session ? "Sign Out" : "Sign In";
  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={handler}>{label}</button>
    </>
  );
};
