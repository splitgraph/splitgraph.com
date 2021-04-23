import { columnsIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconColumns = (props: IIconProps) => {
  return <BaseIcon iconSlug={"columns"} svgURI={columnsIconURI} {...props} />;
};

export default IconColumns;
