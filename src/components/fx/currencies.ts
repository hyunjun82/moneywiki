/**
 * 통화별 페이지가 쓰는 고정 정보.
 *
 * "use client" 를 붙이지 않는다 — 서버 컴포넌트가 generateStaticParams·
 * metadata·구조화 데이터를 만들 때도 그대로 가져다 쓴다.
 *
 * 목록은 갱신기(scripts/fx/update-fx.mjs)의 CURRENCIES와 같은 순서·같은 코드다.
 * 환율 값은 여기 두지 않는다. 값은 브라우저가 fx.json에서 읽는다.
 *
 * 검색어는 네이버 자동완성 실측(2026-08-17) 기준으로 골랐다.
 *   "달러 환율" "엔화 환율" "유로 환율" — 통화명+환율이 기본형
 *   "베트남 환율 계산기" "일본 환율 계산기" — 나라명+계산기
 *   "100달러 한국돈" "엔화 100엔 얼마" — 금액 환산 질의
 */

export interface CurrencyMeta {
  code: string;
  /** 나라 — "미국" */
  country: string;
  /** 통화 — "달러" */
  unitName: string;
  /** 검색에서 가장 많이 쓰는 호칭 — "달러", "엔화" */
  common: string;
  /** 고시 단위 (엔·동·루피아는 100) */
  unit: number;
  /** 환산 예시로 보여줄 외화 금액 */
  sample: number;
  region: string;
}

export const CURRENCIES: CurrencyMeta[] = [
  { code: "USD", country: "미국", unitName: "달러", common: "달러", unit: 1, sample: 100, region: "미주" },
  { code: "JPY", country: "일본", unitName: "엔", common: "엔화", unit: 100, sample: 10000, region: "일본·중화권" },
  { code: "EUR", country: "유로존", unitName: "유로", common: "유로", unit: 1, sample: 100, region: "유럽" },
  { code: "CNY", country: "중국", unitName: "위안", common: "위안", unit: 1, sample: 100, region: "일본·중화권" },
  { code: "GBP", country: "영국", unitName: "파운드", common: "파운드", unit: 1, sample: 100, region: "유럽" },
  { code: "AUD", country: "호주", unitName: "달러", common: "호주달러", unit: 1, sample: 100, region: "미주" },
  { code: "CAD", country: "캐나다", unitName: "달러", common: "캐나다달러", unit: 1, sample: 100, region: "미주" },
  { code: "CHF", country: "스위스", unitName: "프랑", common: "스위스프랑", unit: 1, sample: 100, region: "유럽" },
  { code: "HKD", country: "홍콩", unitName: "달러", common: "홍콩달러", unit: 1, sample: 100, region: "일본·중화권" },
  { code: "TWD", country: "대만", unitName: "달러", common: "대만달러", unit: 1, sample: 1000, region: "일본·중화권" },
  { code: "SGD", country: "싱가포르", unitName: "달러", common: "싱가포르달러", unit: 1, sample: 100, region: "동남아" },
  { code: "THB", country: "태국", unitName: "바트", common: "바트", unit: 1, sample: 1000, region: "동남아" },
  { code: "VND", country: "베트남", unitName: "동", common: "베트남 동", unit: 100, sample: 100000, region: "동남아" },
  { code: "PHP", country: "필리핀", unitName: "페소", common: "페소", unit: 1, sample: 1000, region: "동남아" },
  { code: "IDR", country: "인도네시아", unitName: "루피아", common: "루피아", unit: 100, sample: 100000, region: "동남아" },
  { code: "MYR", country: "말레이시아", unitName: "링깃", common: "링깃", unit: 1, sample: 100, region: "동남아" },
  { code: "NZD", country: "뉴질랜드", unitName: "달러", common: "뉴질랜드달러", unit: 1, sample: 100, region: "미주" },
];

export function findCurrency(code: string): CurrencyMeta | undefined {
  return CURRENCIES.find((c) => c.code === code.toUpperCase());
}

/** 통화별 페이지 제목 — 실측 검색어 "달러 환율" 형태를 앞에 둔다 */
export function currencyTitle(c: CurrencyMeta): string {
  return `${c.common} 환율 — 오늘 ${c.country} ${c.unitName} 환율과 환전 계산`;
}

export function currencyDescription(c: CurrencyMeta): string {
  return `오늘 ${c.common} 환율을 원화로 확인하고 환전 금액을 계산합니다. ${c.unit}${c.unitName} 기준 시세와 전일 대비 변동, 은행별 환전 우대율 비교까지 한 화면에서 봅니다.`;
}
