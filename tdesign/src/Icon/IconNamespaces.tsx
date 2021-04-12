/** @jsxImportSource @emotion/react */

import { namespaceIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconNamespaces = (props: IIconProps) => {
  return <BaseIcon iconSlug={"all"} svgURI={namespaceIconURI} {...props} />;
};

export default IconNamespaces;
