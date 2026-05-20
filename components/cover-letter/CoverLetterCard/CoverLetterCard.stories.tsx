import type {Meta, StoryObj} from '@storybook/react';

import {MOCK_COVER_LETTERS} from '@/lib/mock/cover-letter.mock';

import {CoverLetterCard} from './CoverLetterCard';

const meta: Meta<typeof CoverLetterCard> = {
  title: 'CoverLetter/CoverLetterCard',
  component: CoverLetterCard,
  parameters: {layout: 'centered'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CoverLetterCard>;

export const Complete: Story = {
  args: {
    coverLetter: {
      ...MOCK_COVER_LETTERS[0],
      questions: [
        {
          id: 'q-1',
          question: '지원 동기를 작성해주세요.',
          answer: '완성된 답변입니다.',
          recommendedExperienceIds: ['exp-1'],
          maxLength: 500,
        },
      ],
    },
    onCopy: (id) => alert(`복사: ${id}`),
    onDelete: (id) => alert(`삭제: ${id}`),
    onExport: (id) => alert(`내보내기: ${id}`),
  },
};

export const InProgress: Story = {
  args: {
    coverLetter: {
      ...MOCK_COVER_LETTERS[0],
      questions: [
        {
          id: 'q-1',
          question: '지원 동기를 작성해주세요.',
          answer: '작성 중인 답변입니다.',
          recommendedExperienceIds: ['exp-1'],
          maxLength: 500,
        },
        {
          id: 'q-2',
          question: '팀 프로젝트 경험을 서술하세요.',
          answer: '',
          recommendedExperienceIds: [],
          maxLength: 700,
        },
      ],
    },
    onCopy: (id) => alert(`복사: ${id}`),
    onDelete: (id) => alert(`삭제: ${id}`),
    onExport: (id) => alert(`내보내기: ${id}`),
  },
};

export const NotStarted: Story = {
  args: {
    coverLetter: MOCK_COVER_LETTERS[0],
    onCopy: (id) => alert(`복사: ${id}`),
    onDelete: (id) => alert(`삭제: ${id}`),
    onExport: (id) => alert(`내보내기: ${id}`),
  },
};

export const NoQuestions: Story = {
  args: {
    coverLetter: MOCK_COVER_LETTERS[2], // cl-3, questions: []
    onCopy: (id) => alert(`복사: ${id}`),
    onDelete: (id) => alert(`삭제: ${id}`),
    onExport: (id) => alert(`내보내기: ${id}`),
  },
};
