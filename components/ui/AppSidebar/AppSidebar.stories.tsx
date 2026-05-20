import type {Meta, StoryObj} from '@storybook/react';

import {AppSidebar} from './AppSidebar';

const meta: Meta<typeof AppSidebar> = {
  title: 'UI/AppSidebar',
  component: AppSidebar,
  parameters: {layout: 'fullscreen'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  args: {},
};

export const ActiveDashboard: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
};

export const ActiveCoverLetters: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/cover-letters',
      },
    },
  },
};
