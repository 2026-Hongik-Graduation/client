import type {Meta, StoryObj} from '@storybook/react';

import {AiChatbot} from './AiChatbot';

const meta: Meta<typeof AiChatbot> = {
  title: 'CoverLetter/AiChatbot',
  component: AiChatbot,
  parameters: {layout: 'centered'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AiChatbot>;

export const Default: Story = {
  args: {},
};

export const Thinking: Story = {
  args: {
    isThinking: true,
  },
};

export const EmptyChat: Story = {
  args: {
    messages: [],
  },
};

export const UserHeavy: Story = {
  args: {
    messages: [
      {role: 'ai', content: '안녕하세요! 무엇을 도와드릴까요?'},
      {role: 'user', content: '지원 동기를 써줘.'},
      {role: 'ai', content: '네, 작성해드릴게요!'},
      {role: 'user', content: '좀 더 구체적으로 부탁해.'},
      {role: 'ai', content: '프로젝트 경험을 중심으로 구체화했습니다.'},
      {role: 'user', content: '좋아, 이 내용으로 할게.'},
      {role: 'user', content: '2번 문항도 부탁해.'},
      {role: 'ai', content: '2번 문항 초안을 작성해드릴게요.'},
    ],
  },
};
