import { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Slide,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import Cookies from "js-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import BadgeAvatars from "./BadgeAvatars";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 10px",
  [theme.breakpoints.up("sm")]: {
    padding: "0 20px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "0 40px",
  },
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Navbar = ({ login }) => {
  const [open, setOpen] = useState(false);
  const { username, userProfilePic, Api_EndPoint, toggleMenu, setToggleMenu } =
    useContext(UserContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const capitalizedUserName =
    username.charAt(0).toUpperCase() + username.slice(1);

  const logout = () => {
    Cookies.remove("authToken");
    login(false);
  };

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#19b0e7",
          maxWidth: "100%",
          zIndex: 10,
          boxShadow: "none",
        }}
      >
        <StyledToolBar>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              {toggleMenu ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            {toggleMenu && (
              <Box
                sx={{
                  position: "absolute",
                  top: 60,
                  left: 0,
                  width: "100%",
                  bgcolor: "#19b0e7",
                  zIndex: 11,
                }}
              >
                {/* Render Sidebar or any other component conditionally */}
              </Box>
            )}
          </Box>
          <Box>
            <img
              src="/src/assets/Images/sidebarlogo.png"
              alt="Your Logo"
              style={{ height: "40px" }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}></Box>
          {isSmallScreen ? (
            <Avatar
              sx={{ width: 40, height: 40 }}
              srcSet={`${Api_EndPoint}/uploads/Images/${userProfilePic}`}
              onClick={() => setOpen(true)}
            />
          ) : (
            <Icons>
              <Typography variant="span" sx={{ color: "#fff" }}>
                {capitalizedUserName}
              </Typography>
              <BadgeAvatars login={login} />
            </Icons>
          )}
        </StyledToolBar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
          >
            My Account
          </MenuItem>
          <MenuItem
            component={Link}
            to="/"
            onClick={() => {
              logout();
              setOpen(false);
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
