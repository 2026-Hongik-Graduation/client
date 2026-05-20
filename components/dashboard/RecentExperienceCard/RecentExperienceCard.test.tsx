import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {MOCK_EXPERIENCES} from '@/lib/mock/experience.mock';

import {RecentExperienceCard} from './RecentExperienceCard';

describe('RecentExperienceCard', () => {
  it('경험 제목이 렌더링된다', () => {
    // Arrange
    const experience = MOCK_EXPERIENCES[0];

    // Act
    render(<RecentExperienceCard experience={experience} />);

    // Assert
    expect(
      screen.getByText('자기소개서 자동화 서비스 개발')
    ).toBeInTheDocument();
  });

  it('경험 역할이 렌더링된다', () => {
    // Arrange
    const experience = MOCK_EXPERIENCES[0];

    // Act
    render(<RecentExperienceCard experience={experience} />);

    // Assert
    expect(screen.getByText('프론트엔드 리드')).toBeInTheDocument();
  });

  it('경험 유형 배지가 렌더링된다', () => {
    // Arrange
    const experience = MOCK_EXPERIENCES[0];

    // Act
    render(<RecentExperienceCard experience={experience} />);

    // Assert
    expect(screen.getByText('프로젝트')).toBeInTheDocument();
  });

  it('카드가 올바른 편집 경로 링크를 갖는다', () => {
    // Arrange
    const experience = MOCK_EXPERIENCES[0];

    // Act
    render(<RecentExperienceCard experience={experience} />);

    // Assert
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/experiences/exp-1/edit');
  });
});
