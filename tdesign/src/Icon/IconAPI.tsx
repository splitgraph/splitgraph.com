import { apiIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconAPI = (props: IIconProps) => {
  return <BaseIcon iconSlug={"api"} svgURI={apiIconURI} {...props} />;
};

export default IconAPI;
