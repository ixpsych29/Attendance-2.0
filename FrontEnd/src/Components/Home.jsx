import { useState } from "react";
import createTheme from "@mui/material/styles/createTheme";
import { Box, ThemeProvider, useTheme } from "@mui/material";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import BirthdayAlert from "./BirthdayAlert";

function Home({ login }) {
  const [mode, setMode] = useState("light");
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const theme = useTheme();

  const currentPath = window.location.pathname;
  const isLoginPage = currentPath === "/login";
  const isSignUpPage = currentPath === "/signup";
  const isMediumOrSmallerScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="bg-glassBlue bg-opacity-70 text-primary min-h-screen flex flex-col bg-[#dbf3fa]">
        <div className="flex justify-center">
          <BirthdayAlert />
        </div>
        {!isLoginPage && !isSignUpPage && (
          <>
            <Box className="fixed top-0 left-0 w-full z-20">
              <Navbar login={login} toggleSidebar={toggleSidebar} />
            </Box>
            <div className="flex pt-20">
              <Box
                className={`w-64 flex-shrink-0 fixed left-0 top-14 transition-transform duration-300 ease-in-out bg-[#19B0E7] ${
                  showSidebar ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <Sidebar mode={mode} setMode={setMode} />
              </Box>
              <Box
                className={`flex-grow p-4 overflow-x-hidden transition-all duration-300 ease-in-out ${
                  showSidebar ? "ml-64" : "ml-0"
                } md:ml-64`}
              >
                <Outlet context={{ mode, setMode }} />
              </Box>
            </div>
          </>
        )}
        {(isLoginPage || isSignUpPage) && (
          <Box flex="1" p={3} className="bg-transparent max-w-full">
            <Outlet context={{ mode, setMode }} />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default Home;
