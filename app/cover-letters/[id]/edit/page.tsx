import Link from 'next/link';

import {AppSidebar} from '@/components/ui/AppSidebar/AppSidebar';
import {PageTopBar} from '@/components/ui/PageTopBar/PageTopBar';
import {Icon} from '@/components/ui/Icon/Icon';
import {AiChatbot} from '@/components/cover-letter/AiChatbot/AiChatbot';
import {getMockCoverLetters} from '@/lib/mock/cover-letter.mock';
import type {CoverLetterQuestion} from '@/types/cover-letter';

interface PageProps {
  params: Promise<{id: string}>;
}

type QuestionStatus = '작성중' | '초안' | '미작성';

const getQuestionStatus = (q: CoverLetterQuestion): QuestionStatus => {
  if (q.answer.length === 0) return '미작성';
  if (q.maxLength && q.answer.length >= q.maxLength * 0.8) return '작성중';
  return '초안';
};

const STATUS_CHIP: Record<QuestionStatus, string> = {
  작성중: 'chip chip-sm chip-green',
  초안: 'chip chip-sm chip-mint',
  미작성: 'chip chip-sm chip-outline',
};

const AI_SUGGESTION =
  '카카오 프론트엔드 직무에 지원하게 된 계기는 사용자 경험을 코드로 구현하는 과정에서 느끼는 보람에서 시작됩니다. 자소서 자동화 프로젝트를 통해 Next.js와 AI API를 결합하여 실질적인 문제를 해결한 경험은 카카오가 추구하는 사용자 중심 기술 혁신과 맞닿아 있습니다.';

export default async function CoverLetterEditPage({params}: PageProps) {
  const {id} = await params;

  const coverLetter = getMockCoverLetters().find((cl) => cl.id === id);

  if (!coverLetter) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[var(--bg-canvas)]'>
        <p className='body'>자기소개서를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const {company, jobTitle, questions} = coverLetter;
  const activeQuestion = questions[0] ?? null;
  const charCount = activeQuestion?.answer.length ?? 0;
  const maxLength = activeQuestion?.maxLength ?? 500;

  return (
    <div className='flex min-h-screen bg-[var(--bg-canvas)]'>
      <AppSidebar />
      <div className='col flex-1 overflow-hidden'>
        <PageTopBar
          title={`${company} · ${jobTitle}`}
          breadcrumb={['자기소개서', company]}
          actions={
            <>
              <span className='caption flex items-center gap-1.5'>
                <div className='dot-pulse' />
                자동 저장됨
              </span>
              <button type='button' className='btn btn-secondary btn-sm'>
                <Icon name='eye' size={16} />
                미리보기
              </button>
              <button type='button' className='btn btn-secondary btn-sm'>
                <Icon name='download' size={16} />
                내보내기
              </button>
              <button type='button' className='btn btn-primary btn-sm'>
                <Icon name='check' size={16} />
                완성하기
              </button>
            </>
          }
        />

        <div className='flex flex-1 gap-4 overflow-hidden p-6'>
          {/* 에디터 영역 */}
          <div className='col flex-1 gap-4 overflow-y-auto'>
            {/* 문항 탭 스위처 */}
            {questions.length > 0 && (
              <div className='row flex-wrap gap-2'>
                {questions.map((q, index) => {
                  const status = getQuestionStatus(q);
                  const isActive = q.id === activeQuestion?.id;
                  return (
                    <button
                      key={q.id}
                      type='button'
                      className={[
                        'btn btn-sm gap-2',
                        isActive ? 'btn-secondary' : 'btn-ghost',
                      ].join(' ')}>
                      <span>{index + 1}번 문항</span>
                      <span className={STATUS_CHIP[status]}>{status}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {activeQuestion ? (
              <div className='doc-paper col gap-4'>
                {/* 문항 텍스트 */}
                <p className='doc-question'>{activeQuestion.question}</p>

                {/* 답변 영역 */}
                <p className='doc-paragraph'>
                  {activeQuestion.answer || '여기에 내용을 작성하세요...'}
                </p>

                {/* AI 제안 블록 */}
                <div className='doc-suggest col gap-3'>
                  <div className='row gap-2'>
                    <Icon
                      name='sparkles'
                      size={14}
                      className='text-[var(--green-300)]'
                    />
                    <p className='caption'>AI 제안</p>
                  </div>
                  <p className='body'>{AI_SUGGESTION}</p>
                  <div className='row gap-2'>
                    <button type='button' className='btn btn-primary btn-sm'>
                      적용
                    </button>
                    <button type='button' className='btn btn-ghost btn-sm'>
                      무시
                    </button>
                  </div>
                </div>

                {/* 하단 지표 바 */}
                <div className='row-between caption border-t border-[var(--border-subtle)] pt-3'>
                  <span>
                    {charCount} / {maxLength}자
                  </span>
                  <span>매칭률 91%</span>
                </div>
              </div>
            ) : (
              <div className='col items-center justify-center gap-4 py-16'>
                <p className='body'>문항이 없습니다.</p>
                <Link href='/cover-letters/new' className='btn btn-primary'>
                  새 자소서 작성
                </Link>
              </div>
            )}
          </div>

          {/* AI 챗봇 사이드 패널 */}
          <AiChatbot />
        </div>
      </div>
    </div>
  );
}
