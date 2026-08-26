"use client";

import { useEffect, useState } from "react";
import { INK, LINE, PAPER, LIME, MUTE, MONO } from "./theme";
import type { DownloadBuild } from "@/data/download";

const AD_CLIENT = "ca-pub-2442517902625121";
const AD_SLOT = "6190024232";

/**
 * 내려받기 게이트 — 광고를 보여 준 뒤 공식 배포처 파일로 내보낸다.
 *
 * 어느 파일인지는 주소의 ?b=N 으로 정한다. 빌드마다 페이지를 따로 만들면
 * 항목 하나가 페이지 네 장이 되어 빌드가 못 버틴다. 그래서 페이지는 항목당 한 장이고
 * 파일 선택만 브라우저에서 읽는다.
 */
export function GateClient({ builds, sourceNote }: { builds: DownloadBuild[]; sourceNote: string }) {
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get("b"));
    if (Number.isInteger(n) && n >= 0 && n < builds.length) setI(n);
    setReady(true);
    try {
      const w = window as unknown as { adsbygoogle: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {}
  }, [builds.length]);

  const b = builds[i];
  if (!b) return null;

  return (
    <div style={{ border: `1px solid ${LINE}`, maxWidth: 940, margin: "0 auto" }}>
      {/* 어떤 파일을 받는지 먼저 못 박는다 */}
      <div style={{ background: LIME, color: INK, padding: "26px 30px" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", opacity: 0.72 }}>
          {b.platform ?? b.name}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: "clamp(22px,3.4vw,32px)", fontWeight: 800, letterSpacing: "-0.03em" }}>{b.name}</span>
          <span style={{ fontFamily: MONO, fontSize: 13 }}>{b.size} ↓</span>
        </div>
      </div>

      <div style={{ padding: "30px" }}>
        {/* 광고 — '광고'라고 적어 둔다. 아래 받기 버튼과 헷갈리게 두면 안 된다. */}
        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>광고</div>
        <div style={{ marginTop: 10, minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center", background: "#0F0F11", border: `1px solid ${LINE}` }}>
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", maxWidth: 336, height: 280 }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOT}
            data-ad-format="rectangle"
          />
        </div>

        {/* 진짜 받기 버튼 — 여기서만 공식 배포처로 나간다 */}
        <a
          href={b.url}
          rel="nofollow noopener"
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
            background: PAPER, color: INK, textDecoration: "none",
            padding: "24px 26px", marginTop: 26,
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>다운로드 시작</span>
          <span style={{ fontFamily: MONO, fontSize: 13 }}>{b.size} ↓</span>
        </a>

        <p style={{ marginTop: 14, fontSize: 12.5, lineHeight: 1.7, color: MUTE }}>
          버튼을 누르면 {hostOf(b.url)} 의 원본 파일로 연결됩니다. 이 사이트는 파일을 따로 보관하지 않습니다.
        </p>

        {/* 다른 파일이 있으면 여기서 갈아 끼운다 */}
        {ready && builds.length > 1 ? (
          <div style={{ marginTop: 24, borderTop: `1px solid ${LINE}`, paddingTop: 18 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>다른 파일</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {builds.map((x, n) =>
                n === i ? null : (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setI(n)}
                    style={{ background: "transparent", color: PAPER, border: `1px solid ${LINE}`, padding: "10px 14px", fontSize: 13, cursor: "pointer" }}
                  >
                    {x.name}
                    <span style={{ fontFamily: MONO, fontSize: 11, color: MUTE, marginLeft: 8 }}>{x.size}</span>
                  </button>
                )
              )}
            </div>
          </div>
        ) : null}

        <p style={{ marginTop: 22, fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: MUTE }}>{sourceNote}</p>
      </div>
    </div>
  );
}

function hostOf(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return "공식 배포처";
  }
}
