import Link from 'next/link';

import type {Experience} from '@/types/experience';

import {RecentExperienceCard} from '../RecentExperienceCard/RecentExperienceCard';

interface RecentExperienceListProps {
  experiences: Experience[];
}

export const RecentExperienceList = ({
  experiences,
}: RecentExperienceListProps) => {
  return (
    <section aria-labelledby='recent-experiences-heading'>
      <div className='mb-4 flex items-center justify-between'>
        <h2
          id='recent-experiences-heading'
          className='text-base font-semibold text-[var(--text-1)]'>
          최근 경험
        </h2>
        <Link
          href='/experiences'
          className='text-sm text-[var(--text-3)] transition-colors hover:text-[var(--green-300)]'>
          모두 보기
        </Link>
      </div>

      {experiences.length === 0 ? (
        <div className='flex flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-[var(--border-subtle)] py-12 text-center'>
          <p className='text-sm text-[var(--text-3)]'>
            아직 등록된 경험이 없습니다.
          </p>
          <Link
            href='/experiences/new'
            className='mt-3 text-sm font-medium text-[var(--green-300)] transition-opacity hover:opacity-80'>
            첫 경험 추가하기
          </Link>
        </div>
      ) : (
        <ul className='flex flex-col gap-3'>
          {experiences.map((experience) => (
            <RecentExperienceCard key={experience.id} experience={experience} />
          ))}
        </ul>
      )}
    </section>
  );
};
