import React from 'react';

import { InFieldButton, Input } from '@splitgraph/tdesign';

export default {
  title: 'Splitgraph/InFieldButton',
  component: InFieldButton,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = (args) => <Input variant="outlined"><InFieldButton {...args} /></Input>;

export const Medium = Template.bind({});
Medium.args = {
  children: "Create",
  disabled: false,
};

