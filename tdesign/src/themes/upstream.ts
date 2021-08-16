import { PaletteMode } from "@material-ui/core";

/**
 * Intended to be temporary; should map to some upstream thing/things
 */
export interface UserColors {
  userPrimaryColor: string; // theme.palette.primary.main
  userNavbarLight: string;
  userNavbarDark: string;
  userFooterLight: string;
  userFooterDark: string;
  mode: PaletteMode; // theme.palette.mode
}

const userColors: UserColors = {
  userPrimaryColor: "#550",
  userNavbarLight: "lightgray",
  userNavbarDark: "darkgray",
  userFooterLight: "purple",
  userFooterDark: "darkpurple",
  mode: "light",
};

export default userColors;
