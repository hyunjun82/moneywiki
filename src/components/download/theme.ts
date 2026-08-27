/** 다운로드 인덱스 — 원본 번들에서 실측한 값. 여기만 고치면 전 페이지가 따라온다. */
export const INK = "#0B0B0C";
export const LINE = "#232326";
export const PAPER = "#F2F1ED";
export const LIME = "#D6F84C";
export const MUTE = "#7E7E82";
export const CARD = "#141416";
export const CARD2 = "#3A3A3E";

export const MONO =
  'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

export const TICKER = [
  "NEW — 곰플레이어 2026.08 정식",
  "삼성 SL-M2020 드라이버 갱신",
  "무료폰트 42종 상업용 허용 확인",
  "한글뷰어 HWPX 지원 추가",
  "HP LaserJet M15w Win11 패치",
  "근로계약서 표준서식 2026 개정",
  "V3 Lite 엔진 업데이트",
  "요청 처리 평균 11시간 42분",
];

export const NAV: { label: string; href: string }[] = [
  { label: "소프트웨어", href: "/download/software" },
  { label: "드라이버 · 설명서", href: "/download/driver" },
  { label: "게임", href: "/download/game" },
  { label: "폰트 · 서식", href: "/download/font" },
  { label: "앱 · 미디어", href: "/download/app" },
  { label: "요청 게시판", href: "/download/request" },
];

/**
 * 이 경로들만 독립 화면으로 쓴다 — 루트 레이아웃의 사이트 헤더·푸터·하단바를 숨긴다.
 * :has() 라 이 페이지가 그려질 때만 걸리고 다른 경로는 영향을 받지 않는다.
 * 좁은 화면 접힘 규칙도 여기 모아 둔다(원본은 데스크톱 고정 폭이라 그냥 두면 가로 스크롤이 난다).
 */
export const SHELL_CSS = `
  body:has(#dl-standalone) { background: ${INK}; }
  body:has(#dl-standalone) > *:not(.flex-1) { display: none !important; }
  body:has(#dl-standalone) > .flex-1 { flex: 1 1 auto; }
  @keyframes dl-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  .dl-marquee { animation: dl-marquee 38s linear infinite; }
  @media (prefers-reduced-motion: reduce) { .dl-marquee { animation: none } }
  /* 마우스를 올리면 흰 글자가 형광색으로 바뀐다.
     자식에 색을 따로 박아 둔 곳(회색 보조문구·라임 번호)은 그대로 두고,
     색을 물려받는 흰 글자만 갈아 끼운다 — 그래야 위계가 안 무너진다. */
  .dl-a { color: inherit; text-decoration: none; transition: color .14s ease; }
  .dl-a:hover, .dl-a:focus-visible { color: ${LIME}; }
  .dl-row { transition: background .14s ease; }
  .dl-row:hover { background: ${CARD}; }
  .dl-row:hover .dl-a, .dl-row:hover .dl-get { color: ${LIME}; }
  .dl-get { transition: color .14s ease; }
  .dl-get:hover { color: ${LIME}; }
  .dl-cat { transition: transform .18s ease; }
  .dl-cat:hover { transform: translateY(-4px); }
  /* 흰 바탕 버튼(게이트의 받기 버튼)도 올리면 형광색이 된다.
     바탕색을 인라인 style 로 박아 놨는데 인라인이 클래스를 이긴다. 그래서 !important 가 필요하다. */
  .dl-btn-paper { transition: background .14s ease; }
  .dl-btn-paper:hover, .dl-btn-paper:focus-visible { background: ${LIME} !important; }

  .dl-hero { display: grid; grid-template-columns: minmax(0,1fr) 380px; gap: 48px; align-items: start; }
  .dl-cats { display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 2px; }
  .dl-bottom { display: grid; grid-template-columns: minmax(0,1fr) 420px; gap: 48px; align-items: start; }
  .dl-makers { display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 1px; }
  .dl-foot { display: grid; grid-template-columns: minmax(0,1fr) 180px 180px; gap: 32px; }
  .dl-specs { display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); }
  .dl-main { display: grid; grid-template-columns: minmax(0,1fr) 300px; gap: 48px; align-items: start; }
  @media (max-width: 1080px) {
    .dl-hero, .dl-bottom, .dl-main { grid-template-columns: minmax(0,1fr); gap: 32px; }
    .dl-hero > div:last-child { margin-top: 0 !important; }
    .dl-cats { grid-template-columns: repeat(2, minmax(0,1fr)); }
    .dl-makers { grid-template-columns: repeat(3, minmax(0,1fr)); }
    .dl-specs { grid-template-columns: repeat(2, minmax(0,1fr)); }
  }
  @media (max-width: 640px) {
    .dl-cats, .dl-foot { grid-template-columns: minmax(0,1fr); }
    .dl-makers { grid-template-columns: repeat(2, minmax(0,1fr)); }
    .dl-specs { grid-template-columns: minmax(0,1fr); }
    .dl-nav, .dl-search { display: none !important; }
    .dl-row { grid-template-columns: 32px minmax(0,1fr) auto !important; }
    .dl-row .dl-tag { display: none !important; }
  }
`;
