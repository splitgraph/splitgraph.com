import { settingsIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconSettings = (props: IIconProps) => {
  return <BaseIcon iconSlug={"settings"} svgURI={settingsIconURI} {...props} />;
};

export default IconSettings;
