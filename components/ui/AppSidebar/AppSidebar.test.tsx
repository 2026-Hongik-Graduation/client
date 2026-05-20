import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {AppSidebar} from './AppSidebar';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

describe('AppSidebar', () => {
  it('네비게이션 항목 4개가 렌더링된다', async () => {
    // Arrange
    const {usePathname} = await import('next/navigation');
    vi.mocked(usePathname).mockReturnValue('/');

    // Act
    render(<AppSidebar />);

    // Assert
    const nav = screen.getByRole('navigation', {name: '메인 네비게이션'});
    const links = nav.querySelectorAll('a');
    expect(links).toHaveLength(4);
  });

  it('현재 경로의 링크가 aria-current를 갖는다', async () => {
    // Arrange
    const {usePathname} = await import('next/navigation');
    vi.mocked(usePathname).mockReturnValue('/dashboard');

    // Act
    render(<AppSidebar />);

    // Assert
    const activeLink = screen.getByRole('link', {name: /대시보드/});
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('각 링크가 올바른 href를 갖는다', async () => {
    // Arrange
    const {usePathname} = await import('next/navigation');
    vi.mocked(usePathname).mockReturnValue('/');

    // Act
    render(<AppSidebar />);

    // Assert
    expect(screen.getByRole('link', {name: /대시보드/})).toHaveAttribute(
      'href',
      '/dashboard'
    );
    expect(screen.getByRole('link', {name: /경험/})).toHaveAttribute(
      'href',
      '/experiences'
    );
    expect(screen.getByRole('link', {name: /채용공고/})).toHaveAttribute(
      'href',
      '/jobs'
    );
    expect(screen.getByRole('link', {name: /자소서/})).toHaveAttribute(
      'href',
      '/cover-letters'
    );
  });
});
