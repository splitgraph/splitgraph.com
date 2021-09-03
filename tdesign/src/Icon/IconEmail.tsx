import { emailIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconEmail = (props: IIconProps) => {
  return <BaseIcon iconSlug={"email"} svgURI={emailIconURI} {...props} />;
};

export default IconEmail;
