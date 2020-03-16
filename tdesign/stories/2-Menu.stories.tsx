import React from 'react';

import { ThemeProvider } from 'theme-ui';

import {
  BaseLayout,
  TwoColumnLayout,
  TwoColumnLayoutMain,
  TwoColumnLayoutLeft,
  Menu,
  MenuItem,
  MenuItemHeading,
  makeDefaultTheme,
  IconDollarSign,
  IconEmail,
  IconHelpCircle,
  IconKey,
  IconLink,
  IconUser,
  IconUsers,
} from '@';

const defaultTheme = !!makeDefaultTheme ? makeDefaultTheme() : {};

export default {
  title: 'Menus',
};

export const sidebarMenuStory = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TwoColumnLayout>
        <TwoColumnLayoutLeft>
          <Menu>
            <MenuItem Icon={IconUser} href="#" text={'Profile'} />
            <MenuItem Icon={IconEmail} href="#" text={'Emails '} />
            <MenuItem Icon={IconKey} href="#" text={'Password'} />
            <MenuItem Icon={IconLink} href="#" text={'Linked Accounts'} />
            <MenuItem
              Icon={IconKey}
              href="#"
              text={'API Keys'}
              isActive={true}
            />
            <MenuItem Icon={IconDollarSign} href="#" text={'Billing'} />
            <MenuItem Icon={IconHelpCircle} href="#" text={'Help & Support'} />
          </Menu>
        </TwoColumnLayoutLeft>
        <TwoColumnLayoutMain>Main</TwoColumnLayoutMain>
      </TwoColumnLayout>
    </ThemeProvider>
  );
};

sidebarMenuStory.story = {
  name: 'Basic Menu',
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
};

export const menuWithHeadings = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TwoColumnLayout>
        <TwoColumnLayoutLeft>
          <Menu>
            <MenuItemHeading text={'User Info'} />
            <MenuItem Icon={IconUser} href="#" text={'Profile'} />
            <MenuItem Icon={IconEmail} href="#" text={'Emails '} />
            <MenuItem Icon={IconLink} href="#" text={'Linked Accounts'} />

            <MenuItemHeading text={'Security'} />
            <MenuItem Icon={IconKey} href="#" text={'Password'} />
            <MenuItem
              Icon={IconKey}
              href="#"
              text={'API Keys'}
              isActive={true}
            />

            <MenuItemHeading text={'Other'} />
            <MenuItem Icon={IconDollarSign} href="#" text={'Billing'} />
            <MenuItem Icon={IconHelpCircle} href="#" text={'Help & Support'} />
          </Menu>
        </TwoColumnLayoutLeft>
        <TwoColumnLayoutMain>Main</TwoColumnLayoutMain>
      </TwoColumnLayout>
    </ThemeProvider>
  );
};

menuWithHeadings.story = {
  name: 'Menu With Headings',
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
};
