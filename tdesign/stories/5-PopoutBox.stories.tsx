import { withKnobs, select } from '@storybook/addon-knobs';

import { ThemeProvider, Box } from 'theme-ui';

import { Button, makeDefaultTheme, PopoutBox } from '@';

const defaultTheme = !!makeDefaultTheme ? makeDefaultTheme() : {};

export default {
  title: 'PopoutBox',
  decorators: [withKnobs],
};

const Opener = ({ isOpen, ...rest }) => {
  const variant = isOpen ? 'outline' : 'primary';
  return (
    <Button variant={variant} {...rest}>
      Click Me
    </Button>
  );
};

export const basicPopoutBox = () => {
  const anchorPosition = select(
    'Anchor Position',
    ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    'bottomRight'
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ padding: '5rem', backgroundColor: 'white' }}>
        <PopoutBox
          anchorPosition={anchorPosition}
          renderButton={props => <Opener {...props} />}
          popoutContainerStyle={{
            borderStyle: 'solid',
            borderColor: 'primary',
            borderWidth: '1px',
          }}
        >
          Something
        </PopoutBox>
      </Box>
    </ThemeProvider>
  );
};

basicPopoutBox.story = {
  name: 'PopoutBox',
};
