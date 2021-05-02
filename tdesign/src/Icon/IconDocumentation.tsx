import { documentationURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconDelete = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"documentation"} svgURI={documentationURI} {...props} />
  );
};

export default IconDelete;
