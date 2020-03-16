// @jsx jsx
// @ts-ignore
import { jsx, Box } from 'theme-ui';
import * as React from 'react';
import { useContext } from 'react';
import { ILayoutContext, LayoutContext } from './TwoColumnLayout';

import {
  chevronsLeftURI,
  chevronsRightURI,
  chevronsDownURI,
  chevronsUpURI,
} from '../../Icon';

export interface TwoColumnLayoutLeftProps {
  children?: React.ReactNode;
}

// declare module 'react' {
//   interface Attributes extends SxProps {}
// }

// onClick={_e: React.MouseEvent<HTMLButtonElement> => (setExpanded ? setExpanded(!expanded) : true)}

const ExpandColumnPushDown = ({ expanded, setExpanded }: ILayoutContext) => {
  const pushdownStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    filter: 'invert(1) opacity(0.5)',
    borderTopWidth: '0px',
    borderTopStyle: 'solid',
    borderTopColor: 'heavy',
    backgroundImage: [
      expanded ? `url("${chevronsUpURI}")` : `url("${chevronsDownURI}")`,
      expanded ? `url("${chevronsUpURI}")` : `url("${chevronsDownURI}")`,
      expanded ? `url("${chevronsRightURI}")` : `url("${chevronsLeftURI}")`,
    ],
    backgroundPosition: ['center', 'center', 'right'],
    ':hover': {
      cursor: 'pointer',
    },
  };

  return (
    <Box
      className="expand-col-pushdown"
      sx={pushdownStyle}
      onClick={() => (setExpanded ? setExpanded(!expanded) : true)}
    >
      Expanded?{' '}
      <Box sx={{ display: ['flex', 'flex', 'none'] }}>{`${expanded}`}</Box>
      <Box sx={{ display: ['none', 'none', 'flex'] }}>{`${!expanded}`}</Box>
    </Box>
  );
};

export default ({ children }: TwoColumnLayoutLeftProps) => {
  const layoutContext = useContext(LayoutContext);

  const containerStyle = {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    '.two-col-left-inner': {
      minHeight: '10vh',
    },
    '.expand-col-pushdown': {
      minHeight: '5vh',
    },
  };

  return (
    <Box sx={containerStyle} className="two-col-left">
      <Box className="two-col-left-inner">{children}</Box>
      <ExpandColumnPushDown {...layoutContext} />
    </Box>
  );
};
