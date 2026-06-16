'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {AppSidebar} from '@/components/ui/AppSidebar/AppSidebar';
import {PageTopBar} from '@/components/ui/PageTopBar/PageTopBar';
import {Icon} from '@/components/ui/Icon/Icon';
import type {ExperienceType} from '@/types/experience';
import {EXPERIENCE_TYPE_LABEL} from '@/types/experience';

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

export default function ExperienceNewPage() {
  const router = useRouter();
  const [type, setType] = useState<ExperienceType>('PROJECT');

  return (
    <div className='flex min-h-screen bg-[var(--bg-canvas)]'>
      <AppSidebar />
      <div className='col flex-1 overflow-hidden'>
        <PageTopBar
          title='새 경험 추가'
          breadcrumb={['경험', '새 경험 추가']}
          actions={
            <Link href='/experiences' className='btn btn-ghost btn-sm'>
              취소
            </Link>
          }
        />
        <main className='overflow-y-auto p-8'>
          <form
            className='col mx-auto max-w-2xl gap-6'
            onSubmit={(e) => {
              e.preventDefault();
              router.push('/experiences');
            }}>
            {/* 경험 유형 */}
            <div>
              <p className={LABEL}>경험 유형</p>
              <div className='row flex-wrap gap-2'>
                {EXPERIENCE_TYPES.map((t) => (
                  <button
                    key={t}
                    type='button'
                    onClick={() => setType(t)}
                    className={[
                      'chip chip-sm',
                      type === t ? 'chip-green' : 'chip-outline',
                    ].join(' ')}>
                    {EXPERIENCE_TYPE_LABEL[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* 기본 정보 */}
            <div className='col gap-4'>
              <div>
                <label className={LABEL}>경험 제목</label>
                <input
                  type='text'
                  placeholder='예: 자기소개서 자동화 서비스 개발'
                  className={INPUT}
                  required
                />
              </div>
              <div>
                <label className={LABEL}>본인 역할</label>
                <input
                  type='text'
                  placeholder='예: 프론트엔드 리드'
                  className={INPUT}
                  required
                />
              </div>
            </div>

            {/* 기간 */}
            <div className='row gap-3'>
              <div className='flex-1'>
                <label className={LABEL}>시작 (YYYY-MM)</label>
                <input type='text' placeholder='2024-03' className={INPUT} />
              </div>
              <div className='flex-1'>
                <label className={LABEL}>종료 (YYYY-MM)</label>
                <input type='text' placeholder='2024-12' className={INPUT} />
              </div>
            </div>

            {/* STAR */}
            <div className='col gap-4 rounded-[var(--radius-card)] border border-[var(--border-subtle)] p-5'>
              <p className='eyebrow'>STAR 형식</p>
              <div>
                <label className={LABEL}>Situation — 상황 / 배경</label>
                <textarea
                  rows={3}
                  placeholder='어떤 문제나 상황이 있었나요?'
                  className={TEXTAREA}
                  required
                />
              </div>
              <div>
                <label className={LABEL}>Action — 내가 한 일</label>
                <textarea
                  rows={4}
                  placeholder='문제를 해결하기 위해 어떤 행동을 취했나요?'
                  className={TEXTAREA}
                  required
                />
              </div>
              <div>
                <label className={LABEL}>Result — 결과</label>
                <textarea
                  rows={3}
                  placeholder='어떤 성과나 변화가 있었나요? 수치로 표현하면 좋아요.'
                  className={TEXTAREA}
                  required
                />
              </div>
            </div>

            {/* 기술 & 역량 */}
            <div className='col gap-4'>
              <div>
                <label className={LABEL}>사용 기술 (쉼표로 구분)</label>
                <input
                  type='text'
                  placeholder='TypeScript, React, Figma'
                  className={INPUT}
                />
              </div>
              <div>
                <label className={LABEL}>발휘 역량 (쉼표로 구분)</label>
                <input
                  type='text'
                  placeholder='문제 해결, 협업, 리더십'
                  className={INPUT}
                />
              </div>
            </div>

            <div className='row justify-end gap-3 border-t border-[var(--border-subtle)] pt-4'>
              <Link href='/experiences' className='btn btn-ghost'>
                취소
              </Link>
              <button type='submit' className='btn btn-primary'>
                <Icon name='check' size={16} />
                저장하기
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
