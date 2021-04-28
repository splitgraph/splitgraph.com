import { useContext, useEffect, useRef } from "react";
import { Box, Typography } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

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
}: MenuItemProps) => {
  const { expanded } = useContext(LayoutContext);

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
    filter: "invert(1)",
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
        {Icon && <Icon extraStyle={iconStyle} />}{" "}
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
