import Link from 'next/link';

import {LogoGlyph} from '@/components/ui';

export default function LandingPage() {
  return (
    <main className='relative min-h-screen w-full overflow-hidden bg-[var(--bg-base)]'>
      {/* 배경 글로우 */}
      <div className='app-bg pointer-events-none absolute inset-0' />

      {/* 중앙 정렬 컨테이너 */}
      <div className='relative z-10 flex min-h-screen items-center justify-center px-4 py-16'>
        {/* 로그인 카드 */}
        <div className='flex w-full max-w-sm flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-card)] p-8 shadow-[var(--shadow-card)]'>
          {/* 로고 아이콘 */}
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-subtle)] text-[var(--green-300)]'>
            <LogoGlyph size={26} />
          </div>

          {/* eyebrow */}
          <p className='text-xs font-semibold tracking-widest text-[var(--text-4)] uppercase'>
            Sprout · Career Studio
          </p>

          {/* 헤드라인 */}
          <h1 className='text-2xl leading-snug font-bold text-[var(--text-1)]'>
            경험을 기록하면
            <br />
            <span className='bg-[var(--grad-text)] bg-clip-text text-transparent'>
              자기소개서가 자라요
            </span>
          </h1>

          {/* 서브 설명 */}
          <p className='text-sm leading-relaxed text-[var(--text-3)]'>
            프로젝트·인턴·활동을 STAR 형식으로 정리하고,
            <br />
            채용공고에 맞는 자기소개서를 AI와 함께 완성하세요.
          </p>

          {/* Google 로그인 버튼 */}
          <Link
            href='/dashboard'
            className='flex w-full items-center justify-center gap-3 rounded-[var(--radius-btn)] bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition-opacity hover:opacity-90'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 18 18'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'>
              <path
                d='M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z'
                fill='#4285F4'
              />
              <path
                d='M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z'
                fill='#34A853'
              />
              <path
                d='M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z'
                fill='#FBBC05'
              />
              <path
                d='M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z'
                fill='#EA4335'
              />
            </svg>
            Google 계정으로 계속하기
          </Link>

          {/* 약관 동의 안내 */}
          <p className='text-center text-xs text-[var(--text-4)]'>
            계속하면{' '}
            <span className='underline underline-offset-2'>이용약관</span> 및{' '}
            <span className='underline underline-offset-2'>
              개인정보처리방침
            </span>
            에 동의하는 것으로 간주합니다.
          </p>

          {/* 구분선 */}
          <hr className='border-t border-[var(--border-subtle)]' />

          {/* 무료 이용 안내 */}
          <p className='text-center text-xs text-[var(--text-4)]'>
            경험 데이터는 비공개 · 전체 무료
          </p>
        </div>
      </div>
    </main>
  );
}
