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

  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get("b"));
    if (Number.isInteger(n) && n >= 0 && n < builds.length) setI(n);
    try {
      const w = window as unknown as { adsbygoogle: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {}
  }, [builds.length]);

  const b = builds[i];
  if (!b) return null;
  const isFile = b.kind === "file";

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
        {/* 광고 — 화면을 덮지 않는 일반 자리다. '광고'라고 적고, 아래 받기 버튼과
            충분히 띄워 둔다. 붙여 놓으면 잘못 눌리게 유도한 것으로 본다. */}
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

        {/* 여기서만 공식 배포처로 나간다.
            파일로 바로 거는 경우와 받는 화면으로 보내는 경우의 문구를 나눈다 —
            페이지로 보내면서 "다운로드 시작"이라고 적으면 그건 거짓말이다. */}
        <a
          href={b.url}
          rel="nofollow noopener"
          className="dl-btn-paper"
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
            background: PAPER, color: INK, textDecoration: "none",
            padding: "24px 26px", marginTop: 40,
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
            {isFile ? "다운로드 시작" : "공식 다운로드 화면 열기"}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 13 }}>{isFile ? `${b.size} ↓` : "→"}</span>
        </a>

        <p style={{ marginTop: 14, fontSize: 12.5, lineHeight: 1.7, color: MUTE }}>
          {isFile
            ? `버튼을 누르면 ${hostOf(b.url)} 의 원본 파일로 연결됩니다. 이 사이트는 파일을 따로 보관하지 않습니다.`
            : `버튼을 누르면 ${hostOf(b.url)} 의 공식 다운로드 화면이 열립니다. 파일은 그곳에서 직접 받게 되며, 이 사이트는 파일을 보관하지도 중계하지도 않습니다.`}
        </p>
        {!isFile ? (
          <p style={{ marginTop: 8, fontSize: 12, lineHeight: 1.7, color: "#5A5A5E" }}>
            파일에 직접 걸지 않는 이유는, 배포처가 파일을 갱신하면 그 주소가 지난 버전을 가리키기 때문입니다.
            공식 화면은 언제나 최신을 들고 있습니다.
          </p>
        ) : null}

        {/* 다른 파일 — 누르면 그 파일이 있는 공식 화면으로 나간다.
            전에는 화면 안에서 표시만 바꾸는 버튼이었다. 누른 사람 입장에서는
            아무 일도 안 일어난 것처럼 보인다. 눌렀으면 가야 한다. */}
        {builds.length > 1 ? (
          <div style={{ marginTop: 24, borderTop: `1px solid ${LINE}`, paddingTop: 18 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: MUTE }}>다른 파일</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {builds.map((x, n) =>
                n === i ? null : (
                  <a
                    key={n}
                    href={x.url}
                    rel="nofollow noopener"
                    className="dl-a"
                    // color 를 인라인으로 박으면 호버 클래스가 못 이긴다. 바깥에서 물려받게 둔다.
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${LINE}`, padding: "10px 14px", fontSize: 13 }}
                  >
                    <span>{x.name}</span>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: MUTE }}>{x.size}</span>
                    <span style={{ fontSize: 12, color: MUTE }}>↗</span>
                  </a>
                )
              )}
            </div>
            <p style={{ marginTop: 10, fontSize: 12, color: "#5A5A5E" }}>
              누르면 그 파일이 있는 공식 화면으로 이동합니다.
            </p>
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
