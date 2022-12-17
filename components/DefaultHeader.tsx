import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useMySession } from "../common/auth";

export const DefaultHeader: React.FC = () => {
  const session = useMySession();
  const showAdminLink = session?.user.role === "ADMIN";
  const firstName = session?.user.name.split(" ")[0];
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      {showAdminLink && <a href={"/admin"}>Admin</a>}
      {" • "}
      {firstName && `Welcome ${firstName}! `}
      <button onClick={() => (session ? signOut() : signIn())}>
        {session ? "Sign out" : "Sign in"}
      </button>
    </nav>
  );
};
