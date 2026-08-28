/**
 * 다운로드 색인 — 항목 하나의 모양.
 *
 * 카테고리별로 수천·수만 건이 들어온다. 그래서 항목은 파일이 아니라 데이터다.
 * 항목이 늘어도 소스 파일 수는 그대로고, 라우트는 아래 4개뿐이다.
 *   /download                     색인
 *   /download/[category]/[slug]   상세
 *   /download/go/[slug]?b=N       내려받기 게이트(광고 → 공식 딥링크)
 *   /download/request             요청 게시판
 */

export type DownloadCategory = "software" | "driver" | "game" | "font" | "app";

export const CATEGORY_LABEL: Record<DownloadCategory, string> = {
  software: "소프트웨어",
  driver: "드라이버·설명서",
  game: "게임",
  font: "폰트·서식",
  app: "앱·미디어",
};

export interface DownloadBuild {
  /** 예: "Windows 64bit" */
  name: string;
  /** 예: "V2026.08.1 · 최신" */
  note?: string;
  /** 예: "32.4MB" */
  size: string;
  /**
   * 게이트에서 내보낼 공식 주소. 제조사·개발사 공식 도메인이 아니면 넣지 않는다.
   *
   * 원칙은 '그 파일을 받는 화면'이지 파일 자체가 아니다. 기관 홈도 아니다.
   * 파일에 바로 걸면 두 가지가 터진다.
   *  · 주소가 썩는다 — 삼성은 /DR/202207/20220721.../ 처럼 날짜가 박혀 있어 갱신되면 죽는다
   *  · 안 죽으면 더 나쁘다 — 지난 버전을 계속 물려주게 된다(보안 패치가 있던 파일도 있었다)
   * 그래서 항상 최신을 들고 있는 공식 화면으로 보낸다. 예외는 공공저작물처럼
   * 재배포가 열려 있고 주소가 안정된 경우다(kind: "file").
   */
  url: string;

  /**
   * url 이 파일 자체면 "file", 받는 화면이면 "page".
   * 게이트 버튼 문구가 이걸로 갈린다 — 페이지로 보내면서 "다운로드 시작"이라고 하면 거짓말이다.
   * 안 적으면 "page" 로 본다.
   */
  kind?: "file" | "page";
  /** 게이트 화면 상단에 쓸 한 줄. 없으면 name 을 쓴다. */
  platform?: string;
}

export interface DownloadItem {
  slug: string;
  category: DownloadCategory;
  /** 히어로 왼쪽 라임 배지 — SOFTWARE / DRIVER / FORM / GAME / APP */
  kicker: string;
  /** 빵부스러기의 가운데 마디들. 마지막은 항목 이름이 자동으로 붙는다. */
  trail: string[];
  /** 제목 옆 작은 테두리 배지들 */
  badges: string[];
  /** h1 은 두 줄이다 */
  titleTop: string;
  titleBottom: string;
  /** 큰 버튼 위 작은 글씨 — "WINDOWS · MAC · ANDROID" */
  ctaPlatforms: string;
  /** 큰 버튼 문구 — 읽는 사람이 할 행동 그대로 */
  ctaLabel: string;
  /** 버튼 아래 한 줄 — "SOURCE: GOMLAB.COM 공식 원본 · ..." */
  sourceNote: string;
  specs: { label: string; value: string }[];
  /** "설치 방법" / "작성 요령" */
  howTitle: string;
  steps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  /** "OTHER BUILDS" */
  buildsTitle: string;
  builds: DownloadBuild[];
  /** "RELATED FILES" / "RELATED FORMS" / "SAME DEVICE" */
  relatedTitle: string;
  related: { tag: string; name: string; href?: string }[];
  /** 하단 "찾는 파일이 없나요?" 문단 */
  requestNote: string;

  /**
   * 묶음 페이지에서 쓰는 추천 목록. 이 색인 안의 다른 항목을 가리킨다.
   *
   * "포맷 후 필수 프로그램" 처럼 사람이 실제로 검색하는 말로 된 페이지가
   * 개별 항목들을 모아 주는 자리다. 개별 페이지는 서로 이어지지 않으면
   * 낱장으로 흩어져 있는 것과 같아서, 이 목록이 그것들을 하나로 묶는다.
   * href 는 이 사이트 안의 경로(/download/...)로 적는다.
   */
  picks?: { title: string; note?: string; href: string }[];
  /** picks 위에 붙는 제목. 없으면 "함께 받는 프로그램" */
  picksTitle?: string;
  /** 목록·추천에 쓰는 한 줄 요약 — "무료 · 32/64BIT · 32.4MB" */
  listMeta: string;
  /** 목록에 쓰는 제목(h1 두 줄을 합치지 않고 따로 둔다) */
  listTitle: string;
  updatedAt: string;
  description: string;
}
