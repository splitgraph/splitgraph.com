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
  userPrimaryColor: "#555500",
  userNavbarLight: "#D3D3D3",
  userNavbarDark: "#A9A9A9",
  userFooterLight: "#F0F8FF",
  userFooterDark: "#00008B",
  mode: "light",
};

export default userColors;
