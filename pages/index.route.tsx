import Head from "next/head";
import Link from "next/link";
import type { MyPage } from "./_app.route";
import { MAIN_TITLE } from "../common/constants";

const HomePage: MyPage = () => {
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
      </div>
    </>
  );
};

export default HomePage;
