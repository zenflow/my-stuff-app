/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useMemo } from "react";
import type { Session } from "next-auth";
import { HashRouter } from "react-router-dom";
import { Admin, AuthProvider } from "react-admin";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import pgDataProvider from "ra-postgraphile";
import { useAsync } from "../modules/use-async";
import { MyLayout } from "./MyLayout";
import { getResources } from "./resources";

const apolloClient = new ApolloClient({
  uri: "/api/data/graphql",
  cache: new InMemoryCache(),
});

export const MyAdmin: React.FC<{ session: Session }> = (props) => {
  // use initial value of session prop; this value never updates in a lifecycle
  const session = useMemo(() => props.session, []);
  const authProvider = useMemo(() => getAuthProvider(session), []);
  const { value: dataProvider } = useAsync(
    useCallback(() => pgDataProvider(apolloClient), [])
  );
  const { value: resources } = useAsync(
    useCallback(() => getResources(session, apolloClient), [])
  );
  if (!dataProvider || !resources) return null; // TODO: better error handling
  return (
    <HashRouter>
      <Admin
        layout={MyLayout}
        title="Not Found"
        disableTelemetry
        authProvider={authProvider}
        dataProvider={dataProvider}
      >
        {resources}
      </Admin>
    </HashRouter>
  );
};

export function getAuthProvider(session: Session): AuthProvider {
  return {
    async login(params) {},
    async checkError(error) {},
    async checkAuth(params) {},
    async logout() {},
    async getIdentity() {
      return {
        id: session.user!.email!,
        fullName: session.user!.name!,
        avatar: session.user!.image!,
      };
    },
    async getPermissions() {},
  };
}
