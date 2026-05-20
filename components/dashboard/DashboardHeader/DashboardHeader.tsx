import Link from 'next/link';

import {LogoGlyph} from '@/components/ui';

interface DashboardHeaderProps {
  activeNav?: 'experiences' | 'jobs' | 'cover-letters';
}

const NAV_ITEMS = [
  {label: '경험', href: '/experiences', key: 'experiences'},
  {label: '채용공고', href: '/jobs', key: 'jobs'},
  {label: '자소서', href: '/cover-letters', key: 'cover-letters'},
] as const;

export const DashboardHeader = ({activeNav}: DashboardHeaderProps) => {
  return (
    <header className='sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-base)]'>
      <nav
        aria-label='Main navigation'
        className='mx-auto flex max-w-5xl items-center justify-between px-6 py-4'>
        {/* 로고 영역 */}
        <div className='flex items-center gap-2'>
          <Link
            href='/dashboard'
            className='flex items-center gap-2 text-[var(--green-300)] transition-opacity hover:opacity-80'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg-subtle)]'>
              <LogoGlyph size={20} />
            </div>
            <span className='text-sm font-semibold tracking-widest text-[var(--text-4)] uppercase'>
              Sprout · Career Studio
            </span>
          </Link>
        </div>

        {/* 네비게이션 링크 목록 */}
        <ul className='flex items-center gap-1' role='list'>
          {NAV_ITEMS.map(({label, href, key}) => {
            const isActive = activeNav === key;
            return (
              <li key={key}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'rounded-[var(--radius-btn)] px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--bg-subtle)] text-[var(--green-300)]'
                      : 'text-[var(--text-3)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-2)]',
                  ].join(' ')}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
