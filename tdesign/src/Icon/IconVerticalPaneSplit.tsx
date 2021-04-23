import { verticalPaneSplitIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconVerticalPaneSplit = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"verticalPaneSplit"}
      svgURI={verticalPaneSplitIconURI}
      {...props}
    />
  );
};

export default IconVerticalPaneSplit;
