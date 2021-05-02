import { passwordHideURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconPasswordHide = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"password-hide"} svgURI={passwordHideURI} {...props} />
  );
};

export default IconPasswordHide;
