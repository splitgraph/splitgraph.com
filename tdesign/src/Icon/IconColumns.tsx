/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { columnsIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconColumns = (props: IIconProps) => {
  return <BaseIcon iconSlug={"columns"} svgURI={columnsIconURI} {...props} />;
};

export default IconColumns;
