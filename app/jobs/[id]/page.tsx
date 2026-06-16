import Link from 'next/link';

import {AppSidebar} from '@/components/ui/AppSidebar/AppSidebar';
import {PageTopBar} from '@/components/ui/PageTopBar/PageTopBar';
import {Icon} from '@/components/ui/Icon/Icon';
import {getMockJobPostings} from '@/lib/mock/job.mock';

interface PageProps {
  params: Promise<{id: string}>;
}

export default async function JobDetailPage({params}: PageProps) {
  const {id} = await params;
  const job = getMockJobPostings().find((j) => j.id === id);

  if (!job) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[var(--bg-canvas)]'>
        <div className='col items-center gap-4'>
          <p className='body'>채용공고를 찾을 수 없습니다.</p>
          <Link href='/jobs' className='btn btn-primary'>
            목록으로
          </Link>
        </div>
      </div>
    );
  }

  const questions = job.questions ?? [];

  return (
    <div className='flex min-h-screen bg-[var(--bg-canvas)]'>
      <AppSidebar />
      <div className='col flex-1 overflow-hidden'>
        <PageTopBar
          title={`${job.company} · ${job.jobTitle}`}
          breadcrumb={['채용공고', job.company]}
          actions={
            <Link
              href={`/jobs/${id}/matching`}
              className='btn btn-primary btn-sm'>
              <Icon name='sparkles' size={16} />
              경험 매칭 시작
            </Link>
          }
        />
        <main className='col gap-6 overflow-y-auto p-8'>
          <div className='col gap-1'>
            <p className='eyebrow'>STEP 2 / 5 · 채용공고 분석 결과</p>
            <h1 className='h-display'>
              {job.company} · {job.jobTitle}
            </h1>
          </div>

          <div className='grid-2'>
            <div className='card col gap-3'>
              <p className='h3'>필수 기술 스택</p>
              <div className='row flex-wrap gap-2'>
                {job.requiredSkills.map((skill) => (
                  <span key={skill} className='chip chip-sm chip-green'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className='card col gap-3'>
              <p className='h3'>우대 스킬</p>
              <div className='row flex-wrap gap-2'>
                {job.preferredSkills.map((skill) => (
                  <span key={skill} className='chip chip-sm chip-mint'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className='card col gap-3'>
            <p className='h3'>핵심 역량</p>
            <div className='row flex-wrap gap-2'>
              {job.competencies.map((c) => (
                <span key={c} className='chip chip-sm chip-outline'>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {questions.length > 0 && (
            <div className='card col gap-4'>
              <p className='h3'>자소서 문항 ({questions.length}개)</p>
              <ol className='col gap-4'>
                {questions.map((q, index) => (
                  <li key={q.id} className='col gap-1.5'>
                    <div className='row gap-2'>
                      <span className='chip chip-sm chip-green'>
                        {index + 1}
                      </span>
                      {q.limit && (
                        <span className='caption'>{q.limit}자 이내</span>
                      )}
                    </div>
                    <p className='body'>{q.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className='row-between pt-2'>
            <Link href='/jobs' className='btn btn-ghost'>
              ← 목록으로
            </Link>
            <Link href={`/jobs/${id}/matching`} className='btn btn-primary'>
              경험 매칭 시작 →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
