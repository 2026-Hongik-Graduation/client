import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {AiChatbot} from './AiChatbot';

describe('AiChatbot', () => {
  it('기본 Mock 메시지들이 렌더링된다', () => {
    // Arrange & Act
    render(<AiChatbot />);

    // Assert
    expect(
      screen.getByText(
        '안녕하세요! 카카오 프론트엔드 자기소개서 작성을 도와드릴게요.'
      )
    ).toBeInTheDocument();
  });

  it('커스텀 messages가 렌더링된다', () => {
    // Arrange
    const messages = [{role: 'ai' as const, content: '테스트'}];

    // Act
    render(<AiChatbot messages={messages} />);

    // Assert
    expect(screen.getByText('테스트')).toBeInTheDocument();
  });

  it('isThinking=true이면 AI 타이핑 인디케이터가 렌더링된다', () => {
    // Arrange & Act
    const {container} = render(<AiChatbot isThinking={true} />);

    // Assert
    expect(container.querySelector('.ai-thinking')).not.toBeNull();
  });
});
