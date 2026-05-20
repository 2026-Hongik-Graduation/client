import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {StatCardGrid} from './StatCardGrid';

describe('StatCardGrid', () => {
  it('통계 3개가 모두 렌더링된다', () => {
    // Arrange
    const stats = {
      experienceCount: 3,
      jobCount: 2,
      coverLetterCount: 1,
    };

    // Act
    render(<StatCardGrid stats={stats} />);

    // Assert
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
