import HomeIcon from "@mui/icons-material/Home";
import { Box, IconButton, Typography } from "@mui/material";
import { AppBar, AppBarClasses, AppBarProps } from "react-admin";
import { MyUserMenu } from "./MyUserMenu";
import { MAIN_TITLE } from "./config";

export function MyAppBar(props: AppBarProps) {
  return (
    <AppBar {...props} userMenu={<MyUserMenu />}>
      <Box
        component="img"
        alt="Logo"
        src="/images/favicon-32x32.png"
        display={{ xs: "none", md: "block" }}
        sx={{ filter: "invert(100%)", marginRight: "8px" }}
      />
      <Typography variant="h6" display={{ xs: "none", md: "block" }}>
        {MAIN_TITLE}
      </Typography>
      <Typography
        variant="h6"
        id="react-admin-title"
        className={AppBarClasses.title}
        sx={{ textAlign: "center" }}
      />
      <IconButton href="/" color="inherit">
        <HomeIcon />
      </IconButton>
    </AppBar>
  );
}
