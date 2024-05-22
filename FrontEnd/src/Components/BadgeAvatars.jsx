import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import UserContext from "./UserContext";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function BadgeAvatars({ login }) {
  const { userProfilePic, Api_EndPoint, username } = useContext(UserContext);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSubmenuOpen(true);
  };

  const handleClose = () => {
    setSubmenuOpen(false);
  };

  const logout = () => {
    // Clear the cookie named 'authToken'
    Cookies.remove("authToken");
    // Perform any additional logout logic
    login(false);
  };

  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        onClick={handleMenuClick}>
        <Avatar
          alt="ProfilePic"
          src={
            userProfilePic
              ? `${Api_EndPoint}/uploads/Images/${userProfilePic}`
              : undefined
          }>
          {!userProfilePic && username.slice(0, 2).toUpperCase()}
        </Avatar>
      </StyledBadge>
      <Menu anchorEl={anchorEl} open={submenuOpen} onClick={handleClose}>
        <MenuItem component={Link} to="/home/profile">
          My account
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Stack>
  );
}
