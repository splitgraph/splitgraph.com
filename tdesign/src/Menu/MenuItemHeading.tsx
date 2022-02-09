import MenuItem, { MenuItemProps } from "./MenuItem";

const MenuItemHeading = (props: MenuItemProps) => {
  return <MenuItem isHeading={true} {...props} />;
};

export default MenuItemHeading;
