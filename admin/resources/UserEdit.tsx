import {
  DateField,
  Edit,
  EmailField,
  ImageField,
  Labeled,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from "react-admin";
import { Grid, Box } from "@mui/material";
import { getResourceTitle } from "../titles";

const title = getResourceTitle(
  ({ record }) => record && `User / ${record.name}`
);

export const UserEdit = () => (
  <Edit title={title}>
    <SimpleForm
      toolbar={
        <Toolbar>
          <SaveButton />
        </Toolbar>
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
          <Box>
            <Labeled>
              <EmailField source="email" />
            </Labeled>
          </Box>
          <Box>
            <TextInput source="name" fullWidth />
          </Box>
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);
