import type {Meta, StoryObj} from '@storybook/react';

import {MOCK_EXPERIENCES} from '@/lib/mock/experience.mock';

import {RecentExperienceCard} from './RecentExperienceCard';

const meta: Meta<typeof RecentExperienceCard> = {
  title: 'Dashboard/RecentExperienceCard',
  component: RecentExperienceCard,
  parameters: {layout: 'centered'},
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ul className='w-80'>
        <Story />
      </ul>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecentExperienceCard>;

export const Project: Story = {
  args: {
    experience: MOCK_EXPERIENCES[0],
  },
};

export const Internship: Story = {
  args: {
    experience: MOCK_EXPERIENCES[1],
  },
};

export const Activity: Story = {
  args: {
    experience: MOCK_EXPERIENCES[2],
  },
};

export const NoEndDate: Story = {
  args: {
    experience: {
      ...MOCK_EXPERIENCES[0],
      id: 'exp-no-end',
      endDate: undefined,
    },
  },
};
