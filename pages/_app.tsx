import "../styles/globals.css";
import type { AppType } from "next/app";
import Layout from "../components/Layout";
import { createWithSession } from "../modules/next-ssr-with-next-auth";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export const withSession = createWithSession({
  internalBaseUrl: process.env.SELF_URL!,
  refetchWhenOffline: false,
});

export default withSession(MyApp);
