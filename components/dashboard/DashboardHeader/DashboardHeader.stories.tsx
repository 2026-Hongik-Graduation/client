import type {Meta, StoryObj} from '@storybook/react';

import {DashboardHeader} from './DashboardHeader';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Dashboard/DashboardHeader',
  component: DashboardHeader,
  parameters: {layout: 'fullscreen'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {
  args: {},
};

export const ActiveExperiences: Story = {
  args: {
    activeNav: 'experiences',
  },
};

export const ActiveJobs: Story = {
  args: {
    activeNav: 'jobs',
  },
};

export const ActiveCoverLetters: Story = {
  args: {
    activeNav: 'cover-letters',
  },
};
