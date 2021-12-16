import * as React from "react";
import { Box, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { LogoImage } from "../LogoImage";
import { LogoText } from "../LogoText";

// TODO: This file is deprecated
interface IMobileHeaderProps {
  logoText: string;
  searchInput?: React.ReactElement;
  renderHeaderCenter?: () => React.ReactNode;
}

const MobileHeader = ({ logoText, renderHeaderCenter }: IMobileHeaderProps) => {
  const headerCenter = !!renderHeaderCenter ? renderHeaderCenter() : null;

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
      <Box sx={{ width: "100%" }}>{headerCenter}</Box>
    </Box>
  );
};

export default MobileHeader;
