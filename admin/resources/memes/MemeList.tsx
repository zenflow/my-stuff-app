import {
  AutocompleteArrayInput,
  Datagrid,
  DateField,
  ImageField,
  List,
  ReferenceField,
  ReferenceInput,
  TextField,
  TextInput,
} from "react-admin";
import { getTitle } from "../../common/getTitle";

const title = getTitle("Memes");
const filters = [
  <TextInput key={0} source="caption" />,
  <ReferenceInput key={1} source="ownerId" reference="users">
    <AutocompleteArrayInput />
  </ReferenceInput>,
];

export const MemeList = () => {
  return (
    <List title={title} filters={filters}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <ImageField source="image" />
        <TextField source="caption" />
        <ReferenceField source="ownerId" reference="users" />
        <DateField source="createdAt" showTime />
        <DateField source="updatedAt" showTime />
      </Datagrid>
    </List>
  );
};
