/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx, Box, Text, SystemStyleObject } from "theme-ui";
import * as React from "react";
import { useContext, useEffect, useRef } from "react";

import { IIconProps } from "../Icon/BaseIcon";
import { Link } from "../Link";
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
  as,
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

  const containerStyle = {
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

  const linkStyle = {
    ":hover": {
      textDecoration: "underline",
    },
  };

  const textStyle = {};

  const iconStyle = {
    filter: "invert(1)",
    marginRight: "0.5em",
    ...iconSx,
  } as SystemStyleObject;

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
            extraStyle={linkStyle}
            href={href}
            as={as}
            className={linkClassName}
          >
            {text}
          </Link>
        ) : (
          <Text className={textClassName} sx={textStyle}>
            {text}
          </Text>
        )}
      </Box>
    </li>
  );
};

export default MenuItem;
