import { DeleteButton, SaveButton, Toolbar } from "react-admin";

export type GetToolbarOptions = {
  hasSave?: boolean;
  hasDelete?: boolean;
};

export function getToolbar(options: GetToolbarOptions) {
  const { hasSave = false, hasDelete = false } = options;
  if (!hasSave && !hasDelete) {
    return false;
  }
  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      {hasSave && <SaveButton />}
      {hasDelete && <DeleteButton />}
    </Toolbar>
  );
}
