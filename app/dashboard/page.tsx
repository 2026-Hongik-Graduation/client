import {
  DashboardHeader,
  QuickActions,
  RecentExperienceList,
  StatCardGrid,
  WelcomeBanner,
} from '@/components/dashboard';
import {getMockCoverLetters} from '@/lib/mock/cover-letter.mock';
import {getMockExperiences} from '@/lib/mock/experience.mock';
import {getMockJobPostings} from '@/lib/mock/job.mock';

export default function DashboardPage() {
  const experiences = getMockExperiences();
  const jobs = getMockJobPostings();
  const coverLetters = getMockCoverLetters();

  const stats = {
    experienceCount: experiences.length,
    jobCount: jobs.length,
    coverLetterCount: coverLetters.length,
  };

  const recentExperiences = experiences.slice(0, 3);

  return (
    <div className='min-h-screen bg-[var(--bg-base)]'>
      <DashboardHeader />
      <main className='mx-auto flex max-w-5xl flex-col gap-8 px-6 py-8'>
        <WelcomeBanner />
        <StatCardGrid stats={stats} />
        <RecentExperienceList experiences={recentExperiences} />
        <QuickActions />
      </main>
    </div>
  );
}
