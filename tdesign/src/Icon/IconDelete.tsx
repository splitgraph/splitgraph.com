import { deleteIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconDelete = (props: IIconProps) => {
  return <BaseIcon iconSlug={"delete"} svgURI={deleteIconURI} {...props} />;
};

export default IconDelete;
