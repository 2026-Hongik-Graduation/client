import type {Meta, StoryObj} from '@storybook/react';

import {MOCK_EXPERIENCES} from '@/lib/mock/experience.mock';
import {MOCK_JOB_POSTINGS} from '@/lib/mock/job.mock';
import {MOCK_QUESTION_MATCHES} from '@/lib/mock/matching.mock';

import {MatchResultCard} from './MatchResultCard';

const meta: Meta<typeof MatchResultCard> = {
  title: 'Matching/MatchResultCard',
  component: MatchResultCard,
  parameters: {layout: 'padded'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MatchResultCard>;

const question = MOCK_JOB_POSTINGS[0].questions![0];
const allExperiences = MOCK_EXPERIENCES;

export const HighScore: Story = {
  args: {
    question,
    match: MOCK_QUESTION_MATCHES[0], // score: 91
    experiences: allExperiences.filter((e) =>
      MOCK_QUESTION_MATCHES[0].matched.includes(e.id)
    ),
  },
};

export const MidScore: Story = {
  args: {
    question: MOCK_JOB_POSTINGS[0].questions![1],
    match: MOCK_QUESTION_MATCHES[1], // score: 78
    experiences: allExperiences.filter((e) =>
      MOCK_QUESTION_MATCHES[1].matched.includes(e.id)
    ),
  },
};

export const SingleExperience: Story = {
  args: {
    question: MOCK_JOB_POSTINGS[0].questions![2],
    match: {
      ...MOCK_QUESTION_MATCHES[2],
      matched: ['exp-1'],
    },
    experiences: allExperiences.filter((e) => e.id === 'exp-1'),
  },
};

export const MultipleAlts: Story = {
  args: {
    question,
    match: {
      ...MOCK_QUESTION_MATCHES[0],
      matched: ['exp-1', 'exp-2', 'exp-3'],
    },
    experiences: allExperiences,
  },
};
