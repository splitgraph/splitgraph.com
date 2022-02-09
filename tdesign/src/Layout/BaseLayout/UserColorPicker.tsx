import { useState, forwardRef, ComponentProps } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Card as MuiCard,
  CardHeader,
  CardContent,
  Slide,
  SlideProps,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const UserColorPicker = ({
  userColors,
  setUserColors,
  toggleDarkMode,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span>
      {/* TODO: fix me */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <span onClick={handleOpen}>🎨</span>
      <ColorDialog
        userColors={userColors}
        setUserColors={setUserColors}
        toggleDarkMode={toggleDarkMode}
        open={open}
        onClose={handleClose}
      />
    </span>
  );
};

const Transition = forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
Transition.displayName = "Transition";

const ColorDialog = ({
  onClose,
  open,
  userColors: {
    userPrimaryColor,
    userNavbarLight,
    userNavbarDark,
    userFooterLight,
    userFooterDark,
  },
  userColors,
  setUserColors,
  toggleDarkMode,
}) => {
  const theme = useTheme();
  const handleClose = () => {
    // TODO: consider (roughly) `setColorMutation.then(() => Snackbar.show('successfully set colors'))`
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
      maxWidth="lg"
    >
      <DialogTitle>Major colors</DialogTitle>
      <DialogContent>
        <form action="none">
          <Stack spacing={2} direction="row">
            <Card>
              <CardHeader
                title="Primary"
                subheader="theme.palette.primary.main"
              />
              <CardContent>
                <input
                  type="color"
                  name="userPrimaryColor"
                  value={userPrimaryColor}
                  onChange={(e) =>
                    setUserColors({
                      ...userColors,
                      userPrimaryColor: e.target.value,
                    })
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="NavbarLight"
                subheader="theme.palette.navbar.light"
              />
              <CardContent>
                <input
                  type="color"
                  name="userNavbarLight"
                  value={userNavbarLight}
                  onChange={(e) =>
                    setUserColors({
                      ...userColors,
                      userNavbarLight: e.target.value,
                    })
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="NavbarDark"
                subheader="theme.palette.navbar.dark"
              />
              <CardContent>
                <input
                  type="color"
                  name="userNavbarDark"
                  value={userNavbarDark}
                  onChange={(e) =>
                    setUserColors({
                      ...userColors,
                      userNavbarDark: e.target.value,
                    })
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="FooterLight"
                subheader="theme.palette.footer.light"
              />
              <CardContent>
                <input
                  type="color"
                  name="userFooterLight"
                  value={userFooterLight}
                  onChange={(e) =>
                    setUserColors({
                      ...userColors,
                      userFooterLight: e.target.value,
                    })
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="FooterDark"
                subheader="theme.palette.footer.dark"
              />
              <CardContent>
                <input
                  type="color"
                  name="userFooterDark"
                  value={userFooterDark}
                  onChange={(e) =>
                    setUserColors({
                      ...userColors,
                      userFooterDark: e.target.value,
                    })
                  }
                />
              </CardContent>
            </Card>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button variant="outlined" onClick={toggleDarkMode}>
            toggle dark mode
          </Button>
          &nbsp;
          <Button variant="outlined" onClick={() => console.log(theme)}>
            console.log(theme)
          </Button>
        </div>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Card = (props: ComponentProps<typeof MuiCard>) => (
  <MuiCard sx={{ minWidth: 150 }} {...props} />
);
