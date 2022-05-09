import {
  Box,
  Grid,
  Typography,
  FormControl,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { IconCheck, IconDelete } from "../Icon";
import { PreWithCopy } from "../PreWithCopy";

interface ISQLCredentialsNicknameRowProps {
  name?: string;
  nickname?: string;
  handleDelete?: () => void;
  idUsernamePrefix?: string;
  deleteButton?: React.ReactNode;
}

const SQLCredentialsNicknameRow = ({
  name,
  handleDelete,
  idUsernamePrefix,
  deleteButton,
  nickname,
}: ISQLCredentialsNicknameRowProps) => {
  const [nicknameInputValue, setNicknameInputValue] = useState(nickname);
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
                onChange={(change) => {
                  setNicknameInputValue(change.target.value);
                }}
                endAdornment={
                  nicknameInputValue === (nickname ?? "") ? null : (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(...args) =>
                          console.log("save  nickname", ...args)
                        }
                        aria-label="Save credential nickname"
                        edge="end"
                        size="large"
                      >
                        <IconCheck color={"flambeeGreen.light"} />
                      </IconButton>
                    </InputAdornment>
                  )
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
