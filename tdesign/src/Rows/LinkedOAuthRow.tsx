import { Box, Typography, Avatar, Tooltip } from "@mui/material";

interface ILinkedOAuthRowProps {
  name: string;
  emails: Array<string>;
  idp_id: string;
  avatar?: string;
  children: React.ReactNode;
}

const LinkedOAuthRow = ({
  name,
  emails,
  idp_id,
  avatar,
  children,
}: ILinkedOAuthRowProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: "1em",
      boxSizing: "border-box",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02);",
      borderRadius: "4px",
      border: ({ palette }) => `1px solid ${palette.grays.gray26.main};`,
      ul: {
        listStyleType: "none",
        paddingInlineStart: 0,
        marginBottom: 0,
      },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar alt={name}>{avatar}</Avatar>
      <Box sx={{ ml: "1rem" }}>
        <Typography variant="subtitle1">{name}</Typography>
        <Tooltip title={idp_id}>
          <ul className={"ul"}>
            {!!emails &&
              emails?.length &&
              emails.map((email) => (
                <li key={email}>
                  <Typography variant="body">{email}</Typography>
                </li>
              ))}
          </ul>
        </Tooltip>
      </Box>
    </Box>
    {children}
  </Box>
);

export default LinkedOAuthRow;
