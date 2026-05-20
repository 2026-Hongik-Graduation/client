'use client';

import {useState} from 'react';

import {ScoreRing} from '@/components/ui/ScoreRing/ScoreRing';
import type {Experience} from '@/types/experience';
import {EXPERIENCE_TYPE_LABEL} from '@/types/experience';
import type {JobQuestion} from '@/types/matching';
import type {QuestionMatch} from '@/types/matching';

interface MatchResultCardProps {
  question: JobQuestion;
  match: QuestionMatch;
  experiences: Experience[];
  onSelectExperience?: (qId: string, expId: string) => void;
}

interface ExperiencePreviewProps {
  experience: Experience;
  isPrimary?: boolean;
}

const ExperiencePreview = ({
  experience,
  isPrimary = false,
}: ExperiencePreviewProps) => {
  const typeLabel = EXPERIENCE_TYPE_LABEL[experience.experienceType];
  return (
    <div
      className={[
        'col gap-2 rounded-[var(--r-sm)] border p-3',
        isPrimary
          ? 'card-glow border-[var(--green-300)]'
          : 'border-[var(--border-default)] bg-[var(--bg-subtle)]',
      ].join(' ')}>
      <div className='row gap-2'>
        <span className='chip chip-sm chip-green'>{typeLabel}</span>
        {isPrimary && <span className='chip chip-sm chip-glow'>Primary</span>}
      </div>
      <p className='text-sm font-semibold text-[var(--text-1)]'>
        {experience.title}
      </p>
      <p className='caption'>{experience.role}</p>
    </div>
  );
};

export const MatchResultCard = ({
  question,
  match,
  experiences,
  onSelectExperience,
}: MatchResultCardProps) => {
  const [selectedExpId, setSelectedExpId] = useState<string>(match.primary);

  const primaryExp = experiences.find((e) => e.id === match.primary);
  const altExpIds = match.matched.filter((id) => id !== match.primary);
  const currentAltExpId =
    selectedExpId !== match.primary ? selectedExpId : altExpIds[0];
  const altExp = experiences.find((e) => e.id === currentAltExpId);

  const handleSwitchExperience = () => {
    if (altExpIds.length === 0) return;
    const currentIndex = altExpIds.indexOf(selectedExpId);
    if (currentIndex === -1) {
      setSelectedExpId(altExpIds[0]);
    } else {
      const nextIndex = (currentIndex + 1) % altExpIds.length;
      setSelectedExpId(altExpIds[nextIndex]);
    }
  };

  const handleSelectExperience = () => {
    onSelectExperience?.(match.qId, selectedExpId);
  };

  return (
    <div className='card col gap-4'>
      {/* 문항 텍스트 + ScoreRing */}
      <div className='row-between gap-4'>
        <p className='h3 flex-1'>{question.text}</p>
        <ScoreRing value={match.score} size={64} strokeWidth={5} />
      </div>

      {/* AI 추천 이유 */}
      <div className='col gap-2'>
        <p className='caption'>추천 이유</p>
        <p className='body'>{match.reason}</p>
        {/* 키워드 칩 목록 */}
        <div className='row flex-wrap gap-1.5'>
          {match.keywords.map((keyword) => (
            <span key={keyword} className='chip chip-green chip-sm'>
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Primary / Alt 경험 2열 */}
      <div className='grid-2'>
        {primaryExp && (
          <ExperiencePreview experience={primaryExp} isPrimary={true} />
        )}
        {altExp && <ExperiencePreview experience={altExp} />}
        {!altExp && altExpIds.length === 0 && (
          <div className='col items-center justify-center rounded-[var(--r-sm)] border border-dashed border-[var(--border-subtle)] p-4'>
            <p className='caption'>대안 경험 없음</p>
          </div>
        )}
      </div>

      {/* 액션 버튼 */}
      <div className='row gap-2'>
        <button
          type='button'
          className='btn btn-ghost btn-sm'
          onClick={handleSwitchExperience}
          disabled={altExpIds.length === 0}>
          다른 경험으로
        </button>
        <button
          type='button'
          className='btn btn-primary btn-sm'
          onClick={handleSelectExperience}>
          이 조합으로 작성
        </button>
      </div>
    </div>
  );
};
