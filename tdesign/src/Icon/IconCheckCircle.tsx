import { checkCircleIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconCheckCircle = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"checkCircle"} svgURI={checkCircleIconURI} {...props} />
  );
};

export default IconCheckCircle;
