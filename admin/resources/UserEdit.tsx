import {
  DateField,
  Edit,
  EmailField,
  ImageField,
  Labeled,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  useRecordContext,
} from "react-admin";
import { Grid, Box } from "@mui/material";
import { getResourceTitle } from "../titles";
import { useMySession } from "../../common/auth";

const title = getResourceTitle(
  ({ record }) => record && `User / ${record.name}`
);

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
  const isCurrentUser = !!session && !!record && session.user.id === record.id;
  return (
    <SimpleForm
      toolbar={
        isCurrentUser && (
          <Toolbar>
            <SaveButton />
          </Toolbar>
        )
      }
    >
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
            {isCurrentUser ? (
              <TextInput source="name" fullWidth />
            ) : (
              <Labeled>
                <TextField source="name" />
              </Labeled>
            )}
          </Box>
        </Grid>
      </Grid>
    </SimpleForm>
  );
};
