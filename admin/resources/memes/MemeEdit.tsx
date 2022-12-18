import {
  DateField,
  Edit,
  SimpleForm,
  ImageField,
  Labeled,
  TextInput,
  useRecordContext,
  ReferenceField,
  required,
} from "react-admin";
import { Box } from "@mui/material";
import { useMySession } from "../../../common/auth";
import { getTitle } from "../../common/getTitle";
import { getToolbar } from "../../common/getToolbar";

const title = getTitle(({ record }) => record && `Memes / ${record.caption}`);

export const MemeEdit = () => {
  return (
    <Edit title={title}>
      <MemeEditForm />
    </Edit>
  );
};

const MemeEditForm = () => {
  const session = useMySession();
  const record = useRecordContext();
  const isMyRecord =
    !!session && !!record && record.ownerId === session.user.id;
  return (
    <SimpleForm
      toolbar={getToolbar({ hasSave: isMyRecord, hasDelete: isMyRecord })}
    >
      <Labeled fullWidth>
        <ImageField
          source="image"
          sx={{
            width: "100%",
            "& .RaImageField-image": {
              width: "100%",
              height: "350px",
              objectFit: "contain",
            },
          }}
        />
      </Labeled>
      <TextInput
        source="caption"
        fullWidth
        disabled={!isMyRecord}
        validate={required()}
      />
      <Box display={{ xs: "block", sm: "flex" }} width="100%">
        <Box flex={1}>
          <Labeled>
            <ReferenceField source="ownerId" reference="users" />
          </Labeled>
        </Box>
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
    </SimpleForm>
  );
};
