import type {Meta, StoryObj} from '@storybook/react';

import {StatCardGrid} from './StatCardGrid';

const meta: Meta<typeof StatCardGrid> = {
  title: 'Dashboard/StatCardGrid',
  component: StatCardGrid,
  parameters: {layout: 'padded'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatCardGrid>;

export const Default: Story = {
  args: {
    stats: {
      experienceCount: 3,
      jobCount: 2,
      coverLetterCount: 1,
    },
  },
};

export const AllZero: Story = {
  args: {
    stats: {
      experienceCount: 0,
      jobCount: 0,
      coverLetterCount: 0,
    },
  },
};
