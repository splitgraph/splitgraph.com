import { forwardRef } from "react";
import { Box, Input as MuiInput, InputProps } from "@material-ui/core/";
import { DangerText, MutedText, SuccessText, WarningText } from "../Text";

export interface IInputProps extends InputProps {
  error?: any;
  okText?: string | null;
  warningText?: string | null;
  validating?: boolean;
  touched?: boolean;
  validatingText?: string | null;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      sx = {},
      error = null,
      okText = null,
      warningText = null,
      validating = false,
      validatingText = null,
      touched = true,

      // TODO: Convert this file to TS. Until then, be explicit about id and name
      //       (as opposed to including them in ...rest), so other files don't
      //       get in trouble for using id={} and name={} props.
      id,
      name,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        <MuiInput
          ref={ref}
          sx={{
            width: 200,
            borderColor: error ? "danger" : "initial",
          }}
          id={id}
          name={name}
          {...(rest as any)}
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
              {(typeof error !== "string" && error.message) ||
                error.toString() ||
                "Invalid"}
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
    );
  }
);

export default Input;
