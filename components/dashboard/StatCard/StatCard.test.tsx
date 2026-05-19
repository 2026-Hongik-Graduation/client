import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {StatCard} from './StatCard';

describe('StatCard', () => {
  it('label과 count가 렌더링된다', () => {
    // Arrange & Act
    render(
      <StatCard
        label='등록된 경험'
        count={3}
        linkHref='/experiences'
        linkLabel='경험 목록 보기'
      />
    );

    // Assert
    expect(screen.getByText('등록된 경험')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('기본 unit "개"가 표시된다', () => {
    // Arrange & Act
    render(
      <StatCard
        label='등록된 경험'
        count={3}
        linkHref='/experiences'
        linkLabel='경험 목록 보기'
      />
    );

    // Assert
    expect(screen.getByText('개')).toBeInTheDocument();
  });

  it('커스텀 unit이 반영된다', () => {
    // Arrange & Act
    render(
      <StatCard
        label='채용공고'
        count={2}
        unit='건'
        linkHref='/jobs'
        linkLabel='채용공고 목록 보기'
      />
    );

    // Assert
    expect(screen.getByText('건')).toBeInTheDocument();
  });

  it('카드 전체가 linkHref로 연결된 링크를 갖는다', () => {
    // Arrange & Act
    render(
      <StatCard
        label='등록된 경험'
        count={3}
        linkHref='/experiences'
        linkLabel='경험 목록 보기'
      />
    );

    // Assert
    const link = screen.getByRole('link', {name: '경험 목록 보기'});
    expect(link).toHaveAttribute('href', '/experiences');
  });
});
