import { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import initUserColors from "./upstream";
import { muiTheme } from "./muiTheme";

export const UserThemeContext = createContext(null);
const UserThemeWrapper = ({ children }) => {
  const [userColors, setUserColors] = useState(initUserColors); //TODO should come from a real 'upstream'

  const toggleDarkMode = () => {
    const { mode, ...rest } = userColors;

    setUserColors({
      mode: userColors.mode === "light" ? "dark" : "light",
      ...rest,
    });
  };

  return (
    <UserThemeContext.Provider
      value={{ userColors, setUserColors, toggleDarkMode }}
    >
      <ThemeProvider theme={muiTheme(userColors)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </UserThemeContext.Provider>
  );
};

export default UserThemeWrapper;
