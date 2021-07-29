import * as React from "react";
import { Box, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { LogoImage } from "../LogoImage";
import { LogoText } from "../LogoText";

interface IMobileHeaderProps {
  logoText: string;
  searchInput: React.ReactElement;
}

const MobileHeader = ({ logoText, searchInput }: IMobileHeaderProps) => {
  return (
    <Box sx={{ p: "12px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", px: "20px" }}
      >
        <a aria-label="home" href={"/"}>
          <LogoImage logoURL={"/static/brandmark.svg"} />
          <LogoText text={logoText} />
        </a>
        <IconButton onClick={() => {}}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Box sx={{ width: "100%" }}>
        {searchInput &&
          React.cloneElement(searchInput, {
            fullWidth: true,
          })}
      </Box>
    </Box>
  );
};

export default MobileHeader;
