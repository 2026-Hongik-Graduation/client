import {Icon} from '@/components/ui/Icon/Icon';

interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
}

interface AiChatbotProps {
  messages?: ChatMessage[];
  isThinking?: boolean;
}

const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    role: 'ai',
    content: '안녕하세요! 카카오 프론트엔드 자기소개서 작성을 도와드릴게요.',
  },
  {
    role: 'ai',
    content:
      '1번 문항에서 자소서 자동화 프로젝트 경험이 매칭됐어요. 이 경험을 중심으로 작성해볼까요?',
  },
  {role: 'user', content: '네, 좋아요. 초안 써줄 수 있어요?'},
  {role: 'ai', content: '물론이죠! 아래 초안을 참고해보세요.'},
];

export const AiChatbot = ({
  messages = MOCK_CHAT_MESSAGES,
  isThinking = false,
}: AiChatbotProps) => {
  return (
    <aside className='col h-full w-80 shrink-0 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]'>
      {/* 헤더 */}
      <div className='row-between border-b border-[var(--border-subtle)] px-4 py-3'>
        <div className='row gap-2'>
          <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[var(--grad-ai)] text-white'>
            <Icon name='sparkles' size={14} />
          </span>
          <span className='text-sm font-semibold text-[var(--text-1)]'>
            AI 어시스턴트
          </span>
        </div>
        <div className='dot-pulse' />
      </div>

      {/* 메시지 목록 */}
      <div className='col flex-1 gap-3 overflow-y-auto px-4 py-4'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={[
              'col gap-1',
              msg.role === 'user' ? 'items-end' : 'items-start',
            ].join(' ')}>
            {msg.role === 'ai' && <span className='eyebrow px-1'>AI</span>}
            <div
              className={[
                'max-w-[85%] rounded-[var(--r-sm)] px-3 py-2 text-sm leading-relaxed',
                msg.role === 'ai'
                  ? 'bg-[var(--bg-subtle)] text-[var(--text-2)]'
                  : 'bg-[var(--green-300)] text-[oklch(10%_0.01_155)]',
              ].join(' ')}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* AI 타이핑 인디케이터 */}
        {isThinking && (
          <div className='items-start'>
            <div className='rounded-[var(--r-sm)] bg-[var(--bg-subtle)] px-3 py-2'>
              <div className='ai-thinking'>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 입력창 (비활성 UI) */}
      <div className='border-t border-[var(--border-subtle)] px-4 py-3'>
        <div className='row gap-2 rounded-[var(--r-sm)] border border-[var(--border-default)] bg-[var(--bg-subtle)] px-3 py-2'>
          <input
            type='text'
            placeholder='AI에게 물어보세요...'
            disabled
            className='flex-1 bg-transparent text-sm text-[var(--text-3)] outline-none placeholder:text-[var(--text-4)]'
          />
          <button
            type='button'
            disabled
            aria-label='전송'
            className='btn btn-ghost btn-sm p-1 opacity-40'>
            <Icon name='arrow_right' size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
