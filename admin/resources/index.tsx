import type { Session } from "next-auth";
import type { ApolloClient } from "@apollo/client";
import { Resource } from "react-admin";
import UserIcon from "@mui/icons-material/Group";
import { UserList } from "./UserList";
import { UserEdit } from "./UserEdit";

export async function getResources(
  session: Session,
  apolloClient: ApolloClient<unknown>
) {
  return (
    <>
      <Resource name="users" icon={UserIcon} list={UserList} edit={UserEdit} />
    </>
  );
}
