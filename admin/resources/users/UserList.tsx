import {
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  List,
  TextField,
} from "react-admin";
import { getTitle } from "../../common/getTitle";

const title = getTitle("Users");

export const UserList = () => (
  <List title={title}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <ImageField source="image" />
      <EmailField source="email" />
      <TextField source="name" />
      <TextField source="role" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </Datagrid>
  </List>
);
