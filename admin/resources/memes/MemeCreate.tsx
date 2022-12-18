import { Create, required, SimpleForm, TextInput } from "react-admin";
import { getTitle } from "../../common/getTitle";

const title = getTitle("Create Meme");

export const MemeCreate = () => {
  return (
    <Create title={title} redirect="list">
      <SimpleForm>
        <TextInput source="image" fullWidth validate={required()} />
        <TextInput source="caption" fullWidth validate={required()} />
      </SimpleForm>
    </Create>
  );
};
