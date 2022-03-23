import { documentIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconDocument = (props: IIconProps) => {
  return <BaseIcon iconSlug={"document"} svgURI={documentIconURI} {...props} />;
};

export default IconDocument;
