import type { Metadata } from "next";

export const metadata: Metadata = {
  // 루트 레이아웃이 "%s | 머니위키" 템플릿을 붙인다. 이 페이지는 독립 화면이라 absolute 로 끊는다.
  title: { absolute: "다운로드 인덱스 — 프로그램·드라이버·게임·폰트·서식" },
  description:
    "프로그램·드라이버·게임·폰트·서식을 국내 기기 모델 단위까지 색인한 다운로드 데이터베이스. 공식 배포처 원본만 연결합니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/download" },
};

/* 색상 — 원본 번들과 동일하게 맞춘다 */
const INK = "#0B0B0C"; // 배경
const LINE = "#232326"; // 경계선
const PAPER = "#F2F1ED"; // 본문 밝은 글자
const LIME = "#D6F84C"; // 강조
const MUTE = "#7E7E82"; // 보조 글자
const CARD = "#141416"; // 카드 배경
const CARD2 = "#3A3A3E"; // 카드 배경(밝은 쪽)

const MONO =
  'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

const ticker = [
  "NEW — 곰플레이어 2026.08 정식",
  "삼성 SL-M2020 드라이버 갱신",
  "무료폰트 42종 상업용 허용 확인",
  "한글뷰어 HWPX 지원 추가",
  "HP LaserJet M15w Win11 패치",
  "근로계약서 표준서식 2026 개정",
  "V3 Lite 엔진 업데이트",
  "요청 처리 평균 11시간 42분",
];

const nav = ["소프트웨어", "드라이버 · 설명서", "게임", "폰트 · 서식", "앱 · 미디어", "요청 게시판"];
const tabs = ["프로그램 예시", "드라이버 예시", "서식 예시"];

const stats = [
  { k: "INDEXED FILES", v: "48,210", lime: false },
  { k: "DEVICE MODELS", v: "9,674", lime: false },
  { k: "VIRUS SCANNED", v: "100%", lime: true },
];

const categories = [
  { no: "01", count: "612", name: "소프트웨어", desc: "곰플레이어·알집·V3·한글뷰어 등 PC 필수 프로그램", tone: "lime" },
  { no: "02", count: "41,380", name: "드라이버·설명서", desc: "프린터·노트북·그래픽카드·복합기 모델별 드라이버와 매뉴얼", tone: "paper" },
  { no: "03", count: "3,204", name: "게임", desc: "웹보드 게임부터 PC·모바일 설치 파일까지", tone: "dark" },
  { no: "04", count: "2,860", name: "폰트·서식", desc: "무료폰트, 사직서·근로계약서 등 실무 양식", tone: "dark2" },
  { no: "05", count: "1,954", name: "앱·미디어", desc: "모바일 앱, 코덱, 미디어 도구", tone: "dark" },
];

const weekly = [
  { no: "01", title: "곰플레이어 최신버전 2026.08", meta: "무료 · 32/64BIT · 32.4MB", tag: "소프트웨어" },
  { no: "02", title: "삼성 SL-M2020 프린터 드라이버", meta: "WIN 11/10 통합 · 24.8MB", tag: "드라이버" },
  { no: "03", title: "알집 무료 설치 파일", meta: "개인 무료 · 18.1MB", tag: "소프트웨어" },
  { no: "04", title: "한컴 오피스 한글 뷰어", meta: "HWP/HWPX 열기 전용 · 96MB", tag: "소프트웨어" },
  { no: "05", title: "HP LaserJet M15w 드라이버", meta: "WIN/MACOS · 41.2MB", tag: "드라이버" },
  { no: "06", title: "근로계약서 표준 서식 2026", meta: "HWP · DOCX · PDF", tag: "서식" },
  { no: "07", title: "V3 Lite 백신 무료판", meta: "실시간 감시 · 무료", tag: "소프트웨어" },
  { no: "08", title: "한게임 맞고 PC 설치", meta: "웹보드 · 런처 포함", tag: "게임" },
];

