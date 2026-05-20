import Link from 'next/link';

interface WelcomeBannerProps {
  userName?: string;
}

export const WelcomeBanner = ({userName = '취준생'}: WelcomeBannerProps) => {
  return (
    <section className='relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-card)] p-8 shadow-[var(--shadow-card)]'>
      {/* grad-ai 배경 오버레이 */}
      <div
        className='pointer-events-none absolute inset-0 bg-[image:var(--grad-ai)] opacity-10'
        aria-hidden='true'
      />

      <div className='relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
        {/* 텍스트 영역 */}
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-[var(--green-300)]'>
            안녕하세요, {userName}님
          </p>
          <h1 className='text-2xl leading-snug font-bold text-[var(--text-1)]'>
            오늘도 자소서를 완성해볼까요?
          </h1>
          <p className='text-sm leading-relaxed text-[var(--text-3)]'>
            AI가 경험을 분석하고 채용공고에 맞는 초안을 생성해드립니다.
          </p>
        </div>

        {/* CTA 버튼 */}
        <Link
          href='/cover-letters/new'
          className='inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-btn)] bg-[var(--green-300)] px-5 py-3 text-sm font-semibold text-[var(--bg-base)] transition-opacity hover:opacity-90'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'>
            <path
              d='M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z'
              fill='currentColor'
            />
          </svg>
          AI 자소서 작성 시작
        </Link>
      </div>
    </section>
  );
};
