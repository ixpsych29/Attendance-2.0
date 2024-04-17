// import {
//   AppBar,
//   Toolbar,
//   styled,
//   Typography,
//   Badge,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import UserContext from "./UserContext";
// // import ProfilePictureUpload from "./ProfilePictureUpload";

// const StyledToolBar = styled(Toolbar)({
//   display: "flex",
//   justifyContent: "space-between",
// });
// const Icons = styled(Box)(({ theme }) => ({
//   display: "none",
//   gap: "20px",
//   alignContent: "center",
//   [theme.breakpoints.up("sm")]: {
//     display: "flex",
//   },
// }));
// const UserBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   gap: "10px",
//   alignContent: "center",
//   [theme.breakpoints.up("sm")]: {
//     display: "none",
//   },
// }));

// const UserImage = styled("img")(({ theme }) => ({
//   display: "none",
//   [theme.breakpoints.up("sm")]: {
//     display: "block",
//   },
// }));

// const Navbar = ({ login }) => {
//   const [open, setOpen] = useState(false);

//   const { username, userProfilePic, Api_EndPoint } = useContext(UserContext);

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         background: `linear-gradient(90deg,
//           rgba(70, 130, 180, 1) 0%,  /* Steel Blue */
//           rgba(25, 25, 112, 1) 50%,  /* Midnight Blue */
//           rgba(10, 10, 10, 1) 100%);`,
//         width: "100%",
//       }}
//     >
//       <StyledToolBar>
//         <img
//           src="/src/assets/logo.png"
//           alt="Your Logo"
//           style={{ height: "40px" }}
//         />
//         <UserImage
//           src="/src/assets/sandyApps-white.png"
//           alt="Your Logo"
//           style={{ height: "60px" }}
//         />
//         <Icons>
//           <Avatar
//             sx={{ width: 30, height: 30 }}
//             srcSet={`${Api_EndPoint}/uploads/Images/${userProfilePic}`}
//             onClick={() => setOpen(true)}
//           />
//         </Icons>
//         <UserBox>
//           <Avatar
//             sx={{ width: 30, height: 30 }}
//             srcSet={`${Api_EndPoint}/uploads/Images/${userProfilePic}`}
//             onClick={() => setOpen(true)}
//           />
//           <Typography variant="span">{username}</Typography>
//         </UserBox>
//       </StyledToolBar>
//       <Menu
//         id="demo-positioned-menu"
//         aria-labelledby="demo-positioned-button"
//         open={open}
//         onClose={() => setOpen(false)}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <MenuItem component={Link} to="/profile">
//           My account
//         </MenuItem>
//         <MenuItem
//           component={Link}
//           to="/"
//           onClick={() => {
//             login(false);
//           }}
//         >
//           Logout
//         </MenuItem>
//       </Menu>
//     </AppBar>
//   );
// };
// export default Navbar;

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
import NotificationsIcon from "@mui/icons-material/Notifications";
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
    display: "flex",
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
        sx={{
          background: `linear-gradient(90deg,
            rgba(70, 130, 180, 1) 0%,  /* Steel Blue */
            rgba(25, 25, 112, 1) 50%,  /* Midnight Blue */
            rgba(10, 10, 10, 1) 100%);`,
          width: "100%",
          height: "70px", // Increase height
          transition: "height 0.3s ease-in-out", // Add transition for height
        }}
      >
        <StyledToolBar>
          <img
            src="/src/assets/logo.png"
            alt="Your Logo"
            style={{ height: "40px" }}
          />
          <UserImage
            src="/src/assets/sandyApps-white.png"
            alt="Your Logo"
            style={{ height: "60px" }}
          />
          <Icons>
            <Avatar
              sx={{ width: 40, height: 40 }} // Increase avatar size
              srcSet={`${Api_EndPoint}/uploads/Images/${userProfilePic}`}
              onClick={() => setOpen(true)}
            />
          </Icons>
          <UserBox>
            <Avatar
              sx={{ width: 40, height: 40 }} // Increase avatar size
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
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem component={Link} to="/profile">
            My account
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
