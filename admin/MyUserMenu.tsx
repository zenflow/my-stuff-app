import { forwardRef } from "react";
import { UserMenu } from "react-admin";
import { signOut } from "next-auth/react";
import MenuItem from "@mui/material/MenuItem";
import ExitIcon from "@mui/icons-material/PowerSettingsNew";

export const MyUserMenu: React.FC = () => {
  return (
    <UserMenu>
      <LogoutButton />
    </UserMenu>
  );
};

const LogoutButton = forwardRef<HTMLLIElement>(function LogoutButton(
  props,
  ref
) {
  return (
    <MenuItem ref={ref} onClick={() => signOut({ callbackUrl: "/" })}>
      <ExitIcon /> Logout
    </MenuItem>
  );
});
