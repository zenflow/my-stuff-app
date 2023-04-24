import Head from "next/head";
import Link from "next/link";
import type { MyPage } from "./_app.route";
import { MAIN_TITLE } from "../common/constants";
import { useMySession } from "../common/auth";
import { useSession } from "next-auth/react";

const HomePage: MyPage = () => {
  const session = useMySession();
  const becomeAdmin = useBecomeAdmin();
  return (
    <>
      <Head>
        <title>{`Home - ${MAIN_TITLE}`}</title>
      </Head>
      <div className="prose max-w-full text-center">
        <h1>Home</h1>
        <h3>
          Check out <Link href="/memes">memes</Link>!
        </h3>
        {session && session.user.role !== "ADMIN" && (
          <h3>
            Want to post memes?
            <br />
            <button className="btn btn-primary btn-sm" onClick={becomeAdmin}>
              Become an admin
            </button>
          </h3>
        )}
      </div>
    </>
  );
};

function useBecomeAdmin() {
  const session = useSession();
  return async () => {
    await fetch("/api/become-admin");
    await session.update();
  };
}

export default HomePage;
