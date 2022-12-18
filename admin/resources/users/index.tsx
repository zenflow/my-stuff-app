import { Resource } from "react-admin";
import UserIcon from "@mui/icons-material/Group";
import type { GetResource } from "..";
import { UserList } from "./UserList";
import { UserEdit } from "./UserEdit";

export const getResource: GetResource = () => (
  <Resource name="users" icon={UserIcon} list={UserList} edit={UserEdit} />
);
