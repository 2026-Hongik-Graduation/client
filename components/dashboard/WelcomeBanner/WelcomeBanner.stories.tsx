import type {Meta, StoryObj} from '@storybook/react';

import {WelcomeBanner} from './WelcomeBanner';

const meta: Meta<typeof WelcomeBanner> = {
  title: 'Dashboard/WelcomeBanner',
  component: WelcomeBanner,
  parameters: {layout: 'padded'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WelcomeBanner>;

export const Default: Story = {
  args: {},
};

export const WithUserName: Story = {
  args: {
    userName: '김민아',
  },
};
