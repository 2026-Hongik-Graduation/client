import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {DashboardHeader} from './DashboardHeader';

describe('DashboardHeader', () => {
  it('로고 텍스트가 렌더링된다', () => {
    // Arrange & Act
    render(<DashboardHeader />);

    // Assert
    expect(screen.getByText('Sprout · Career Studio')).toBeInTheDocument();
  });

  it('네비게이션 링크 3개가 모두 렌더링된다', () => {
    // Arrange & Act
    render(<DashboardHeader />);

    // Assert
    const nav = screen.getByRole('navigation', {name: 'Main navigation'});
    const links = nav.querySelectorAll(
      'a[href^="/experiences"], a[href^="/jobs"], a[href^="/cover-letters"]'
    );
    expect(links).toHaveLength(3);
  });

  it('activeNav 값에 해당하는 링크가 aria-current="page"를 갖는다', () => {
    // Arrange & Act
    render(<DashboardHeader activeNav='experiences' />);

    // Assert
    const activeLink = screen.getByRole('link', {name: '경험'});
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('각 링크가 올바른 href로 연결된다', () => {
    // Arrange & Act
    render(<DashboardHeader />);

    // Assert
    expect(screen.getByRole('link', {name: '경험'})).toHaveAttribute(
      'href',
      '/experiences'
    );
    expect(screen.getByRole('link', {name: '채용공고'})).toHaveAttribute(
      'href',
      '/jobs'
    );
    expect(screen.getByRole('link', {name: '자소서'})).toHaveAttribute(
      'href',
      '/cover-letters'
    );
  });
});
