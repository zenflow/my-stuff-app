import type { ApolloClient } from "@apollo/client";
import type { MySession } from "../../common/auth";

export type GetResource = (params: GetResourceParams) => JSX.Element;
export type GetResourceParams = {
  session: MySession;
};

export async function getResources(
  session: MySession,
  apolloClient: ApolloClient<unknown>
) {
  // use apolloClient to define any more params needed by GetResource's
  const params: GetResourceParams = { session };
  return (
    <>
      {require("./memes").getResource(params)}
      {require("./users").getResource(params)}
      {/* insert more resources here */}
    </>
  );
}
