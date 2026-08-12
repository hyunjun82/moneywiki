import type { MainSection } from "@/data/articles/types";

/**
 * 모바일 전용 점프 칩 (H1 아래)
 * - 데스크탑 TOC가 모바일에서 숨겨지는 문제 해결
 * - 검색자가 "내 상황으로 바로" 점프 가능
 * - 최대 4개 (가장 자주 묻는 질문 위주)
 */
export function MobileJumpChips({ sections }: { sections: MainSection[] }) {
  const top = sections.slice(0, 4);
  return (
    <nav className="mobile-jump" aria-label="내 상황으로 바로가기">
      <p className="mj-label">내 상황으로 바로가기</p>
      <div className="mj-chips">
        {top.map((s, i) => (
          <a key={i} href={`#s${i + 1}`} className="mj-chip">
            {s.heading}
          </a>
        ))}
      </div>
    </nav>
  );
}
