// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

export interface ILogoImageProps {
  logoURL?: string;
}

const logoImageStyle = {
  maxHeight: '2rem',
  marginLeft: 4,
};

const defaultLogoURL = '/static/splitgraph_logo.svg';

export default ({ logoURL = defaultLogoURL }: ILogoImageProps) => {
  return <img src={logoURL} style={logoImageStyle} />;
};
