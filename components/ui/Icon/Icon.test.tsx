import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {Icon} from './Icon';

describe('Icon', () => {
  it('지정한 name의 SVG를 렌더링한다', () => {
    // Arrange & Act
    const {container} = render(<Icon name='sparkles' />);

    // Assert
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('기본 size 20이 적용된다', () => {
    // Arrange & Act
    const {container} = render(<Icon name='check' />);

    // Assert
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('20');
    expect(svg?.getAttribute('height')).toBe('20');
  });

  it('커스텀 size가 적용된다', () => {
    // Arrange & Act
    const {container} = render(<Icon name='check' size={32} />);

    // Assert
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
    expect(svg?.getAttribute('height')).toBe('32');
  });

  it('className prop이 SVG 요소에 전달된다', () => {
    // Arrange & Act
    const {container} = render(
      <Icon name='refresh' className='text-green-300' />
    );

    // Assert
    const svg = container.querySelector('svg');
    expect(svg?.classList.contains('text-green-300')).toBe(true);
  });
});
