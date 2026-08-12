import { tokens } from "./tokens";

interface Props {
  userQuestion: string;
  directAnswer: string;
  why: string;
}

/**
 * DirectAnswer — 글 최상단 즉답 카드
 *
 * 검색자가 글을 열자마자 보는 첫 화면.
 * "내 질문에 답이 있다"는 신호를 1초 안에 줘야 한다.
 * Featured Snippet 최적화 (Google이 발췌하기 좋은 형태).
 */
export function DirectAnswer({ userQuestion, directAnswer, why }: Props) {
  return (
    <section
      aria-label="질문에 대한 직접 답변"
      style={{
        marginBottom: tokens.space.xl,
        padding: tokens.space.lg,
        background: tokens.color.primarySoft,
        border: `1px solid ${tokens.color.primaryBorder}`,
        borderRadius: tokens.radius.lg,
      }}
    >
      <p
        style={{
          fontSize: tokens.font.small,
          color: tokens.color.primaryDeep,
          fontWeight: 600,
          margin: 0,
          marginBottom: tokens.space.sm,
          opacity: 0.85,
        }}
      >
        Q. {userQuestion}
      </p>
      <p
        style={{
          fontSize: tokens.font.h3,
          color: tokens.color.heading,
          fontWeight: 700,
          lineHeight: 1.5,
          margin: 0,
          marginBottom: tokens.space.md,
        }}
      >
        {directAnswer}
      </p>
      <p
        style={{
          fontSize: tokens.font.body - 1,
          color: tokens.color.text,
          lineHeight: tokens.font.bodyLine,
          margin: 0,
        }}
      >
        {why}
      </p>
    </section>
  );
}
