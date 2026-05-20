import type {Meta, StoryObj} from '@storybook/react';

import {ScoreRing} from './ScoreRing';

const meta: Meta<typeof ScoreRing> = {
  title: 'UI/ScoreRing',
  component: ScoreRing,
  parameters: {layout: 'centered'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScoreRing>;

export const High: Story = {
  args: {
    value: 91,
  },
};

export const Mid: Story = {
  args: {
    value: 72,
  },
};

export const Low: Story = {
  args: {
    value: 45,
  },
};

export const Zero: Story = {
  args: {
    value: 0,
  },
};

export const Large: Story = {
  args: {
    value: 88,
    size: 120,
  },
};
