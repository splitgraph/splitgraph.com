/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import MenuItem, { MenuItemProps } from "./MenuItem";

export interface IMenuItemHeadingProps extends MenuItemProps {}

const MenuItemHeading = (props: IMenuItemHeadingProps) => {
  return <MenuItem isHeading={true} {...props} />;
};

export default MenuItemHeading;
