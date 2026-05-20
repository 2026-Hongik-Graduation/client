interface ScoreRingProps {
  value: number; // 0–100 정수
  size?: number; // SVG 너비/높이 px, 기본값: 80
  strokeWidth?: number; // 기본값: 6
  className?: string;
}

const getScoreColor = (value: number): string => {
  if (value >= 80) return 'var(--green-300)';
  if (value >= 60) return 'var(--warn)';
  return 'var(--text-4)';
};

export const ScoreRing = ({
  value,
  size = 80,
  strokeWidth = 6,
  className,
}: ScoreRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - value / 100);
  const center = size / 2;
  const scoreColor = getScoreColor(value);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`매칭 점수 ${value}점`}
      className={className}>
      {/* 배경 트랙 */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill='none'
        stroke='var(--border-subtle)'
        strokeWidth={strokeWidth}
      />
      {/* 진행 바 */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill='none'
        stroke={scoreColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
        strokeLinecap='round'
        transform={`rotate(-90 ${center} ${center})`}
      />
      {/* 점수 텍스트 */}
      <text
        x={center}
        y={center}
        dominantBaseline='middle'
        textAnchor='middle'
        fontSize={size * 0.22}
        fontWeight='700'
        fill={scoreColor}>
        {value}
      </text>
    </svg>
  );
};
