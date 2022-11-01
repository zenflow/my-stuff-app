import { use } from "react";
import { getSession } from "../lib/next-auth-app-dir/server";
import { SignInOutButton } from "../components/SignInOutButton";

export default function Home() {
  const session = use(getSession());
  return (
    <div>
      <h1>Hello world</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignInOutButton />
    </div>
  );
}
