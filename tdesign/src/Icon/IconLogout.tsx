import { logoutIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconAccount = (props: IIconProps) => {
  return <BaseIcon iconSlug={"logout"} svgURI={logoutIconURI} {...props} />;
};

export default IconAccount;
