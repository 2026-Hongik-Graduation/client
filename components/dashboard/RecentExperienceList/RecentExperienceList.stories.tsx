import type {Meta, StoryObj} from '@storybook/react';

import {MOCK_EXPERIENCES} from '@/lib/mock/experience.mock';

import {RecentExperienceList} from './RecentExperienceList';

const meta: Meta<typeof RecentExperienceList> = {
  title: 'Dashboard/RecentExperienceList',
  component: RecentExperienceList,
  parameters: {layout: 'padded'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RecentExperienceList>;

export const WithExperiences: Story = {
  args: {
    experiences: MOCK_EXPERIENCES.slice(0, 3),
  },
};

export const Empty: Story = {
  args: {
    experiences: [],
  },
};

export const SingleItem: Story = {
  args: {
    experiences: MOCK_EXPERIENCES.slice(0, 1),
  },
};
