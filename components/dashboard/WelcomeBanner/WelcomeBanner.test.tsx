import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {WelcomeBanner} from './WelcomeBanner';

describe('WelcomeBanner', () => {
  it('기본 userName 없이 대체 문구를 표시한다', () => {
    // Arrange & Act
    render(<WelcomeBanner />);

    // Assert
    expect(screen.getByText(/취준생/)).toBeInTheDocument();
  });

  it('userName prop이 반영된다', () => {
    // Arrange & Act
    render(<WelcomeBanner userName='김민아' />);

    // Assert
    expect(screen.getByText(/김민아/)).toBeInTheDocument();
  });

  it('CTA 링크가 /cover-letters/new로 연결된다', () => {
    // Arrange & Act
    render(<WelcomeBanner />);

    // Assert
    const ctaLink = screen.getByRole('link', {name: /AI 자소서 작성 시작/});
    expect(ctaLink).toHaveAttribute('href', '/cover-letters/new');
  });
});
