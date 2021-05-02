import { accountIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconAccount = (props: IIconProps) => {
  return <BaseIcon iconSlug={"account"} svgURI={accountIconURI} {...props} />;
};

export default IconAccount;
