// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { logoDiscordIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconLogoDiscord = (props: IIconProps) => {
  return <BaseIcon iconSlug={'logoDiscord'} svgURI={logoDiscordIconURI} {...props} />;
};

export default IconLogoDiscord;

