// @jsx jsx
// @ts-ignore
import { jsx, Box } from 'theme-ui';
import * as React from 'react';

export interface IAvatarProps {
  avatarURL?: string;
  initials?: string;
}

const avatarContainerStyle = {
  borderRadius: '50%',
  backgroundColor: 'text',
  color: 'sglightblue',
  minHeight: '4vh',
  minWidth: '4vh',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'sglightblue',
};

export default ({ avatarURL, initials }: IAvatarProps) => {
  return (
    <Box sx={avatarContainerStyle}>
      {!avatarURL && initials && <span>{initials}</span>}
      {avatarURL && <img src={avatarURL} />}
    </Box>
  );
};
