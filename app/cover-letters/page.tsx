import Link from 'next/link';

import {AppSidebar} from '@/components/ui/AppSidebar/AppSidebar';
import {PageTopBar} from '@/components/ui/PageTopBar/PageTopBar';
import {Icon} from '@/components/ui/Icon/Icon';
import {CoverLetterCard} from '@/components/cover-letter/CoverLetterCard/CoverLetterCard';
import {getMockCoverLetters} from '@/lib/mock/cover-letter.mock';

export default function CoverLettersPage() {
  const coverLetters = getMockCoverLetters();

  return (
    <div className='flex min-h-screen bg-[var(--bg-canvas)]'>
      <AppSidebar />
      <div className='col flex-1 overflow-hidden'>
        <PageTopBar
          title={`${coverLetters.length}개의 자기소개서를 관리 중이에요`}
          actions={
            <>
              <button type='button' className='btn btn-secondary btn-sm'>
                <Icon name='sort' size={16} />
                정렬
              </button>
              <button type='button' className='btn btn-secondary btn-sm'>
                <Icon name='filter' size={16} />
                필터
              </button>
              <Link
                href='/cover-letters/new'
                className='btn btn-primary btn-sm'>
                <Icon name='plus' size={16} />새 자소서 작성
              </Link>
            </>
          }
        />
        <main className='overflow-y-auto p-8'>
          {coverLetters.length === 0 ? (
            /* 빈 상태 UI */
            <div className='col items-center justify-center gap-4 py-24'>
              <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--bg-subtle)] text-[var(--text-4)]'>
                <Icon name='sparkles' size={32} />
              </div>
              <div className='col items-center gap-2'>
                <p className='h3'>아직 작성한 자기소개서가 없어요</p>
                <p className='body text-center'>
                  채용공고를 분석하고 AI와 함께 자기소개서를 작성해보세요.
                </p>
              </div>
              <Link href='/cover-letters/new' className='btn btn-primary'>
                <Icon name='plus' size={16} />첫 자소서 작성하기
              </Link>
            </div>
          ) : (
            <div className='grid-2'>
              {coverLetters.map((cl) => (
                <CoverLetterCard key={cl.id} coverLetter={cl} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
