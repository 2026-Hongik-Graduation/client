'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Icon} from '@/components/ui/Icon/Icon';
import type {IconName} from '@/components/ui/Icon/Icon';
import {LogoGlyph} from '@/components/ui/LogoGlyph/LogoGlyph';

interface AppSidebarProps {
  className?: string;
}

interface NavItem {
  href: string;
  icon: IconName;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  {href: '/dashboard', icon: 'home', label: '대시보드'},
  {href: '/experiences', icon: 'edit', label: '경험'},
  {href: '/jobs', icon: 'filter', label: '채용공고'},
  {href: '/cover-letters', icon: 'sparkles', label: '자소서'},
];

export const AppSidebar = ({className}: AppSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={[
        'col h-screen w-56 shrink-0 border-r border-[var(--border-subtle)] bg-[var(--bg-card)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}>
      {/* 로고 */}
      <div className='row gap-2 px-4 py-5'>
        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg-subtle)] text-[var(--green-300)]'>
          <LogoGlyph size={20} />
        </div>
        <span className='text-sm font-semibold text-[var(--text-1)]'>
          Sprout
        </span>
      </div>

      {/* 네비게이션 */}
      <nav aria-label='메인 네비게이션'>
        <ul className='col gap-1 px-2'>
          {NAV_ITEMS.map(({href, icon, label}) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'row gap-3 rounded-[var(--radius-btn)] px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'chip-green text-[var(--green-200)]'
                      : 'text-[var(--text-3)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-2)]',
                  ].join(' ')}>
                  <Icon name={icon} size={18} aria-hidden={true} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
