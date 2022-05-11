import {
  Box,
  Grid,
  Typography,
  FormControl,
  Button,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { IconDelete } from "../Icon";
import { PreWithCopy } from "../PreWithCopy";

interface ISQLCredentialsNicknameRowProps {
  name?: string;
  nickname?: string;
  handleDelete?: () => void;
  idUsernamePrefix?: string;
  deleteButton?: React.ReactNode;
  saveNicknameButton?: React.ReactNode;
  setNewNickname?: (nickname: string) => void;
}

const SQLCredentialsNicknameRow = ({
  name,
  handleDelete,
  idUsernamePrefix,
  deleteButton,
  nickname,
  saveNicknameButton,
  setNewNickname,
}: ISQLCredentialsNicknameRowProps) => {
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
          <Grid item xs={12} md={6} className="value-area">
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
          <Grid
            item
            xs={12}
            md={5}
            className="value-area"
            sx={{
              display: "flex",
              flexDirection: "row",
              // alignItems: "center",
            }}
          >
            <PreWithCopy
              title={"Username"}
              extraStyle={{ marginBottom: "1rem" }}
            >
              {name}
            </PreWithCopy>
          </Grid>
          <Grid
            item
            xs={12}
            md={1}
            className="value-area"
            sx={{
              display: "flex",
              flexDirection: "row",
              // alignItems: "center",
            }}
          >
            {deleteButton || (
              <Button onClick={handleDelete}>
                <IconDelete />
              </Button>
            )}
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
};

export default SQLCredentialsNicknameRow;
