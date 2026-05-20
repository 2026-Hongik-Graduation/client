'use client';

import Link from 'next/link';

import type {CoverLetter} from '@/types/cover-letter';

import {Icon} from '@/components/ui/Icon/Icon';

interface CoverLetterCardProps {
  coverLetter: CoverLetter;
  onCopy?: (id: string) => void;
  onDelete?: (id: string) => void;
  onExport?: (id: string) => void;
}

const COMPANY_COLORS = [
  'oklch(55% 0.18 280)',
  'oklch(58% 0.21 155)',
  'oklch(60% 0.18 25)',
  'oklch(62% 0.16 200)',
  'oklch(57% 0.2 60)',
  'oklch(56% 0.19 320)',
];

const getCompanyColor = (company: string): string => {
  const code = company.charCodeAt(0);
  return COMPANY_COLORS[code % COMPANY_COLORS.length];
};

const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

export const CoverLetterCard = ({
  coverLetter,
  onCopy,
  onDelete,
  onExport,
}: CoverLetterCardProps) => {
  const {id, company, jobTitle, questions, updatedAt} = coverLetter;

  const progress =
    questions.length === 0
      ? 0
      : Math.round(
          (questions.filter((q) => q.answer.length > 0).length /
            questions.length) *
            100
        );

  const isComplete = progress === 100;
  const companyInitial = company.slice(0, 1);
  const companyColor = getCompanyColor(company);

  return (
    <div className='card col gap-4'>
      {/* 카드 본체 — 편집 페이지 링크 */}
      <Link
        href={`/cover-letters/${id}/edit`}
        className='col gap-3 transition-opacity hover:opacity-80'>
        {/* 상단: 회사 아이콘 + 이름 + 직무 */}
        <div className='row gap-3'>
          <div
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white'
            style={{background: companyColor}}
            aria-hidden='true'>
            {companyInitial}
          </div>
          <div className='col gap-0.5'>
            <p className='text-sm font-semibold text-[var(--text-1)]'>
              {company}
            </p>
            <p className='caption'>{jobTitle}</p>
          </div>
          {/* 완성/작성중 배지 */}
          <div className='ml-auto'>
            {isComplete ? (
              <span className='chip chip-sm chip-green'>완성</span>
            ) : (
              <span className='chip chip-sm chip-outline'>작성중</span>
            )}
          </div>
        </div>

        {/* 진행률 바 */}
        <div className='col gap-1.5'>
          <div className='row-between'>
            <span className='caption'>진행률</span>
            <span className='caption'>{progress}%</span>
          </div>
          <div className='h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)]'>
            <div
              className='h-full rounded-full bg-[var(--green-300)] transition-all'
              style={{width: `${progress}%`}}
            />
          </div>
        </div>
      </Link>

      {/* 하단: 날짜 + 액션 버튼 */}
      <div className='row-between border-t border-[var(--border-subtle)] pt-3'>
        <span className='caption'>수정일 {formatDate(updatedAt)}</span>
        <div className='row gap-1'>
          {onCopy && (
            <button
              type='button'
              aria-label='복사'
              className='btn btn-ghost btn-sm p-1.5'
              onClick={() => onCopy(id)}>
              <Icon name='copy' size={16} />
            </button>
          )}
          {onExport && (
            <button
              type='button'
              aria-label='내보내기'
              className='btn btn-ghost btn-sm p-1.5'
              onClick={() => onExport(id)}>
              <Icon name='download' size={16} />
            </button>
          )}
          <Link
            href={`/cover-letters/${id}/edit`}
            aria-label='편집'
            className='btn btn-ghost btn-sm p-1.5'>
            <Icon name='edit' size={16} />
          </Link>
          {onDelete && (
            <button
              type='button'
              aria-label='삭제'
              className='btn btn-ghost btn-sm p-1.5 text-[var(--danger)]'
              onClick={() => onDelete(id)}>
              <Icon name='trash' size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
