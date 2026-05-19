import Link from 'next/link';

interface StatCardProps {
  label: string;
  count: number;
  unit?: string;
  linkHref: string;
  linkLabel: string;
}

export const StatCard = ({
  label,
  count,
  unit = '개',
  linkHref,
  linkLabel,
}: StatCardProps) => {
  return (
    <Link
      href={linkHref}
      aria-label={linkLabel}
      className='group flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--border-default)] hover:bg-[var(--bg-subtle)]'>
      <span className='text-sm font-medium text-[var(--text-3)]'>{label}</span>
      <div className='flex items-baseline gap-1'>
        <span className='text-4xl font-bold text-[var(--text-1)] tabular-nums'>
          {count}
        </span>
        <span className='text-sm text-[var(--text-3)]'>{unit}</span>
      </div>
    </Link>
  );
};
