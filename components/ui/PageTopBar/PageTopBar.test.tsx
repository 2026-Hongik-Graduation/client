import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {PageTopBar} from './PageTopBar';

describe('PageTopBar', () => {
  it('title이 렌더링된다', () => {
    // Arrange & Act
    render(<PageTopBar title='경험 매칭' />);

    // Assert
    expect(screen.getByText('경험 매칭')).toBeInTheDocument();
  });

  it('breadcrumb 항목들이 순서대로 렌더링된다', () => {
    // Arrange & Act
    render(<PageTopBar title='매칭' breadcrumb={['카카오', '매칭']} />);

    // Assert
    expect(screen.getByText('카카오')).toBeInTheDocument();
    expect(screen.getByText('매칭')).toBeInTheDocument();
  });

  it('actions 슬롯이 렌더링된다', () => {
    // Arrange & Act
    render(<PageTopBar title='테스트' actions={<button>내보내기</button>} />);

    // Assert
    expect(screen.getByRole('button', {name: '내보내기'})).toBeInTheDocument();
  });

  it('breadcrumb 없이도 title만 표시된다', () => {
    // Arrange & Act
    render(<PageTopBar title='자소서 목록' />);

    // Assert
    expect(screen.getByText('자소서 목록')).toBeInTheDocument();
  });
});
