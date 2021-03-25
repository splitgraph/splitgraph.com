/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { alertInfoCircleIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconAlertInfoCircle = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"alertInfoCircle"}
      svgURI={alertInfoCircleIconURI}
      {...props}
    />
  );
};

export default IconAlertInfoCircle;
