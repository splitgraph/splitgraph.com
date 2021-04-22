import { logoRedditIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLogoReddit = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"logoReddit"} svgURI={logoRedditIconURI} {...props} />
  );
};

export default IconLogoReddit;
