import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export const DefaultHeader: React.FC = () => {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0];
  return (
    <nav>
      <Link href="/">Home</Link> <Link href="/about">About</Link>
      {" • "}
      {firstName && `Welcome ${firstName}! `}
      <button onClick={() => (session ? signOut() : signIn())}>
        {session ? "Sign out" : "Sign in"}
      </button>
    </nav>
  );
};
