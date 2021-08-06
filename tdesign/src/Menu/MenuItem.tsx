import { useContext, useEffect, useRef } from "react";
import { Box, Typography } from "@material-ui/core";
import type { SxProps } from "@material-ui/system";
import type { Theme } from "@material-ui/core/styles/createMuiTheme";
import { useTheme } from "@material-ui/core/styles";

import { IIconProps } from "../Icon/BaseIcon";
import { MuiLink as Link } from "../Link";
import { LayoutContext } from "../Layout/TwoColumnLayout";

export interface MenuItemProps {
  // TODO: Figure out generics, should be something like React.FC<IIconProps>
  Icon?: any;
  href?: string;
  as?: string;
  text?: React.ReactNode;
  iconProps?: IIconProps;
  iconSx?: any;
  isActive?: boolean;
  scrollIntoViewIfNeeded?: boolean;
  isHeading?: boolean;
  activeIconColor?: string | ((theme: Theme) => string);
  defaultIconColor?: string | ((theme: Theme) => string);
}

const MenuItem = ({
  Icon,
  href,
  // as,
  text,
  iconSx = {},
  isActive = false,
  scrollIntoViewIfNeeded = true,
  isHeading = false,
  activeIconColor,
  defaultIconColor,
}: MenuItemProps) => {
  const { expanded } = useContext(LayoutContext);
  const theme = useTheme();

  if (!defaultIconColor) {
    defaultIconColor = theme.palette.getContrastText(
      theme.palette.surfaces.light.background.main
    );
  }

  const itemRef = useRef<HTMLLIElement>(null);
  const scrolltoItem = () =>
    itemRef &&
    itemRef.current &&
    itemRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (isActive && scrollIntoViewIfNeeded) {
      scrolltoItem();
    }
  }, [isActive, expanded]);

  const containerStyle: SxProps<Theme> = {
    display: [
      expanded ? "flex" : "inline-flex",
      expanded ? "flex" : "inline-flex",
      "flex",
    ],
    justifyContent: "space-between",
    ".menu-item-label--heading": {
      color: "muted",
      fontSize: "small",
      textTransform: "uppercase",
    },
    "a:hover": {
      textDecoration: "underline",
    },
    "a.menu-item-label--active": {
      color: "link.main",
    },
    "a:not(.menu-item-label--active)": {
      color: (theme) =>
        theme.palette.getContrastText(
          theme.palette.surfaces.light.background.main
        ),
      textDecoration: "none",
    },
    ":hover": {
      cursor: !href ? "initial" : "pointer",
    },
  };

  // const linkStyle: SxProps<Theme> = {
  //   ":hover": {
  //     textDecoration: "underline",
  //   },
  // };

  const textStyle = {};

  const iconStyle: SxProps<Theme> = {
    marginRight: "0.5em",
    ...iconSx,
  };

  const activeClassName = isActive ? "active" : "inactive";
  const headingClassName = isHeading ? "heading" : "text";

  const listItemClassName = `menu-item menu-item--${activeClassName} menu-item--${headingClassName}`;
  const innerContainerClassName = `menu-item-inner-container menu-item-inner-container--${activeClassName} menu-item-inner-container--${headingClassName}`;
  const linkClassName = `menu-item-label menu-item-link menu-item-label--${activeClassName} menu-item-label--${headingClassName}`;
  const textClassName = `menu-item-label menu-item-text menu-item-label--${activeClassName} menu-item-label--${headingClassName}`;
  return (
    <li className={listItemClassName} ref={itemRef}>
      <Box sx={containerStyle} className={innerContainerClassName}>
        {Icon && (
          <Icon
            extraStyle={iconStyle}
            color={isActive ? activeIconColor ?? "link.main" : defaultIconColor}
          />
        )}{" "}
        {href ? (
          <Link
            // extraStyle={linkStyle} // TODO consider if still needed?
            href={href}
            className={linkClassName}
          >
            {text}
          </Link>
        ) : (
          <Typography className={textClassName} sx={textStyle}>
            {text}
          </Typography>
        )}
      </Box>
    </li>
  );
};

export default MenuItem;
