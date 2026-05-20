import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {ScoreRing} from './ScoreRing';

describe('ScoreRing', () => {
  it('점수 숫자가 렌더링된다', () => {
    // Arrange & Act
    render(<ScoreRing value={91} />);

    // Assert
    expect(screen.getByText('91')).toBeInTheDocument();
  });

  it('0점도 올바르게 렌더링된다', () => {
    // Arrange & Act
    render(<ScoreRing value={0} />);

    // Assert
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('기본 size 80이 적용된다', () => {
    // Arrange & Act
    const {container} = render(<ScoreRing value={50} />);

    // Assert
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('80');
    expect(svg?.getAttribute('height')).toBe('80');
  });

  it('커스텀 size가 적용된다', () => {
    // Arrange & Act
    const {container} = render(<ScoreRing value={50} size={120} />);

    // Assert
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('120');
    expect(svg?.getAttribute('height')).toBe('120');
  });
});
