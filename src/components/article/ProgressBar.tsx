"use client";

import { useEffect, useState } from "react";

/** 스크롤 진행률 표시 (글 페이지 최상단) */
export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? (h.scrollTop / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="progress-bar" aria-hidden>
      <div className="fill" style={{ width: `${progress}%` }} />
    </div>
  );
}
