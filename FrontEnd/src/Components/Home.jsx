// import { Box, ThemeProvider, createTheme } from "@mui/material";
// import { useState } from "react";
// import Navbar from "./NavBar";
// import Sidebar from "./Sidebar";
// import { Outlet, useNavigate } from "react-router-dom";

// function Home({ login }) {
//   const [mode, setMode] = useState("light");
//   const darkTheme = createTheme({
//     palette: {
//       mode: mode,
//     },
//   });

//   // eslint-disable-next-line no-unused-vars
//   const navigate = useNavigate();
//   const currentPath = window.location.pathname;

//   // Check if the current path is "/login" or "/signup"
//   const isLoginPage = currentPath === "/login";
//   const isSignUpPage = currentPath === "/signup";
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Box
//         bgcolor={"background.default"}
//         sx={{
//           // background: "linear-gradient(to right, #FFFFFF, #1688b3)",
//           color: "text.primary",
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           marginTop: 10,
//         }}
//       >
//         {!isLoginPage && !isSignUpPage && (
//           <>
//             <Box>
//               <Navbar login={login} />
//             </Box>
//             <Box>
//               <Sidebar mode={mode} setMode={setMode} />
//             </Box>
//           </>
//         )}
//         <Box flex="1" p={3} marginLeft={4}>
//           <Box>
//             <Outlet />
//           </Box>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default Home;

import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

function Home({ login }) {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  // Check if the current path is "/login" or "/signup"
  const isLoginPage = currentPath === "/login";
  const isSignUpPage = currentPath === "/signup";
  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="bg-glassBlue bg-opacity-70 text-primary min-h-screen flex flex-col pt-28 bg-[#DBF3FA]">
        {!isLoginPage && !isSignUpPage && (
          <>
            <Box className="bg-transparent">
              <Navbar login={login} />
            </Box>
            <Box className="bg-transparent">
              <Sidebar mode={mode} setMode={setMode} />
            </Box>
          </>
        )}
        <Box flex="1" p={3} ml={4} className="bg-transparent">
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
