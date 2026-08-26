"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { INK, LINE, PAPER, LIME, MUTE, MONO } from "./theme";

const AD_CLIENT = "ca-pub-2442517902625121";
const AD_SLOT = "6190024232"; // 기존 양식 다운로드에서 쓰던 전면 슬롯

/**
 * 받기 버튼 — 누르면 전면광고를 띄우고, 카운트다운이 끝나면 게이트로 넘어간다.
 *
 * 광고는 사용자가 버튼을 누른 뒤에만 뜬다. 페이지에 들어오자마자 화면을 덮는 방식은
 * 애드센스 정책에 걸린다. 광고 위에 '광고' 표시를 달고, 넘어갈 곳도 미리 적어 둔다 —
 * 광고를 버튼처럼 보이게 하면 안 되기 때문이다.
 */
export function DownloadCta({
  platforms,
  label,
  href,
  seconds = 4,
}: {
  platforms: string;
  label: string;
  /** 카운트다운이 끝나면 갈 곳 — 우리 사이트 안의 게이트 페이지 */
  href: string;
  seconds?: number;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState(seconds);
  const pushed = useRef(false);

  useEffect(() => {
    if (!open) return;
    router.prefetch(href);
    if (!pushed.current) {
      pushed.current = true;
      try {
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({});
      } catch {}
    }
    if (left <= 0) {
      router.push(href);
      return;
    }
    const t = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [open, left, href, router]);

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); setLeft(seconds); }}
        style={{
          display: "block", width: "100%", maxWidth: 620, textAlign: "left",
          background: LIME, color: INK, border: "none", cursor: "pointer",
          padding: "24px 26px", marginTop: 34,
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", opacity: 0.72 }}>
          {platforms}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>{label}</span>
          <span style={{ fontSize: 20 }}>↓</span>
        </div>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="다운로드 준비 중"
          style={{
            position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,.82)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
          }}
        >
          <div style={{ width: "100%", maxWidth: 380, background: INK, border: `1px solid ${LINE}`, padding: 20 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>광고</div>
            <div style={{ marginTop: 10, minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center", background: "#0F0F11" }}>
              <ins
                className="adsbygoogle"
                style={{ display: "block", width: 300, height: 250 }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={AD_SLOT}
                data-ad-format="rectangle"
              />
            </div>

            <div style={{ marginTop: 18, borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>
              <div style={{ fontSize: 13, color: MUTE }}>
                {left > 0 ? `${left}초 뒤 다운로드 화면으로 넘어갑니다.` : "넘어가는 중…"}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => router.push(href)}
                  style={{ flex: 1, background: LIME, color: INK, border: "none", padding: "12px 14px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                >
                  지금 넘어가기 →
                </button>
                <button
                  type="button"
                  onClick={() => { setOpen(false); setLeft(seconds); }}
                  style={{ background: "transparent", color: PAPER, border: `1px solid ${LINE}`, padding: "12px 14px", fontSize: 13, cursor: "pointer" }}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
