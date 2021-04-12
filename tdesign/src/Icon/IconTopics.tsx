/** @jsxImportSource @emotion/react */

import { topicsIcon } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconTopics = (props: IIconProps) => {
  return <BaseIcon iconSlug={"all"} svgURI={topicsIcon} {...props} />;
};

export default IconTopics;
