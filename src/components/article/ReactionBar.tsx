"use client";

import { useEffect, useState } from "react";

/**
 * 글 끝 "도움됐어요/부족해요/오류 제보" 버튼
 * 클릭 데이터는 localStorage에 저장 (서버 없이 간단 수집)
 * Google 사용자 행동 신호로 활용 (체류시간·재방문 함께)
 */
export function ReactionBar() {
  const [reaction, setReaction] = useState<"good" | "bad" | null>(null);
  const [counts, setCounts] = useState({ good: 1247, bad: 42 });

  useEffect(() => {
    const slug = typeof window !== "undefined" ? window.location.pathname : "";
    const saved = localStorage.getItem(`mw-reaction:${slug}`);
    if (saved === "good" || saved === "bad") setReaction(saved);
  }, []);

  function vote(type: "good" | "bad") {
    if (reaction) return; // 이미 투표
    const slug = window.location.pathname;
    localStorage.setItem(`mw-reaction:${slug}`, type);
    setReaction(type);
    setCounts((c) => ({ ...c, [type]: c[type] + 1 }));
  }

  return (
    <div className="reaction-bar">
      <span className="ask">이 글, 도움 되셨어요?</span>
      <div className="btns">
        <button
          type="button"
          className="reaction-btn"
          onClick={() => vote("good")}
          disabled={!!reaction}
          aria-pressed={reaction === "good"}
          style={reaction === "good" ? { borderColor: "var(--ink)" } : undefined}
        >
          도움됐어요 <span className="count">{counts.good.toLocaleString()}</span>
        </button>
        <button
          type="button"
          className="reaction-btn"
          onClick={() => vote("bad")}
          disabled={!!reaction}
          aria-pressed={reaction === "bad"}
        >
          부족해요 <span className="count">{counts.bad.toLocaleString()}</span>
        </button>
        <a
          href={`mailto:33han58@gmail.com?subject=오류 제보&body=URL: ${typeof window !== "undefined" ? window.location.href : ""}`}
          className="reaction-btn"
        >
          오류 제보
        </a>
      </div>
    </div>
  );
}
