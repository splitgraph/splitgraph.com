/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";

export interface IAvatarProps {
  avatarURL?: string;
  initials?: string;
}

const avatarContainerStyle = {
  borderRadius: "50%",
  backgroundColor: "text",
  color: "sglightblue",
  minHeight: "4vh",
  minWidth: "4vh",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "sglightblue",
  ".avatar-initials": {
    textTransform: "uppercase",
  },
} as SystemStyleObject;

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
