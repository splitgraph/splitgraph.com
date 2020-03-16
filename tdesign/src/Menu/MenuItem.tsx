// @jsx jsx
// @ts-ignore
import { jsx, Box, Text } from 'theme-ui';
import * as React from 'react';
import { useContext } from 'react';

import { IIconProps } from '../Icon/BaseIcon';
import { Link } from '../Link';
import { LayoutContext } from '../Layout/TwoColumnLayout';

export interface MenuItemProps {
  // TODO: Figure out generics, should be something like React.FC<IIconProps>
  Icon?: any;
  href?: string;
  text?: string;
  iconProps?: IIconProps;
  iconSx?: any;
}

export default ({ Icon, href, text, iconSx = {} }: MenuItemProps) => {
  const { expanded } = useContext(LayoutContext);

  const containerStyle = {
    display: [
      expanded ? 'flex' : 'inline-flex',
      expanded ? 'flex' : 'inline-flex',
      'flex',
    ],
    justifyContent: 'space-between',
    ':hover': {
      cursor: 'pointer',
    },
  };

  const labelStyle = {
    ':hover': {
      textDecoration: 'underline',
    },
  };

  const iconStyle = {
    filter: 'invert(1)',
    marginRight: '0.5em',
    ...iconSx,
  };

  return (
    <li className="menu-item">
      <Box sx={containerStyle} className="menu-item-inner-container">
        <Icon sx={iconStyle} />{' '}
        {href ? (
          <Link
            sx={labelStyle}
            href={href}
            className="menu-item-label menu-item-link"
          >
            {text}
          </Link>
        ) : (
          <Text className="menu-item-label menu-item-text" sx={labelStyle}>
            {text}
          </Text>
        )}
      </Box>
    </li>
  );
};
