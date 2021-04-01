/** @jsxImportSource theme-ui */
// @ts-ignore

import { dataTableIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconDataTable = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"dataTable"} svgURI={dataTableIconURI} {...props} />
  );
};

export default IconDataTable;
