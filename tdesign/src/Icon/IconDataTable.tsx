/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { dataTableIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconDataTable = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"dataTable"} svgURI={dataTableIconURI} {...props} />
  );
};

export default IconDataTable;
