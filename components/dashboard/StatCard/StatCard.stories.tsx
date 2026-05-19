import type {Meta, StoryObj} from '@storybook/react';

import {StatCard} from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Dashboard/StatCard',
  component: StatCard,
  parameters: {layout: 'centered'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    label: '등록된 경험',
    count: 3,
    linkHref: '/experiences',
    linkLabel: '경험 목록 보기',
  },
};

export const ZeroCount: Story = {
  args: {
    label: '등록된 경험',
    count: 0,
    linkHref: '/experiences',
    linkLabel: '경험 목록 보기',
  },
};

export const CustomUnit: Story = {
  args: {
    label: '채용공고',
    count: 2,
    unit: '건',
    linkHref: '/jobs',
    linkLabel: '채용공고 목록 보기',
  },
};
