import "../styles/globals.css";
import NextProgress from "next-progress";
import { Fragment } from "react";
import type { NextPage } from "next";
import type { AppType } from "next/app";
import { createWithApollo } from "next-ssr-with-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createWithSession } from "../modules/next-ssr-with-next-auth";
import { DefaultLayout } from "../components/DefaultLayout";
import { BrandImageResourceLinks } from "../components/BrandImageResourceLinks";

export type MyPage<P = {}, IP = P> = NextPage<P, IP> & MyPageSettings;
export type MyPageSettings = {
  Layout?: React.FC<{ children: React.ReactNode }> | false | undefined;
};

const MyApp: AppType = ({ Component, pageProps }) => {
  const component = <Component {...pageProps} />;
  let { Layout = DefaultLayout } = Component as MyPage;
  if (Layout === false) Layout = Fragment;
  return (
    <Layout>
      <BrandImageResourceLinks />
      <NextProgress
        delay={0}
        color="#FF79C6"
        options={{ showSpinner: false }}
      />
      {component}
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
