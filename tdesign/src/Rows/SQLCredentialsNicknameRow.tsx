import { Box, Grid, Typography, FormControl, Button } from "@material-ui/core";
import { InputWithCopy, Input } from "../Input";
import { IconDelete } from "../Icon";

interface ISQLCredentialsNicknameRowProps {
  name?: string;
  handleDelete?: () => void;
  idNicknamePrefix?: string;
  idUsernamePrefix?: string;
  deleteButton?: React.ReactNode;
}

const SQLCredentialsNicknameRow = ({
  name,
  handleDelete,
  idNicknamePrefix,
  idUsernamePrefix,
  deleteButton,
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
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <FormControl fullWidth>
              <label htmlFor={`${idNicknamePrefix + "-"}nickname-input`}>
                <Typography variant="small">Nickname</Typography>
              </label>
              <Input
                id={`${idNicknamePrefix + "-"}nickname-input`}
                fullWidth
              ></Input>
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={6} sx={{ display: "flex" }}>
          <FormControl fullWidth variant="outlined">
            <label htmlFor={`${idUsernamePrefix + "-"}username-input`}>
              <Typography variant="small">Username</Typography>
            </label>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <InputWithCopy
                id={`${idUsernamePrefix + "-"}username-input`}
                fullWidth
                defaultValue={name}
                sx={{}}
              />
              <Box sx={{ ml: "1rem" }}>
                {deleteButton || (
                  <Button onClick={handleDelete}>
                    <IconDelete />
                  </Button>
                )}
              </Box>
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SQLCredentialsNicknameRow;
