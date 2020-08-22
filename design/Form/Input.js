import { Box } from "rebass";
import { Input } from "@rebass/forms";

import DangerText from "../Text/DangerText";
import MutedText from "../Text/MutedText";
import SuccessText from "../Text/SuccessText";
import WarningText from "../Text/WarningText";

export default React.forwardRef(
  (
    {
      sx = {},
      error = null,
      okText = null,
      warningText = null,
      validating = false,
      validatingText = null,
      touched = true,
      ...rest
    } = {},
    ref
  ) => (
    <>
      <Input
        ref={ref}
        sx={{
          width: 200,
          borderColor: error ? "danger" : "initial",
          ...sx,
        }}
        {...rest}
      />

      <Box
        mt={2}
        sx={{
          ".danger-text,.warning-text,.success-text": {
            maxWidth: "fit-content",
          },
        }}
      >
        {validating ? (
          <MutedText>&#9850; {validatingText} ...</MutedText>
        ) : error ? (
          <DangerText>
            <b style={{ marginRight: "5px" }}>&#88;</b>
            {error.message || error.toString() || "Invalid"}
          </DangerText>
        ) : warningText && touched ? (
          <WarningText>
            <b style={{ marginRight: "5px" }}>&#9888;</b> {warningText}
          </WarningText>
        ) : okText && touched ? (
          <SuccessText>
            <b>&#10003;</b> {okText}
          </SuccessText>
        ) : (
          <SuccessText>&nbsp;</SuccessText>
        )}
      </Box>
    </>
  )
);
