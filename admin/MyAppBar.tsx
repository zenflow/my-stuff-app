import HomeIcon from "@mui/icons-material/Home";
import { IconButton, Typography } from "@mui/material";
import { AppBar, AppBarClasses, AppBarProps } from "react-admin";
import { MyUserMenu } from "./MyUserMenu";
import { mainTitle } from "./titles";

export function MyAppBar(props: AppBarProps) {
  return (
    <AppBar {...props} userMenu={<MyUserMenu />}>
      <Typography variant="h6" display={{ xs: "none", md: "block" }}>
        {mainTitle}
      </Typography>
      <Typography
        variant="h6"
        id="react-admin-title"
        className={AppBarClasses.title}
        sx={{ textAlign: "center" }}
      />
      <IconButton onClick={goHome} color="inherit">
        <HomeIcon />
      </IconButton>
    </AppBar>
  );
}

// const NoHideOnScrollContainer: React.FC = (props) => <div {...props} />;

function goHome() {
  window.location = "/" as string & Location;
}
