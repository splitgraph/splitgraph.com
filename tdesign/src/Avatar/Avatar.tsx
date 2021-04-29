import { Box } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface IAvatarProps {
  avatarURL?: string;
  initials?: string;
}

const avatarContainerStyle = {
  borderRadius: "50%",
  backgroundColor: "text",
  color: "sglightblue.main",
  minHeight: "4vh",
  minWidth: "4vh",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "sglightblue.main",
  ".avatar-initials": {
    textTransform: "uppercase",
  },
};

const Avatar = ({ avatarURL, initials }: IAvatarProps) => {
  return (
    <Box sx={avatarContainerStyle}>
      {!avatarURL && initials && (
        <span className="avatar-initials">{initials}</span>
      )}
      {avatarURL && <img src={avatarURL} />}
    </Box>
  );
};

export default Avatar;
