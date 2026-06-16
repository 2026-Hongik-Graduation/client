import Link from 'next/link';

import {AppSidebar} from '@/components/ui/AppSidebar/AppSidebar';
import {PageTopBar} from '@/components/ui/PageTopBar/PageTopBar';
import {Icon} from '@/components/ui/Icon/Icon';
import {getMockExperiences} from '@/lib/mock/experience.mock';
import {EXPERIENCE_TYPE_LABEL} from '@/types/experience';

export default function ExperiencesPage() {
  const experiences = getMockExperiences();

  return (
    <div className='flex min-h-screen bg-[var(--bg-canvas)]'>
      <AppSidebar />
      <div className='col flex-1 overflow-hidden'>
        <PageTopBar
          title={`${experiences.length}개의 경험을 관리 중이에요`}
          actions={
            <Link href='/experiences/new' className='btn btn-primary btn-sm'>
              <Icon name='plus' size={16} />
              경험 추가
            </Link>
          }
        />
        <main className='overflow-y-auto p-8'>
          {experiences.length === 0 ? (
            <div className='col items-center justify-center gap-4 py-24'>
              <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--bg-subtle)] text-[var(--text-4)]'>
                <Icon name='edit' size={32} />
              </div>
              <div className='col items-center gap-2'>
                <p className='h3'>아직 등록된 경험이 없어요</p>
                <p className='body text-center'>
                  STAR 형식으로 경험을 기록하고 자기소개서에 활용해보세요.
                </p>
              </div>
              <Link href='/experiences/new' className='btn btn-primary'>
                <Icon name='plus' size={16} />첫 경험 추가하기
              </Link>
            </div>
          ) : (
            <div className='col gap-4'>
              {experiences.map((experience) => (
                <div key={experience.id} className='card'>
                  <div className='row-between'>
                    <div className='col gap-2'>
                      <div className='row gap-2'>
                        <span className='chip chip-sm chip-green'>
                          {EXPERIENCE_TYPE_LABEL[experience.experienceType]}
                        </span>
                        {experience.startDate && (
                          <span className='caption'>
                            {experience.startDate}
                            {experience.endDate
                              ? ` ~ ${experience.endDate}`
                              : ' ~'}
                          </span>
                        )}
                      </div>
                      <h2 className='h3'>{experience.title}</h2>
                      <p className='caption'>{experience.role}</p>
                    </div>
                    <Link
                      href={`/experiences/${experience.id}/edit`}
                      className='btn btn-secondary btn-sm shrink-0'>
                      <Icon name='edit' size={15} />
                      수정
                    </Link>
                  </div>

                  <p className='body mt-4 line-clamp-2'>{experience.action}</p>

                  {experience.skills.length > 0 && (
                    <div className='row mt-4 flex-wrap gap-2'>
                      {experience.skills.map((skill) => (
                        <span key={skill} className='chip chip-sm chip-outline'>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
