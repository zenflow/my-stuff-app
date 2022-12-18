import { Resource } from "react-admin";
import ImageIcon from "@mui/icons-material/Image";
import type { GetResource } from "..";
import { MemeList } from "./MemeList";
import { MemeCreate } from "./MemeCreate";
import { MemeEdit } from "./MemeEdit";

export const getResource: GetResource = () => (
  <Resource
    name="memes"
    icon={ImageIcon}
    list={MemeList}
    create={MemeCreate}
    edit={MemeEdit}
  />
);
