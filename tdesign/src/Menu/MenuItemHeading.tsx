import MenuItem, { MenuItemProps } from "./MenuItem";

export interface IMenuItemHeadingProps extends MenuItemProps {}

const MenuItemHeading = (props: IMenuItemHeadingProps) => {
  return <MenuItem isHeading={true} {...props} />;
};

export default MenuItemHeading;
