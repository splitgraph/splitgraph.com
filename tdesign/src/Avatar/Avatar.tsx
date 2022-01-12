import { Avatar as MUIAvatar } from "@mui/material";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

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
        height,
        ...sx,
      }}
    >
      {!avatarURL && initials}
      {avatarURL && <img src={avatarURL} height={height} />}
    </MUIAvatar>
  );
};

export default Avatar;
