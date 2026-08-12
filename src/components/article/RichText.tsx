import { tokens } from "./tokens";

/**
 * 가벼운 인라인 마크다운 변환
 * - **굵게** → <strong>
 * - 단락 구분(\n\n) → 별도 <p>
 *
 * 외부 라이브러리 없이 검색의도 글에 필요한 최소 패턴만 처리.
 */

function renderInline(text: string): React.ReactNode[] {
  // **bold** 패턴 매칭
  const parts: React.ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={key++} style={{ color: tokens.color.heading, fontWeight: 700 }}>
        {match[1]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

export function RichText({ children }: { children: string }) {
  const paragraphs = children.split(/\n\n+/);
  return (
    <>
      {paragraphs.map((para, i) => (
        <p
          key={i}
          style={{
            margin: 0,
            marginBottom: i < paragraphs.length - 1 ? tokens.space.md : 0,
            fontSize: tokens.font.body,
            color: tokens.color.text,
            lineHeight: tokens.font.bodyLine,
          }}
        >
          {renderInline(para)}
        </p>
      ))}
    </>
  );
}
