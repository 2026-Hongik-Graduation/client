import Link from 'next/link';

import {AppSidebar} from '@/components/ui/AppSidebar/AppSidebar';
import {PageTopBar} from '@/components/ui/PageTopBar/PageTopBar';
import {Icon} from '@/components/ui/Icon/Icon';
import {getMockExperiences} from '@/lib/mock/experience.mock';
import type {ExperienceType} from '@/types/experience';
import {EXPERIENCE_TYPE_LABEL} from '@/types/experience';

interface PageProps {
  params: Promise<{id: string}>;
}

const EXPERIENCE_TYPES: ExperienceType[] = [
  'PROJECT',
  'INTERNSHIP',
  'ACTIVITY',
  'AWARD',
  'OTHER',
];

const INPUT =
  'w-full rounded-[var(--r-sm)] border border-[var(--border-default)] bg-[var(--bg-subtle)] px-3 py-2 text-sm text-[var(--text-1)] placeholder:text-[var(--text-4)] focus:outline-none focus:ring-1 focus:ring-[var(--green-300)]';

const TEXTAREA = `${INPUT} resize-none`;

const LABEL = 'caption mb-1.5 block';

export default async function ExperienceEditPage({params}: PageProps) {
  const {id} = await params;
  const experience = getMockExperiences().find((e) => e.id === id);

  if (!experience) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[var(--bg-canvas)]'>
        <div className='col items-center gap-4'>
          <p className='body'>경험을 찾을 수 없습니다.</p>
          <Link href='/experiences' className='btn btn-primary'>
            경험 목록으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen bg-[var(--bg-canvas)]'>
      <AppSidebar />
      <div className='col flex-1 overflow-hidden'>
        <PageTopBar
          title='경험 수정'
          breadcrumb={['경험', experience.title, '수정']}
          actions={
            <Link href='/experiences' className='btn btn-ghost btn-sm'>
              취소
            </Link>
          }
        />
        <main className='overflow-y-auto p-8'>
          <div className='col mx-auto max-w-2xl gap-6'>
            {/* 경험 유형 */}
            <div>
              <p className={LABEL}>경험 유형</p>
              <div className='row flex-wrap gap-2'>
                {EXPERIENCE_TYPES.map((t) => (
                  <span
                    key={t}
                    className={[
                      'chip chip-sm',
                      experience.experienceType === t
                        ? 'chip-green'
                        : 'chip-outline',
                    ].join(' ')}>
                    {EXPERIENCE_TYPE_LABEL[t]}
                  </span>
                ))}
              </div>
            </div>

            {/* 기본 정보 */}
            <div className='col gap-4'>
              <div>
                <label className={LABEL}>경험 제목</label>
                <input
                  type='text'
                  defaultValue={experience.title}
                  className={INPUT}
                />
              </div>
              <div>
                <label className={LABEL}>본인 역할</label>
                <input
                  type='text'
                  defaultValue={experience.role}
                  className={INPUT}
                />
              </div>
            </div>

            {/* 기간 */}
            <div className='row gap-3'>
              <div className='flex-1'>
                <label className={LABEL}>시작 (YYYY-MM)</label>
                <input
                  type='text'
                  defaultValue={experience.startDate ?? ''}
                  className={INPUT}
                />
              </div>
              <div className='flex-1'>
                <label className={LABEL}>종료 (YYYY-MM)</label>
                <input
                  type='text'
                  defaultValue={experience.endDate ?? ''}
                  className={INPUT}
                />
              </div>
            </div>

            {/* STAR */}
            <div className='col gap-4 rounded-[var(--radius-card)] border border-[var(--border-subtle)] p-5'>
              <p className='eyebrow'>STAR 형식</p>
              <div>
                <label className={LABEL}>Situation — 상황 / 배경</label>
                <textarea
                  rows={3}
                  defaultValue={experience.problem}
                  className={TEXTAREA}
                />
              </div>
              <div>
                <label className={LABEL}>Action — 내가 한 일</label>
                <textarea
                  rows={4}
                  defaultValue={experience.action}
                  className={TEXTAREA}
                />
              </div>
              <div>
                <label className={LABEL}>Result — 결과</label>
                <textarea
                  rows={3}
                  defaultValue={experience.result}
                  className={TEXTAREA}
                />
              </div>
            </div>

            {/* 기술 & 역량 */}
            <div className='col gap-4'>
              <div>
                <label className={LABEL}>사용 기술 (쉼표로 구분)</label>
                <input
                  type='text'
                  defaultValue={experience.skills.join(', ')}
                  className={INPUT}
                />
              </div>
              <div>
                <label className={LABEL}>발휘 역량 (쉼표로 구분)</label>
                <input
                  type='text'
                  defaultValue={experience.competencies.join(', ')}
                  className={INPUT}
                />
              </div>
            </div>

            <div className='row justify-end gap-3 border-t border-[var(--border-subtle)] pt-4'>
              <Link href='/experiences' className='btn btn-ghost'>
                취소
              </Link>
              <Link href='/experiences' className='btn btn-primary'>
                <Icon name='check' size={16} />
                저장하기
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
