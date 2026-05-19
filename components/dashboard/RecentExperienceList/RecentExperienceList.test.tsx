import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {MOCK_EXPERIENCES} from '@/lib/mock/experience.mock';

import {RecentExperienceList} from './RecentExperienceList';

describe('RecentExperienceList', () => {
  it('전달된 경험 수만큼 카드가 렌더링된다', () => {
    // Arrange
    const experiences = MOCK_EXPERIENCES.slice(0, 2);

    // Act
    render(<RecentExperienceList experiences={experiences} />);

    // Assert
    expect(screen.getByText(experiences[0].title)).toBeInTheDocument();
    expect(screen.getByText(experiences[1].title)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('빈 배열이면 빈 상태 메시지가 표시된다', () => {
    // Arrange & Act
    render(<RecentExperienceList experiences={[]} />);

    // Assert
    expect(
      screen.getByText('아직 등록된 경험이 없습니다.')
    ).toBeInTheDocument();
  });

  it('"모두 보기" 링크가 /experiences로 연결된다', () => {
    // Arrange & Act
    render(<RecentExperienceList experiences={MOCK_EXPERIENCES} />);

    // Assert
    const viewAllLink = screen.getByRole('link', {name: '모두 보기'});
    expect(viewAllLink).toHaveAttribute('href', '/experiences');
  });

  it('섹션 제목이 렌더링된다', () => {
    // Arrange & Act
    render(<RecentExperienceList experiences={[]} />);

    // Assert
    expect(
      screen.getByRole('heading', {name: '최근 경험'})
    ).toBeInTheDocument();
  });
});
