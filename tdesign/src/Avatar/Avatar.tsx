import { Box } from "@material-ui/core";
export interface IAvatarProps {
  avatarURL?: string;
  initials?: string;
}

const avatarContainerStyle = {
  borderRadius: "50%",
  backgroundColor: "text",
  color: "sgLightBlue.main",
  minHeight: "4vh",
  minWidth: "4vh",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "sgLightBlue.main",
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
