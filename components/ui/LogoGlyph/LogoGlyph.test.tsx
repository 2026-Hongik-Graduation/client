import {render} from '@testing-library/react';
import {describe, it, expect} from 'vitest';

import {LogoGlyph} from './LogoGlyph';

describe('LogoGlyph', () => {
  it('기본 size로 SVG를 렌더링한다', () => {
    // Arrange & Act
    render(<LogoGlyph />);

    // Assert
    const svg = document.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('width')).toBe('26');
    expect(svg?.getAttribute('height')).toBe('26');
  });

  it('size prop이 반영된다', () => {
    // Arrange & Act
    render(<LogoGlyph size={40} />);

    // Assert
    const svg = document.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('40');
    expect(svg?.getAttribute('height')).toBe('40');
  });

  it('className prop이 svg에 적용된다', () => {
    // Arrange & Act
    render(<LogoGlyph className='text-green-400' />);

    // Assert
    const svg = document.querySelector('svg');
    expect(svg?.classList.contains('text-green-400')).toBe(true);
  });

  it('aria-hidden이 설정된다', () => {
    // Arrange & Act
    render(<LogoGlyph />);

    // Assert
    const svg = document.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });
});
