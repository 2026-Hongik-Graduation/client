interface LogoGlyphProps {
  size?: number;
  className?: string;
}

export const LogoGlyph = ({size = 26, className}: LogoGlyphProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      className={className}>
      {/* 씨앗 — 아래쪽 원형 바닥 */}
      <circle cx='13' cy='20' r='3.5' fill='currentColor' opacity='0.7' />
      {/* 줄기 — 위로 뻗는 곡선 */}
      <path
        d='M13 20 C13 16 13 12 13 8'
        stroke='currentColor'
        strokeWidth='1.75'
        strokeLinecap='round'
      />
      {/* 잎사귀 — 왼쪽으로 난 타원형 */}
      <path
        d='M13 13 C10 11 6.5 11.5 6 14 C5.5 16.5 8.5 17 10.5 15.5 C12 14.5 13 13 13 13Z'
        fill='currentColor'
      />
      {/* 새 잎 — 오른쪽 위로 난 작은 잎 */}
      <path
        d='M13 9 C15 7.5 18 7.5 18.5 10 C19 12 16.5 12.5 15 11 C14 10 13 9 13 9Z'
        fill='currentColor'
        opacity='0.85'
      />
    </svg>
  );
};

export default LogoGlyph;
