import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {QuickActions} from './QuickActions';

describe('QuickActions', () => {
  it('기본 액션 3개가 렌더링된다', () => {
    // Arrange & Act
    render(<QuickActions />);

    // Assert
    expect(screen.getByText('경험 추가')).toBeInTheDocument();
    expect(screen.getByText('채용공고 분석')).toBeInTheDocument();
    expect(screen.getByText('자소서 작성')).toBeInTheDocument();
  });

  it('각 액션 링크가 올바른 href를 갖는다', () => {
    // Arrange & Act
    render(<QuickActions />);

    // Assert
    expect(screen.getByRole('link', {name: /경험 추가/})).toHaveAttribute(
      'href',
      '/experiences/new'
    );
    expect(screen.getByRole('link', {name: /채용공고 분석/})).toHaveAttribute(
      'href',
      '/jobs/new'
    );
    expect(screen.getByRole('link', {name: /자소서 작성/})).toHaveAttribute(
      'href',
      '/cover-letters/new'
    );
  });

  it('커스텀 actions prop이 반영된다', () => {
    // Arrange
    const customActions = [
      {
        label: '테스트 액션',
        description: '테스트용 액션입니다',
        href: '/test',
        iconPath: 'M12 5v14',
      },
    ];

    // Act
    render(<QuickActions actions={customActions} />);

    // Assert
    expect(screen.getByText('테스트 액션')).toBeInTheDocument();
    expect(screen.queryByText('경험 추가')).not.toBeInTheDocument();
    expect(screen.queryByText('채용공고 분석')).not.toBeInTheDocument();
    expect(screen.queryByText('자소서 작성')).not.toBeInTheDocument();
  });
});
