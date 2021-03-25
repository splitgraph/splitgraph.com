/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { databaseIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconDatabase = (props: IIconProps) => {
  return <BaseIcon iconSlug={"database"} svgURI={databaseIconURI} {...props} />;
};

export default IconDatabase;
