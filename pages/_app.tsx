import "../styles/globals.css";
import type { AppType } from "next/app";
import { createWithApollo } from "next-ssr-with-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
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

const withApollo = createWithApollo({
  client({ headers }) {
    const isServer = typeof window === "undefined";
    const baseUri = isServer ? process.env.SELF_URL : "";
    const cookie = headers?.cookie;
    return new ApolloClient({
      uri: `${baseUri}/api/data/graphql`,
      headers: cookie ? { cookie } : {},
      cache: new InMemoryCache(),
    });
  },
});

export default withApollo(withSession(MyApp));
