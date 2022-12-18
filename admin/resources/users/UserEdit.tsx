import {
  DateField,
  Edit,
  EmailField,
  ImageField,
  Labeled,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";
import { Grid, Box } from "@mui/material";
import { useMySession } from "../../../common/auth";
import { getTitle } from "../../common/getTitle";
import { getToolbar } from "../../common/getToolbar";

const title = getTitle(({ record }) => record && `Users / ${record.name}`);

export const UserEdit = () => {
  return (
    <Edit title={title}>
      <UserEditForm />
    </Edit>
  );
};

const UserEditForm = () => {
  const session = useMySession();
  const record = useRecordContext();
  const isCurrentUser = !!session && !!record && record.id === session.user.id;
  return (
    <SimpleForm toolbar={getToolbar({ hasSave: isCurrentUser })}>
      <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
        <Grid item xs={12} md={4}>
          <ImageField source="image" />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display={{ xs: "block", sm: "flex" }}>
            <Box flex={1}>
              <Labeled>
                <DateField source="createdAt" showTime />
              </Labeled>
            </Box>
            <Box flex={1}>
              <Labeled>
                <DateField source="updatedAt" showTime />
              </Labeled>
            </Box>
          </Box>
          <Box display={{ xs: "block", sm: "flex" }}>
            <Box flex={1}>
              <Labeled>
                <EmailField source="email" />
              </Labeled>
            </Box>
            <Box flex={1}>
              <Labeled>
                <TextField source="role" />
              </Labeled>
            </Box>
          </Box>
          <Box>
            <TextInput source="name" fullWidth disabled={!isCurrentUser} />
          </Box>
        </Grid>
      </Grid>
    </SimpleForm>
  );
};
