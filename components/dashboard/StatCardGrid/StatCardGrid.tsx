import {StatCard} from '../StatCard/StatCard';

interface DashboardStats {
  experienceCount: number;
  jobCount: number;
  coverLetterCount: number;
}

interface StatCardGridProps {
  stats: DashboardStats;
}

export const StatCardGrid = ({stats}: StatCardGridProps) => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      <StatCard
        label='등록된 경험'
        count={stats.experienceCount}
        linkHref='/experiences'
        linkLabel='경험 목록 보기'
      />
      <StatCard
        label='분석한 채용공고'
        count={stats.jobCount}
        linkHref='/jobs'
        linkLabel='채용공고 목록 보기'
      />
      <StatCard
        label='작성 중인 자소서'
        count={stats.coverLetterCount}
        linkHref='/cover-letters'
        linkLabel='자소서 목록 보기'
      />
    </div>
  );
};
