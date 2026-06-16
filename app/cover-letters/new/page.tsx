'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {AppSidebar} from '@/components/ui/AppSidebar/AppSidebar';
import {PageTopBar} from '@/components/ui/PageTopBar/PageTopBar';
import {Icon} from '@/components/ui/Icon/Icon';
import {getMockJobPostings} from '@/lib/mock/job.mock';

export default function CoverLetterNewPage() {
  const router = useRouter();
  const jobs = getMockJobPostings();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(
    jobs[0]?.id ?? null
  );

  const handleNext = () => {
    if (selectedJobId) {
      router.push(`/jobs/${selectedJobId}/matching`);
    } else {
      router.push('/jobs/new');
    }
  };

  return (
    <div className='flex min-h-screen bg-[var(--bg-canvas)]'>
      <AppSidebar />
      <div className='col flex-1 overflow-hidden'>
        <PageTopBar
          title='새 자기소개서 작성'
          breadcrumb={['자기소개서', '새로 작성']}
          actions={
            <Link href='/cover-letters' className='btn btn-ghost btn-sm'>
              취소
            </Link>
          }
        />
        <main className='overflow-y-auto p-8'>
          <div className='col mx-auto max-w-2xl gap-2'>
            <p className='eyebrow'>STEP 1 / 5 · 채용공고 선택</p>
            <h1 className='h-display mb-6'>어떤 공고에 지원하나요?</h1>

            <div className='col gap-3'>
              {jobs.map((job) => (
                <button
                  key={job.id}
                  type='button'
                  onClick={() => setSelectedJobId(job.id)}
                  className={[
                    'row-between rounded-[var(--radius-card)] border p-4 text-left transition-colors',
                    selectedJobId === job.id
                      ? 'border-[var(--green-300)] bg-[oklch(35%_0.12_155_/_0.12)]'
                      : 'border-[var(--border-default)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)]',
                  ].join(' ')}>
                  <div className='col gap-1'>
                    <p className='caption'>{job.company}</p>
                    <p className='text-sm font-semibold text-[var(--text-1)]'>
                      {job.jobTitle}
                    </p>
                    {job.questions && (
                      <p className='caption'>
                        자소서 문항 {job.questions.length}개
                      </p>
                    )}
                  </div>
                  {selectedJobId === job.id && (
                    <Icon
                      name='check'
                      size={20}
                      className='shrink-0 text-[var(--green-300)]'
                    />
                  )}
                </button>
              ))}

              <button
                type='button'
                onClick={() => setSelectedJobId(null)}
                className={[
                  'row gap-3 rounded-[var(--radius-card)] border border-dashed p-4 transition-colors',
                  selectedJobId === null
                    ? 'border-[var(--green-300)] bg-[oklch(35%_0.12_155_/_0.12)]'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border-default)]',
                ].join(' ')}>
                <Icon name='plus' size={18} className='text-[var(--text-3)]' />
                <span className='caption'>새 채용공고 직접 추가하기</span>
              </button>
            </div>

            <div className='row mt-6 justify-end gap-3 border-t border-[var(--border-subtle)] pt-6'>
              <Link href='/cover-letters' className='btn btn-ghost'>
                취소
              </Link>
              <button
                type='button'
                onClick={handleNext}
                className='btn btn-primary'>
                다음 단계
                <Icon name='arrow_right' size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
