import Link from 'next/link';

import {AppSidebar} from '@/components/ui/AppSidebar/AppSidebar';
import {PageTopBar} from '@/components/ui/PageTopBar/PageTopBar';
import {MatchResultCard} from '@/components/matching/MatchResultCard/MatchResultCard';
import {getMockExperiences} from '@/lib/mock/experience.mock';
import {getMockJobPostings} from '@/lib/mock/job.mock';
import {getMockQuestionMatches} from '@/lib/mock/matching.mock';

interface PageProps {
  params: Promise<{id: string}>;
}

export default async function MatchingPage({params}: PageProps) {
  const {id} = await params;

  const jobPosting = getMockJobPostings().find((j) => j.id === id);
  const experiences = getMockExperiences();
  const matches = getMockQuestionMatches();

  if (!jobPosting) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[var(--bg-canvas)]'>
        <p className='body'>채용공고를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const questions = jobPosting.questions ?? [];
  const questionCount = questions.length;
  const experienceCount = experiences.length;

  return (
    <div className='flex min-h-screen bg-[var(--bg-canvas)]'>
      <AppSidebar />
      <div className='col flex-1 overflow-hidden'>
        <PageTopBar
          title='경험 매칭'
          breadcrumb={[jobPosting.company, jobPosting.jobTitle, '경험 매칭']}
          actions={
            <Link href='/cover-letters/new' className='btn btn-primary btn-sm'>
              이 조합으로 작성
            </Link>
          }
        />
        <main className='col gap-6 overflow-y-auto p-8'>
          {/* 헤더 */}
          <div className='col gap-1'>
            <p className='eyebrow'>STEP 3/5 · 경험 매칭</p>
            <h1 className='h-display'>
              {questionCount}개 문항 · {experienceCount}개 경험의 최적 조합
            </h1>
          </div>

          {/* MatchResultCard 목록 */}
          <div className='col gap-4'>
            {matches.map((match) => {
              const question = questions.find((q) => q.id === match.qId);
              if (!question) return null;
              const matchedExperiences = experiences.filter((e) =>
                match.matched.includes(e.id)
              );
              return (
                <MatchResultCard
                  key={match.qId}
                  question={question}
                  match={match}
                  experiences={matchedExperiences}
                />
              );
            })}
          </div>

          {/* 하단 내비게이션 */}
          <div className='row-between pt-2'>
            <Link href={`/jobs/${id}`} className='btn btn-ghost'>
              ← 이전
            </Link>
            <Link href='/cover-letters/new' className='btn btn-primary'>
              자소서 작성 시작 →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
