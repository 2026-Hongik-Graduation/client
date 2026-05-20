import {render, screen, fireEvent} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {MOCK_COVER_LETTERS} from '@/lib/mock/cover-letter.mock';

import {CoverLetterCard} from './CoverLetterCard';

const baseCoverLetter = MOCK_COVER_LETTERS[0]; // cl-1, 카카오, 문항 1개 answer 없음

describe('CoverLetterCard', () => {
  it('회사명과 직무명이 렌더링된다', () => {
    // Arrange & Act
    render(<CoverLetterCard coverLetter={baseCoverLetter} />);

    // Assert
    expect(screen.getByText('카카오')).toBeInTheDocument();
    expect(screen.getByText('프론트엔드 개발자')).toBeInTheDocument();
  });

  it('진행률이 계산되어 표시된다', () => {
    // Arrange — 문항 2개 중 1개 answer 있음
    const coverLetter = {
      ...baseCoverLetter,
      questions: [
        {
          id: 'q-a',
          question: '질문1',
          answer: '답변 있음',
          recommendedExperienceIds: [],
        },
        {
          id: 'q-b',
          question: '질문2',
          answer: '',
          recommendedExperienceIds: [],
        },
      ],
    };

    // Act
    render(<CoverLetterCard coverLetter={coverLetter} />);

    // Assert
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('100% 완성 시 "완성" 배지가 표시된다', () => {
    // Arrange — 모든 문항 answer 있음
    const coverLetter = {
      ...baseCoverLetter,
      questions: [
        {
          id: 'q-a',
          question: '질문1',
          answer: '답변 완성',
          recommendedExperienceIds: [],
        },
      ],
    };

    // Act
    render(<CoverLetterCard coverLetter={coverLetter} />);

    // Assert
    expect(screen.getByText('완성')).toBeInTheDocument();
  });

  it('미완성 시 "작성중" 배지가 표시된다', () => {
    // Arrange — answer가 하나도 없음 (baseCoverLetter의 answer: '')
    render(<CoverLetterCard coverLetter={baseCoverLetter} />);

    // Assert
    expect(screen.getByText('작성중')).toBeInTheDocument();
  });

  it('카드 본체가 편집 페이지 링크를 갖는다', () => {
    // Arrange & Act
    render(<CoverLetterCard coverLetter={baseCoverLetter} />);

    // Assert — href="/cover-letters/cl-1/edit" 링크가 존재
    const links = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('href') === '/cover-letters/cl-1/edit');
    expect(links.length).toBeGreaterThan(0);
  });

  it('onDelete 콜백이 삭제 버튼 클릭 시 호출된다', () => {
    // Arrange
    const onDelete = vi.fn();
    render(
      <CoverLetterCard coverLetter={baseCoverLetter} onDelete={onDelete} />
    );

    // Act
    fireEvent.click(screen.getByRole('button', {name: '삭제'}));

    // Assert
    expect(onDelete).toHaveBeenCalledWith('cl-1');
  });

  it('onCopy 콜백이 복사 버튼 클릭 시 호출된다', () => {
    // Arrange
    const onCopy = vi.fn();
    render(<CoverLetterCard coverLetter={baseCoverLetter} onCopy={onCopy} />);

    // Act
    fireEvent.click(screen.getByRole('button', {name: '복사'}));

    // Assert
    expect(onCopy).toHaveBeenCalledWith('cl-1');
  });
});
