import Link from 'next/link';

interface QuickAction {
  label: string;
  description: string;
  href: string;
  iconPath: string;
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  {
    label: '경험 추가',
    description: 'STAR 형식으로 경험을 기록하세요',
    href: '/experiences/new',
    iconPath: 'M12 5v14M5 12h14',
  },
  {
    label: '채용공고 분석',
    description: '공고 텍스트에서 키워드를 추출합니다',
    href: '/jobs/new',
    iconPath: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
  },
  {
    label: '자소서 작성',
    description: 'AI가 경험을 매칭해 초안을 생성합니다',
    href: '/cover-letters/new',
    iconPath:
      'M9 12h6M9 8h6M9 16h4M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
  },
];

export const QuickActions = ({
  actions = DEFAULT_QUICK_ACTIONS,
}: QuickActionsProps) => {
  return (
    <section aria-labelledby='quick-actions-heading'>
      <h2
        id='quick-actions-heading'
        className='mb-4 text-base font-semibold text-[var(--text-1)]'>
        빠른 실행
      </h2>
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {actions.map(({label, description, href, iconPath}) => (
          <li key={href}>
            <Link
              href={href}
              className='flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-card)] p-5 transition-colors hover:border-[var(--border-default)] hover:bg-[var(--bg-subtle)]'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--bg-subtle)] text-[var(--green-300)]'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'>
                  <path d={iconPath} />
                </svg>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-sm font-semibold text-[var(--text-1)]'>
                  {label}
                </span>
                <span className='text-xs leading-relaxed text-[var(--text-3)]'>
                  {description}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
