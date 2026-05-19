import type {Meta, StoryObj} from '@storybook/react';

import {QuickActions} from './QuickActions';

const meta: Meta<typeof QuickActions> = {
  title: 'Dashboard/QuickActions',
  component: QuickActions,
  parameters: {layout: 'padded'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof QuickActions>;

export const Default: Story = {
  args: {},
};

export const CustomActions: Story = {
  args: {
    actions: [
      {
        label: '커스텀 액션',
        description: '커스텀 액션 구성 확인용 스토리입니다',
        href: '/custom',
        iconPath: 'M12 5v14M5 12h14',
      },
    ],
  },
};
