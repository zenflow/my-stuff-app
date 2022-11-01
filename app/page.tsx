"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { graphql, useLazyLoadQuery } from "react-relay";

export default function Home() {
  const session = useSession();
  const users = useLazyLoadQuery(
    graphql`
      query page_Query {
        users {
          nodes {
            email
            name
          }
        }
      }
    `,
    {},
    {}
  );
  return (
    <div>
      <h1>Hello world</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={() => signIn("google")}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
