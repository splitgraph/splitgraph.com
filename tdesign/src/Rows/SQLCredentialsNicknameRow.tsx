import {
  Box,
  Grid,
  Typography,
  FormControl,
  Button,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { IconCopy, IconDelete } from "../Icon";

interface ISQLCredentialsNicknameRowProps {
  name?: string;
  nickname?: string;
  handleDelete?: () => void;
  idUsernamePrefix?: string;
  deleteButton?: React.ReactNode;
  saveNicknameButton?: React.ReactNode;
  setNewNickname?: (nickname: string) => void;
  onCopy?: () => void;
}

const UsernameField = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.surfaces.sql.main,
  borderRadius: "4px",
  flexGrow: 1,
  boxSizing: "border-box",
  height: "100%",
  flexDirection: "row",
  alignContent: "center",
  alignItems: "center",
  padding: "4px 16px 4px 16px",
  fontFamily: "monospace",
}));

const CopyIconBox = styled(Box)({
  display: "flex",
  flexGrow: 0,
  ":hover": {
    cursor: "pointer",
  },
});

const DeleteIconBox = styled(Box)({
  display: "flex",
  flexGrow: 0,
});

const Wrapper = styled(Box)({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const Container = styled(Box)({
  display: "flex",
  boxSizing: "border-box",
  flexDirection: "row",
  flexGrow: 1,
});

const UsernameWithBreak = ({ username }: { username: string }) => {
  const splitIndex = Math.floor(username.length / 2);
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
      }}
    >
      {username.slice(0, splitIndex)}
      <wbr />
      {username.slice(splitIndex)}
    </Box>
  );
};

const SQLCredentialsNicknameRow = ({
  name,
  handleDelete,
  idUsernamePrefix,
  deleteButton = (
    <Button onClick={handleDelete}>
      <IconDelete />
    </Button>
  ),
  nickname,
  saveNicknameButton,
  setNewNickname,
  onCopy,
}: ISQLCredentialsNicknameRowProps) => {
  const codeRef = React.useRef<HTMLElement>(null);
  const handleClickCopy = () => {
    if (typeof window === "undefined") {
      return;
    }

    if (!codeRef.current) {
      return;
    }

    const range = document.createRange();
    range.selectNode(codeRef.current);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    document.execCommand("copy");
    if (onCopy) {
      onCopy();
    }
  };

  return (
    <Box
      sx={{
        p: "1em",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02);",
        borderRadius: "4px",
        border: ({ palette }) => `1px solid ${palette.grays.gray26.main};`,
      }}
    >
      <FormControl fullWidth variant="outlined">
        <Grid container spacing={3}>
          {/* Left-hand column with nickname */}
          <Grid item sm={12} md={6} className="value-area">
            <label htmlFor={`${idUsernamePrefix + "-"}nickname-input`}>
              <Typography variant="small">Nickname</Typography>
            </label>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <OutlinedInput
                id={`${idUsernamePrefix + "-"}nickname-input`}
                fullWidth
                defaultValue={nickname}
                sx={{}}
                disabled={setNewNickname === undefined}
                onChange={(change) => {
                  setNewNickname(change.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && saveNicknameButton) {
                    (saveNicknameButton as any)?.props?.onClick();
                  }
                }}
                endAdornment={
                  saveNicknameButton ? (
                    <InputAdornment position="end">
                      {saveNicknameButton}
                    </InputAdornment>
                  ) : null
                }
              />
            </Box>
          </Grid>

          {/* Right-hand column with username and delete button */}
          <Grid item xs className="value-area" sx={{}}>
            <Wrapper>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <Typography variant="small">Username</Typography>
              </label>
              <Container>
                <UsernameField ref={codeRef}>
                  <UsernameWithBreak username={name}></UsernameWithBreak>
                  <CopyIconBox
                    onClick={handleClickCopy}
                    title="Copy to clipboard"
                  >
                    <IconCopy color="link.main" />
                  </CopyIconBox>
                </UsernameField>
                <DeleteIconBox>{deleteButton}</DeleteIconBox>
              </Container>
            </Wrapper>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
};

export default SQLCredentialsNicknameRow;
