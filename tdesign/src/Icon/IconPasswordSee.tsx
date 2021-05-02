import { passwordSeeURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconPasswordSee = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"password-see"} svgURI={passwordSeeURI} {...props} />
  );
};

export default IconPasswordSee;
