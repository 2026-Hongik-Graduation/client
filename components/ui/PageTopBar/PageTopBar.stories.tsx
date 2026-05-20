import type {Meta, StoryObj} from '@storybook/react';

import {PageTopBar} from './PageTopBar';

const meta: Meta<typeof PageTopBar> = {
  title: 'UI/PageTopBar',
  component: PageTopBar,
  parameters: {layout: 'fullscreen'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageTopBar>;

export const TitleOnly: Story = {
  args: {
    title: '자기소개서 목록',
  },
};

export const WithBreadcrumb: Story = {
  args: {
    title: '경험 매칭',
    breadcrumb: ['카카오', '프론트엔드', '매칭'],
  },
};

export const WithActions: Story = {
  args: {
    title: '자기소개서 목록',
    actions: <button>내보내기</button>,
  },
};

export const FullEditor: Story = {
  args: {
    title: '카카오 · 프론트엔드 개발자',
    breadcrumb: ['자기소개서', '카카오'],
    actions: (
      <>
        <span style={{fontSize: '0.75rem', color: '#888'}}>자동 저장됨</span>
        <button>미리보기</button>
        <button>내보내기</button>
        <button>완성하기</button>
      </>
    ),
  },
};