const makers = [
  { name: "삼성전자", n: "8,412" },
  { name: "HP", n: "6,205" },
  { name: "캐논", n: "4,880" },
  { name: "엡손", n: "3,741" },
  { name: "브라더", n: "2,610" },
  { name: "LG전자", n: "2,388" },
  { name: "신도리코", n: "1,922" },
  { name: "NVIDIA", n: "1,140" },
];

const queries = [
  { no: "01", q: "곰플레이어 다운로드", d: "+12" },
  { no: "02", q: "SL-M2020 드라이버", d: "+8" },
  { no: "03", q: "무료폰트 상업용", d: "0" },
  { no: "04", q: "한글뷰어 2026", d: "+5" },
  { no: "05", q: "사직서 양식", d: "-2" },
  { no: "06", q: "팟플레이어 64bit", d: "+3" },
];

function toneStyle(tone: string) {
  if (tone === "lime") return { background: LIME, color: INK, sub: "rgba(11,11,12,.68)" };
  if (tone === "paper") return { background: PAPER, color: INK, sub: "rgba(11,11,12,.62)" };
  if (tone === "dark2") return { background: CARD2, color: PAPER, sub: MUTE };
  return { background: CARD, color: PAPER, sub: MUTE };
}

export default function DownloadPage() {
  return (
    <div id="dl-standalone" style={{ minHeight: "100vh", background: INK, color: PAPER }}>
      {/* 원본은 인라인 keyframes 로 마퀴를 돌린다. 정적 export 라 style 태그로 넣는다. */}
      <style>{`
        /* 이 경로만 독립 화면으로 쓴다 — 루트 레이아웃의 사이트 헤더·푸터·하단바를 숨긴다.
           :has() 로 이 페이지가 그려질 때만 걸리므로 다른 경로는 영향을 받지 않는다. */
        body:has(#dl-standalone) { background: ${INK}; }
        body:has(#dl-standalone) > *:not(.flex-1) { display: none !important; }
        body:has(#dl-standalone) > .flex-1 { flex: 1 1 auto; }
        @keyframes dl-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .dl-marquee { animation: dl-marquee 38s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .dl-marquee { animation: none } }
        .dl-row:hover { background: #141416; }
        .dl-get:hover { color: ${LIME}; }
        .dl-cat { transition: transform .18s ease; }
        .dl-cat:hover { transform: translateY(-4px); }

        /* 원본은 데스크톱 고정 폭이다. 좁은 화면에서 가로 스크롤이 나지 않게 접는다. */
        .dl-hero { display: grid; grid-template-columns: minmax(0,1fr) 380px; gap: 48px; align-items: start; }
        .dl-cats { display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 2px; }
        .dl-bottom { display: grid; grid-template-columns: minmax(0,1fr) 420px; gap: 48px; align-items: start; }
        .dl-makers { display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 1px; }
        .dl-foot { display: grid; grid-template-columns: minmax(0,1fr) 180px 180px; gap: 32px; }
        @media (max-width: 1080px) {
          .dl-hero, .dl-bottom { grid-template-columns: minmax(0,1fr); gap: 32px; }
          .dl-hero > div:last-child { margin-top: 0 !important; }
          .dl-cats { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .dl-makers { grid-template-columns: repeat(3, minmax(0,1fr)); }
        }
        @media (max-width: 640px) {
          .dl-cats { grid-template-columns: minmax(0,1fr); }
          .dl-makers { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .dl-foot { grid-template-columns: minmax(0,1fr); }
          .dl-nav, .dl-search { display: none !important; }
          .dl-row { grid-template-columns: 32px minmax(0,1fr) auto !important; }
          .dl-row .dl-tag { display: none !important; }
        }
      `}</style>

      {/* 티커 */}
      <div style={{ borderBottom: `1px solid ${LINE}`, overflow: "hidden" }}>
        <div className="dl-marquee" style={{ display: "flex", width: "max-content" }}>
          {[0, 1].map((dup) => (
            <div key={dup} style={{ display: "flex", flex: "0 0 auto", gap: 40, padding: "9px 40px 9px 0" }}>
              {ticker.map((t, i) => (
                <span
                  key={i}
                  style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: MUTE, textTransform: "uppercase", whiteSpace: "nowrap" }}
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 헤더 */}
      <header style={{ borderBottom: `1px solid ${LINE}`, position: "sticky", top: 0, zIndex: 20, background: INK }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 28px", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>
              다운로드<span style={{ color: LIME }}>.</span>인덱스
            </span>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: MUTE, border: `1px solid ${LINE}`, padding: "2px 6px" }}>
              KR/2026
            </span>
          </div>
          <nav className="dl-nav" style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {nav.map((n) => (
              <span key={n} style={{ fontSize: 14, color: PAPER, whiteSpace: "nowrap" }}>{n}</span>
            ))}
          </nav>
          <div className="dl-search" style={{ marginLeft: "auto", borderLeft: `1px solid ${LINE}`, paddingLeft: 20, minWidth: 260, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: MUTE, fontFamily: MONO, fontSize: 12 }}>/</span>
            <span style={{ color: MUTE, fontSize: 13 }}>모델명 · 프로그램 검색</span>
          </div>
        </div>
        <div style={{ display: "flex", borderTop: `1px solid ${LINE}` }}>
          {tabs.map((t, i) => (
            <span
              key={t}
              style={{
                padding: "12px 22px",
                fontSize: 13,
                fontWeight: 700,
                background: i === 0 ? LIME : "transparent",
                color: i === 0 ? INK : PAPER,
                borderRight: `1px solid ${LINE}`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* 히어로 */}
      <section className="dl-hero" style={{ padding: "56px 28px 40px" }}>
        <div>
          <h1 style={{ fontSize: "clamp(56px, 10.5vw, 151px)", lineHeight: 0.86, fontWeight: 800, letterSpacing: "-0.055em", margin: 0 }}>
            DOWNLOAD
            <br />
            INDEX<span style={{ color: LIME }}>.</span>
          </h1>
          <p style={{ marginTop: 26, maxWidth: 430, fontSize: 16, lineHeight: 1.6, color: MUTE }}>
            프로그램·드라이버·게임·폰트·서식. 국내 기기 모델 단위까지 색인한 다운로드 데이터베이스.
          </p>
        </div>
        <div style={{ marginTop: 90 }}>
          {stats.map((s) => (
            <div
              key={s.k}
              style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderTop: `1px solid ${LINE}`, padding: "18px 0" }}
            >
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: MUTE }}>{s.k}</span>
              <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: s.lime ? LIME : PAPER }}>{s.v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 카테고리 5개 */}
      <section className="dl-cats" style={{ padding: "0 28px 64px" }}>
        {categories.map((c) => {
          const t = toneStyle(c.tone);
          return (
            <article
              key={c.no}
              className="dl-cat"
              style={{ background: t.background, color: t.color, padding: "18px 18px 24px", minHeight: 340, display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", opacity: 0.7 }}>
                <span>{c.no}</span>
                <span>{c.count}</span>
              </div>
              <h2 style={{ marginTop: "auto", fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>{c.name}</h2>
              <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.55, color: t.sub }}>{c.desc}</p>
            </article>
          );
        })}
      </section>

      {/* 이번 주 최다 다운로드 */}
      <section style={{ padding: "0 28px 72px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,63px)", lineHeight: 0.95, fontWeight: 800, letterSpacing: "-0.05em", margin: 0 }}>이번 주 최다 다운로드</h2>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: MUTE }}>2026.08.18 — 08.24 / TOP 08</span>
        </div>
        <ul style={{ listStyle: "none", margin: "26px 0 0", padding: 0 }}>
          {weekly.map((w) => (
            <li
              key={w.no}
              className="dl-row"
              style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr) auto auto", alignItems: "center", gap: 16, borderTop: `1px solid ${LINE}`, padding: "18px 8px" }}
            >
              <span style={{ fontFamily: MONO, fontSize: 12, color: LIME }}>{w.no}</span>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>{w.title}</p>
                <p style={{ margin: "6px 0 0", fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: MUTE }}>{w.meta}</p>
              </div>
              <span className="dl-tag" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: MUTE, border: `1px solid ${LINE}`, padding: "4px 8px", whiteSpace: "nowrap" }}>
                {w.tag}
              </span>
              <span className="dl-get" style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
                받기 ↓
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 제조사별 드라이버 + 모델 검색 */}
      <section className="dl-bottom" style={{ padding: "0 28px 72px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
            <h2 style={{ fontSize: "clamp(26px,3.6vw,52px)", lineHeight: 0.95, fontWeight: 800, letterSpacing: "-0.05em", margin: 0 }}>제조사별 드라이버</h2>
            <span style={{ fontSize: 13, color: MUTE, whiteSpace: "nowrap" }}>전체 보기 →</span>
          </div>
          <div className="dl-makers" style={{ marginTop: 22, background: LINE, border: `1px solid ${LINE}` }}>
            {makers.map((m) => (
              <div key={m.name} style={{ background: INK, padding: "16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</span>
                <span style={{ fontFamily: MONO, fontSize: 11, color: MUTE }}>{m.n}</span>
              </div>
            ))}
            <div style={{ background: CARD2 }} />
            <div style={{ background: CARD2 }} />
          </div>
        </div>

        <aside>
          <div style={{ background: LIME, color: INK, padding: "26px 24px 28px" }}>
            <p style={{ margin: 0, fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em" }}>FIND MY DRIVER</p>
            <h3 style={{ margin: "14px 0 0", fontSize: 28, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.22 }}>
              모델명 하나로
              <br />
              정확히 찾기
            </h3>
            <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.55, color: "rgba(11,11,12,.72)" }}>
              기기 뒷면 스티커의 모델명을 그대로 입력하세요.
            </p>
            <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
              <span style={{ flex: 1, background: INK, color: MUTE, fontFamily: MONO, fontSize: 12, padding: "12px 14px" }}>예 : SL-M2020W</span>
              <span style={{ background: INK, color: PAPER, fontSize: 13, fontWeight: 700, padding: "12px 18px" }}>검색</span>
            </div>
          </div>

          <div style={{ marginTop: 26 }}>
            <p style={{ margin: 0, fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", color: MUTE }}>LIVE QUERIES</p>
            <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0 }}>
              {queries.map((q) => (
                <li
                  key={q.no}
                  style={{ display: "grid", gridTemplateColumns: "34px minmax(0,1fr) auto", alignItems: "center", gap: 10, borderTop: `1px solid ${LINE}`, padding: "13px 0" }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 11, color: MUTE }}>{q.no}</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{q.q}</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: q.d.startsWith("+") ? LIME : MUTE }}>{q.d}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* 푸터 */}
      <footer className="dl-foot" style={{ borderTop: `1px solid ${LINE}`, padding: "44px 28px 60px" }}>
        <div>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>DOWNLOAD INDEX</p>
          <p style={{ margin: "12px 0 0", maxWidth: 460, fontSize: 13, lineHeight: 1.6, color: MUTE }}>
            공식 배포처 원본만 연결하는 다운로드 색인. 저작권 문제가 있는 파일은 신고 즉시 삭제합니다.
          </p>
        </div>
        <div>
          <p style={{ margin: 0, fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", color: MUTE }}>INDEX</p>
          <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "grid", gap: 8 }}>
            {["소프트웨어", "드라이버", "게임"].map((x) => (
              <li key={x} style={{ fontSize: 13 }}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <p style={{ margin: 0, fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", color: MUTE }}>INFO</p>
          <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "grid", gap: 8 }}>
            {["이용약관", "저작권 신고", "문의"].map((x) => (
              <li key={x} style={{ fontSize: 13 }}>{x}</li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
