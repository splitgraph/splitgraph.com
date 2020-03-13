import React from 'react';

import { SubmitButton } from '@';

export default {
  title: 'Basic Storybook Setup',
};

export const buttonStory = () => (
  <SubmitButton sx={{ backgroundColor: 'green' }}>Green Button</SubmitButton>
);

export const anotherButtonStory = () => (
  <SubmitButton sx={{ backgroundColor: 'red' }}>Red Button</SubmitButton>
);

buttonStory.story = {
  name: 'green button',
};

anotherButtonStory.story = {
  name: 'red button',
};
