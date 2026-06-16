import Link from 'next/link';

import {AppSidebar} from '@/components/ui/AppSidebar/AppSidebar';
import {PageTopBar} from '@/components/ui/PageTopBar/PageTopBar';
import {Icon} from '@/components/ui/Icon/Icon';
import {getMockJobPostings} from '@/lib/mock/job.mock';

export default function JobsPage() {
  const jobs = getMockJobPostings();

  return (
    <div className='flex min-h-screen bg-[var(--bg-canvas)]'>
      <AppSidebar />
      <div className='col flex-1 overflow-hidden'>
        <PageTopBar
          title={`${jobs.length}개의 채용공고를 분석 중이에요`}
          actions={
            <Link href='/jobs/new' className='btn btn-primary btn-sm'>
              <Icon name='plus' size={16} />
              채용공고 추가
            </Link>
          }
        />
        <main className='overflow-y-auto p-8'>
          {jobs.length === 0 ? (
            <div className='col items-center justify-center gap-4 py-24'>
              <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--bg-subtle)] text-[var(--text-4)]'>
                <Icon name='filter' size={32} />
              </div>
              <div className='col items-center gap-2'>
                <p className='h3'>아직 분석한 채용공고가 없어요</p>
                <p className='body text-center'>
                  채용공고를 붙여넣으면 AI가 핵심 키워드를 추출해드려요.
                </p>
              </div>
              <Link href='/jobs/new' className='btn btn-primary'>
                <Icon name='plus' size={16} />
                채용공고 추가하기
              </Link>
            </div>
          ) : (
            <div className='col gap-4'>
              {jobs.map((job) => (
                <div key={job.id} className='card'>
                  <div className='row-between'>
                    <div className='col gap-1.5'>
                      <p className='caption'>{job.company}</p>
                      <h2 className='h3'>{job.jobTitle}</h2>
                    </div>
                    <div className='row shrink-0 gap-2'>
                      <Link
                        href={`/jobs/${job.id}`}
                        className='btn btn-secondary btn-sm'>
                        상세 보기
                      </Link>
                      <Link
                        href={`/jobs/${job.id}/matching`}
                        className='btn btn-primary btn-sm'>
                        <Icon name='sparkles' size={15} />
                        경험 매칭
                      </Link>
                    </div>
                  </div>

                  <div className='row mt-4 flex-wrap gap-2'>
                    {job.requiredSkills.map((skill) => (
                      <span key={skill} className='chip chip-sm chip-outline'>
                        {skill}
                      </span>
                    ))}
                    {job.preferredSkills.map((skill) => (
                      <span
                        key={`pref-${skill}`}
                        className='chip chip-sm chip-mint'>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {job.questions && job.questions.length > 0 && (
                    <p className='caption mt-3'>
                      자소서 문항 {job.questions.length}개
                    </p>
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
