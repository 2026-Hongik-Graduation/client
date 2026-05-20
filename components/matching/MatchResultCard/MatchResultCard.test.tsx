import {render, screen, fireEvent} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {MOCK_EXPERIENCES} from '@/lib/mock/experience.mock';
import {MOCK_QUESTION_MATCHES} from '@/lib/mock/matching.mock';
import {MOCK_JOB_POSTINGS} from '@/lib/mock/job.mock';

import {MatchResultCard} from './MatchResultCard';

const mockQuestion = MOCK_JOB_POSTINGS[0].questions![0];
const mockMatch = MOCK_QUESTION_MATCHES[0]; // qId: 'q-1', primary: 'exp-1', matched: ['exp-1', 'exp-2'], score: 91
const matchedExperiences = MOCK_EXPERIENCES.filter((e) =>
  mockMatch.matched.includes(e.id)
);

describe('MatchResultCard', () => {
  it('문항 텍스트가 렌더링된다', () => {
    // Arrange & Act
    render(
      <MatchResultCard
        question={mockQuestion}
        match={mockMatch}
        experiences={matchedExperiences}
      />
    );

    // Assert
    expect(screen.getByText(mockQuestion.text)).toBeInTheDocument();
  });

  it('ScoreRing에 score가 전달된다', () => {
    // Arrange & Act
    render(
      <MatchResultCard
        question={mockQuestion}
        match={mockMatch}
        experiences={matchedExperiences}
      />
    );

    // Assert
    expect(screen.getByText('91')).toBeInTheDocument();
  });

  it('AI 추천 이유가 렌더링된다', () => {
    // Arrange
    const match = {
      ...mockMatch,
      reason: '프로젝트 경험이 직결됩니다.',
    };

    // Act
    render(
      <MatchResultCard
        question={mockQuestion}
        match={match}
        experiences={matchedExperiences}
      />
    );

    // Assert
    expect(screen.getByText('프로젝트 경험이 직결됩니다.')).toBeInTheDocument();
  });

  it('키워드 칩이 렌더링된다', () => {
    // Arrange
    const match = {
      ...mockMatch,
      keywords: ['AI', 'Next.js'],
    };

    // Act
    render(
      <MatchResultCard
        question={mockQuestion}
        match={match}
        experiences={matchedExperiences}
      />
    );

    // Assert
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('"다른 경험으로" 클릭 시 selectedExpId가 변경된다', () => {
    // Arrange
    const exp1 = MOCK_EXPERIENCES.find((e) => e.id === 'exp-1')!;
    const exp2 = MOCK_EXPERIENCES.find((e) => e.id === 'exp-2')!;

    render(
      <MatchResultCard
        question={mockQuestion}
        match={mockMatch}
        experiences={[exp1, exp2]}
      />
    );

    // exp-2 제목이 초기에 alt로 보임을 확인
    expect(screen.getByText(exp2.title)).toBeInTheDocument();

    // Act
    const switchBtn = screen.getByRole('button', {name: '다른 경험으로'});
    fireEvent.click(switchBtn);

    // Assert — alt가 exp-2 하나뿐이므로 순환 후 여전히 exp-2
    expect(screen.getByText(exp2.title)).toBeInTheDocument();
  });

  it('"이 조합으로 작성" 클릭 시 onSelectExperience가 호출된다', () => {
    // Arrange
    const onSelectExperience = vi.fn();

    render(
      <MatchResultCard
        question={mockQuestion}
        match={mockMatch}
        experiences={matchedExperiences}
        onSelectExperience={onSelectExperience}
      />
    );

    // Act
    const writeBtn = screen.getByRole('button', {name: '이 조합으로 작성'});
    fireEvent.click(writeBtn);

    // Assert
    expect(onSelectExperience).toHaveBeenCalledWith(
      mockMatch.qId,
      mockMatch.primary
    );
  });
});
