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
} from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 20px", // Add padding to increase width
  transition: "padding 0.3s ease-in-out", // Add transition for padding
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center", // Change alignContent to alignItems
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center", // Change alignContent to alignItems
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

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#B7E9F7 ", maxWidth: "85.06%" }}>
        <StyledToolBar>
          <Icons style={{ position: "relative", textAlign: "left" }}>
            <Avatar
              sx={{ width: 40, height: 40, left: 1520 }} // Increase avatar size
              srcSet={`${Api_EndPoint}/uploads/Images/${userProfilePic}`}
              onClick={() => setOpen(true)}
            />
          </Icons>
          <UserBox style={{ textAlign: "right" }}>
            <Avatar
              sx={{ width: 40, height: 40, left: 1520 }} // Increase avatar size
              srcSet={`${Api_EndPoint}/uploads/Images/${userProfilePic}`}
              onClick={() => setOpen(true)}
            />
            <Typography variant="span">{username}</Typography>
          </UserBox>
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
          }}>
          <MenuItem
            component={Link}
            to="/home"
            style={{ textAlign: "left", marginRight: 30 }}>
            My Account
          </MenuItem>
          <MenuItem
            component={Link}
            to="/home/profile"
            onClick={() => {
              login(false);
            }}>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </Slide>
  );
};

export default Navbar;

// -------------------
