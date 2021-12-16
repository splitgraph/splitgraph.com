import * as React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  AccountCircle,
  More as MoreIcon,
} from "@mui/icons-material";
import { useTheme, alpha } from "@mui/material/styles";
import { LogoImage } from "../Layout";
import Link, { NextLinkComposed } from "../Link/MuiLink";

export interface ISplitgraphTopBarProps {}

const SGRSearch = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(3),
          width: "auto",
        },
      }}
    >
      {children}
    </Box>
  );
};

const SearchIconWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};

const SplitgraphTopBar = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "topbar-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem
        component={NextLinkComposed}
        to={{ pathname: "/mui/buynow" }}
        onClick={handleMenuClose}
      >
        Settings
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "topbar-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          disableRipple
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <LogoImage logoURL={"/static/splitgraph_logo_black_nocircle.svg"} />
          {/* <LogoText text={"Splitgraph"} /> */}
          <h6>&nbsp;Splitgraph</h6>
          <SGRSearch>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <InputBase
              sx={{
                color: "inherit",
                "& .MuiInputBase-input": {
                  padding: theme.spacing(1, 1, 1, 0),
                  // vertical padding + font size from searchIcon
                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  transition: theme.transitions.create("width"),
                  width: "100%",
                  [theme.breakpoints.up("md")]: {
                    width: "20ch",
                  },
                },
              }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </SGRSearch>
          <Box sx={{ flexGrow: 1 }} />
          {/* If we skip ts checking in MuiLink, this causes a runtime error
          for missing the href prop: */}
          {/* <Link sx={{ color: "white" }}>Buy Now!</Link> */}

          {/* When we don't skip checking in MuiLink, but spread other as any,
          this correctly causes a compile time error for missing href prop: */}
          {/* <Link sx={{ color: "white" }}>Buy Now!</Link> */}

          <Link
            sx={{ marginRight: "1em", color: "black" }}
            href={"/workspace/ddn"}
          >
            Query
          </Link>
          <Link sx={{ marginRight: "1em" }} href={"/mui/buynow"}>
            Dropdown
          </Link>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              disableRipple
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              disableRipple
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default SplitgraphTopBar;
