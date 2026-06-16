'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {AppSidebar} from '@/components/ui/AppSidebar/AppSidebar';
import {PageTopBar} from '@/components/ui/PageTopBar/PageTopBar';
import {Icon} from '@/components/ui/Icon/Icon';

const INPUT =
  'w-full rounded-[var(--r-sm)] border border-[var(--border-default)] bg-[var(--bg-subtle)] px-3 py-2 text-sm text-[var(--text-1)] placeholder:text-[var(--text-4)] focus:outline-none focus:ring-1 focus:ring-[var(--green-300)]';

const TEXTAREA = `${INPUT} resize-none`;

const LABEL = 'caption mb-1.5 block';

export default function JobNewPage() {
  const router = useRouter();

  return (
    <div className='flex min-h-screen bg-[var(--bg-canvas)]'>
      <AppSidebar />
      <div className='col flex-1 overflow-hidden'>
        <PageTopBar
          title='채용공고 분석'
          breadcrumb={['채용공고', '새 공고 추가']}
          actions={
            <Link href='/jobs' className='btn btn-ghost btn-sm'>
              취소
            </Link>
          }
        />
        <main className='overflow-y-auto p-8'>
          <div className='col mx-auto max-w-2xl gap-2'>
            <p className='eyebrow'>STEP 1 / 5 · 채용공고 입력</p>
            <h1 className='h-display mb-6'>분석할 채용공고를 붙여넣으세요</h1>

            <form
              className='col gap-6'
              onSubmit={(e) => {
                e.preventDefault();
                router.push('/jobs');
              }}>
              <div className='row gap-4'>
                <div className='flex-1'>
                  <label className={LABEL}>회사명</label>
                  <input
                    type='text'
                    placeholder='예: 카카오'
                    className={INPUT}
                    required
                  />
                </div>
                <div className='flex-1'>
                  <label className={LABEL}>지원 직무</label>
                  <input
                    type='text'
                    placeholder='예: 프론트엔드 개발자'
                    className={INPUT}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={LABEL}>채용공고 전문</label>
                <textarea
                  rows={14}
                  placeholder={
                    '채용공고 전문을 복사해 붙여넣으세요.\n\nAI가 자동으로 필수 스킬, 우대 역량, 자소서 문항을 추출합니다.'
                  }
                  className={TEXTAREA}
                  required
                />
              </div>

              <div className='row gap-3 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4'>
                <Icon
                  name='sparkles'
                  size={18}
                  className='shrink-0 text-[var(--green-300)]'
                />
                <p className='caption leading-relaxed'>
                  AI가 공고 텍스트를 분석해 필수 스킬, 우대 조건, 핵심 역량,
                  자소서 문항을 자동으로 추출합니다.
                </p>
              </div>

              <div className='row justify-end gap-3 border-t border-[var(--border-subtle)] pt-4'>
                <Link href='/jobs' className='btn btn-ghost'>
                  취소
                </Link>
                <button type='submit' className='btn btn-primary'>
                  <Icon name='sparkles' size={16} />
                  AI 분석 시작
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
