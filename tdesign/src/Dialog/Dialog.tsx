import {
  Dialog as MuiDialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

interface IDialogProps extends DialogProps {
  open: boolean;
  title?: string;
  setShowDialog: (T: boolean) => void;
  children: React.ReactNode;
}

const Dialog = ({
  open,
  title,
  setShowDialog,
  children,
  ...rest
}: IDialogProps) => {
  return (
    <MuiDialog
      open={open}
      // fullScreen
      aria-labelledby={title}
      sx={{
        ".MuiDialogContent-root": { py: 0 },
      }}
      {...(rest as any)}
    >
      <CloseableDialogTitle
        id={title}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        {title}
      </CloseableDialogTitle>
      <DialogContent sx={{ justifyContent: "flex-end" }}>
        {children}
      </DialogContent>
    </MuiDialog>
  );
};
export default Dialog;

export interface ICloseableDialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const CloseableDialogTitle = (props: ICloseableDialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      disableTypography
      sx={{
        m: 0,
        p: 2,
      }}
      {...other}
    >
      <Typography variant="h6" component="div">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.flambeeDarkGray.dark,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
