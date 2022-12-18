import { useMemo } from "react";
import { HashRouter } from "react-router-dom";
import { Admin, AuthProvider } from "react-admin";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import pgDataProvider from "ra-postgraphile";
import { useAsync } from "../modules/use-async";
import type { MySession } from "../common/auth";
import { theme } from "./theme";
import { MyLayout } from "./MyLayout";
import { getResources } from "./resources";

export const MyAdmin: React.FC<{ session: MySession }> = (props) => {
  // Use only the initial value of `session` prop, to avoid constant reflow.
  // The Next.js page that uses this renders a new instance whenever auth status changes.
  const session = useMemo(() => props.session, []); // eslint-disable-line react-hooks/exhaustive-deps
  const authProvider = useMemo(() => getAuthProvider(session), [session]);
  const apolloClient = useMemo(() => getApolloClient(), []);
  const { value: dataProvider, error: dataProviderError } = useAsync(
    () => pgDataProvider(apolloClient),
    [apolloClient]
  );
  const { value: resources, error: resourcesError } = useAsync(
    () => getResources(session, apolloClient),
    [session, apolloClient]
  );
  if (dataProviderError) throw dataProviderError;
  if (resourcesError) throw resourcesError;
  if (!dataProvider || !resources) return null;
  return (
    <HashRouter>
      <Admin
        theme={theme}
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

function getApolloClient() {
  return new ApolloClient({
    uri: "/api/data/graphql",
    cache: new InMemoryCache(),
  });
}

function getAuthProvider(session: MySession): AuthProvider {
  return {
    async login(params) {},
    async checkError(error) {},
    async checkAuth(params) {},
    async logout() {},
    async getIdentity() {
      return {
        id: session.user.id,
        fullName: session.user.name,
        avatar: session.user.image,
      };
    },
    async getPermissions() {},
  };
}
