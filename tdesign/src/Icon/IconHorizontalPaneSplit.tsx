import { horizontalPaneSplitIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconHorizontalPaneSplit = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"horizontalPaneSplit"}
      svgURI={horizontalPaneSplitIconURI}
      {...props}
    />
  );
};

export default IconHorizontalPaneSplit;
