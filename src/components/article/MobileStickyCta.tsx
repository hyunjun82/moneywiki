"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  /** 계산기 슬러그 (글과 가장 관련 깊은) */
  calcSlug: string;
  /** 계산기 라벨 */
  calcLabel: string;
}

/**
 * 모바일 하단 끈끈한 CTA (토스/당근 표준)
 * - 스크롤 200px 이상부터 등장
 * - 계산기 바로가기 + 카톡 공유 2버튼
 * - 모바일에서만 보임
 */
export function MobileStickyCta({ calcSlug, calcLabel }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function shareKakao() {
    // Kakao SDK 연동은 다음 단계에서. 지금은 클립보드로 대체
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ url, title: document.title }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert("링크가 복사됐어요. 카톡 채팅창에 붙여넣기 하세요.");
    }
  }

  if (!visible) return null;

  return (
    <div className="mobile-sticky-cta" role="navigation">
      <Link href={`/w/${calcSlug}`} className="msc-btn msc-primary">
        <span className="msc-ico" aria-hidden>🧮</span>
        <span>{calcLabel}</span>
      </Link>
      <button
        type="button"
        className="msc-btn msc-secondary"
        onClick={shareKakao}
        aria-label="카톡으로 공유"
      >
        <span className="msc-ico" aria-hidden>💬</span>
        <span>공유</span>
      </button>
    </div>
  );
}
