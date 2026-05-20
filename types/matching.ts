// 채용공고의 문항 (JobPosting.questions[] 요소)
export interface JobQuestion {
  id: string;
  text: string; // 문항 텍스트
  limit: number; // 글자 수 제한
}

// 문항 1개에 대한 AI 매칭 결과
export interface QuestionMatch {
  qId: string; // JobQuestion.id 참조
  primary: string; // 우선 추천 Experience.id
  matched: string[]; // 추천 Experience.id 목록 (primary 포함)
  score: number; // 0–100 매칭 점수
  keywords: string[]; // 공통 키워드
  reason: string; // AI 추천 이유 한 줄 설명
}
