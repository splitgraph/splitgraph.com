import { useEffect, forwardRef, useRef, MutableRefObject } from "react";
import {
  OutlinedInput,
  OutlinedInputProps,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { IconCopy } from "../Icon";

const useCombinedRefs = (...refs) => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

interface IInputWithCopy extends OutlinedInputProps {
  defaultValue?: string;
}
const InputWithCopy = forwardRef<HTMLInputElement, any>(
  ({ sx, ...rest }: IInputWithCopy, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const combinedRef: MutableRefObject<HTMLInputElement> = useCombinedRefs(
      ref,
      innerRef
    );

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const handleClickCopy = () => {
      if (typeof window === "undefined") {
        return;
      }

      if (combinedRef && "current" in combinedRef && combinedRef.current) {
        navigator.clipboard.writeText(combinedRef.current?.value);
      }
    };

    return (
      <OutlinedInput
        sx={{
          "& .MuiOutlinedInput-root": {
            background: ({ palette }) => palette.surfaces.sql.main,
            "& fieldset": {
              borderColor: ({ palette }) => palette.grays.gray26.main,
            },
            "&:hover fieldset": {
              borderColor: "flambeeBlue.light",
              boxShadow: "0px 4px 8px rgba(115, 176, 255, 0.15)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "flambeeBlue.light",
            },
          },
          "& .MuiOutlinedInput-root.Mui-error": {
            backgroundColor: ({ palette }) => palette.surfaces.error.main,
            "& fieldset": {
              borderColor: "#B62B35", //TODO should this be computed?
            },
          },
          ...sx,
        }}
        inputRef={combinedRef}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickCopy}
              onMouseDown={handleMouseDown}
              aria-label="input with click to copy"
              edge="end"
            >
              <IconCopy color={"flambeeBlue.main"} />
            </IconButton>
          </InputAdornment>
        }
        {...rest}
      />
    );
  }
);
export default InputWithCopy;
