import { Avatar as MUIAvatar } from "@material-ui/core";
import type { SxProps } from "@material-ui/system";
import type { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface IAvatarProps {
  height?: number;
  avatarURL?: string;
  initials?: string;
  sx?: SxProps<Theme>;
}

const defaultAvatarContainerStyle = {
  marginLeft: "auto",
  marginRight: "auto",
};

const Avatar = ({ avatarURL, initials, sx, height }: IAvatarProps) => {
  return (
    <MUIAvatar
      sx={{
        ...defaultAvatarContainerStyle,
        ...sx,
        height,
      }}
    >
      {!avatarURL && initials}
      {avatarURL && <img src={avatarURL} height={height} />}
    </MUIAvatar>
  );
};

export default Avatar;
