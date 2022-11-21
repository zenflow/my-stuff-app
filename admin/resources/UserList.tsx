import {
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  List,
  TextField,
} from "react-admin";
import { getResourceTitle } from "../titles";

const title = getResourceTitle("Users");

export const UserList = () => (
  <List title={title}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <ImageField source="image" />
      <EmailField source="email" />
      <TextField source="name" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </Datagrid>
  </List>
);
