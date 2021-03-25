/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { sqlConsoleIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconSQLConsole = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"sqlConsole"} svgURI={sqlConsoleIconURI} {...props} />
  );
};

export default IconSQLConsole;
