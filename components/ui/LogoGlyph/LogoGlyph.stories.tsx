import type {Meta, StoryObj} from '@storybook/react';

import {LogoGlyph} from './LogoGlyph';

const meta: Meta<typeof LogoGlyph> = {
  title: 'UI/LogoGlyph',
  component: LogoGlyph,
  parameters: {layout: 'centered'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LogoGlyph>;

export const Default: Story = {
  args: {
    size: 26,
  },
};

export const Large: Story = {
  args: {
    size: 48,
  },
};

export const Colored: Story = {
  args: {
    size: 26,
    className: 'text-green-400',
  },
};
