import Link from 'next/link';

import {EXPERIENCE_TYPE_LABEL} from '@/types/experience';
import type {Experience} from '@/types/experience';

interface RecentExperienceCardProps {
  experience: Experience;
}

const formatDateRange = (startDate?: string, endDate?: string): string => {
  if (!startDate) return '';
  return endDate ? `${startDate} ~ ${endDate}` : `${startDate} ~ 진행 중`;
};

export const RecentExperienceCard = ({
  experience,
}: RecentExperienceCardProps) => {
  const {id, title, role, experienceType, startDate, endDate} = experience;
  const typeLabel = EXPERIENCE_TYPE_LABEL[experienceType];
  const dateRange = formatDateRange(startDate, endDate);

  return (
    <li>
      <Link
        href={`/experiences/${id}/edit`}
        className='flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 transition-colors hover:border-[var(--border-default)] hover:bg-[var(--bg-subtle)]'>
        <div className='flex items-start justify-between gap-2'>
          <span className='line-clamp-1 text-sm font-semibold text-[var(--text-1)]'>
            {title}
          </span>
          <span className='shrink-0 rounded-full bg-[var(--bg-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--green-200)]'>
            {typeLabel}
          </span>
        </div>
        <p className='text-xs text-[var(--text-3)]'>{role}</p>
        {dateRange && (
          <p className='text-xs text-[var(--text-4)]'>{dateRange}</p>
        )}
      </Link>
    </li>
  );
};
