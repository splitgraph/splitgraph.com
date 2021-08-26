import { createContext, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
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
