import { searchIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconSearch = (props: IIconProps) => {
  return <BaseIcon iconSlug={"search"} svgURI={searchIconURI} {...props} />;
};

export default IconSearch;
