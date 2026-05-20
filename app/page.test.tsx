import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';

import LandingPage from './page';

describe('LandingPage', () => {
  it('헤드라인 텍스트가 렌더링된다', () => {
    // Arrange & Act
    render(<LandingPage />);

    // Assert
    expect(screen.getByText('경험을 기록하면')).toBeInTheDocument();
  });

  it('그라디언트 텍스트 스팬이 렌더링된다', () => {
    // Arrange & Act
    render(<LandingPage />);

    // Assert
    expect(screen.getByText('자기소개서가 자라요')).toBeInTheDocument();
  });

  it('Google 로그인 링크가 /dashboard로 연결된다', () => {
    // Arrange & Act
    render(<LandingPage />);

    // Assert
    const link = screen.getByRole('link', {name: /google/i});
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('앱 이름 eyebrow가 표시된다', () => {
    // Arrange & Act
    render(<LandingPage />);

    // Assert
    expect(screen.getByText('Sprout · Career Studio')).toBeInTheDocument();
  });

  it('무료 이용 안내 문구가 표시된다', () => {
    // Arrange & Act
    render(<LandingPage />);

    // Assert
    expect(screen.getByText(/전체 무료/)).toBeInTheDocument();
  });
});
