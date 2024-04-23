import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Slide,
  useTheme,
  useMediaQuery,
  capitalize,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 20px",
  transition: "padding 0.3s ease-in-out",
  [theme.breakpoints.up("sm")]: {
    padding: "0 40px", // Adjust padding for larger screens
  },
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex", // Change display to flex for larger screens
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const UserImage = styled("img")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const Navbar = ({ login }) => {
  const [open, setOpen] = useState(false);
  const { username, userProfilePic, Api_EndPoint } = useContext(UserContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const capitalizedUserName =
    username.charAt(0).toUpperCase() + username.slice(1);

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#B7E9F7 ", maxWidth: "85.06%" }}
      >
        <StyledToolBar>
          <Box sx={{ flexGrow: 1 }}></Box>
          {isSmallScreen ? (
            <Avatar
              sx={{ width: 40, height: 40 }}
              srcSet={`${Api_EndPoint}/uploads/Images/${userProfilePic}`}
              onClick={() => setOpen(true)}
            />
          ) : (
            <Icons>
              <Badge>
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  srcSet={`${Api_EndPoint}/uploads/Images/${userProfilePic}`}
                  onClick={() => setOpen(true)}
                />
              </Badge>
              <Typography variant="span" sx={{ color: "black" }}>
                {capitalizedUserName}
              </Typography>
            </Icons>
          )}
        </StyledToolBar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={() => setOpen(false)}
          style={{ margin: 40, width: "200px" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            component={Link}
            to="/home/profile"
            style={{ textAlign: "left", marginRight: 30 }}
          >
            My Account
          </MenuItem>
          <MenuItem
            component={Link}
            to="/"
            onClick={() => {
              login(false);
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
