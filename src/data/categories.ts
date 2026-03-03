import { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    name: "부동산",
    slug: "부동산",
    icon: "🏠",
    description: "양도세, 취득세, 전세, 청약, 재건축 등 부동산 세금·거래 정보",
    template: "product",
    count: 0,
  },
  {
    name: "근로·급여",
    slug: "근로",
    icon: "💼",
    description: "연차, 퇴직, 급여, 4대보험, 근로계약 등 직장인 필수 정보",
    template: "policy",
    count: 0,
  },
  {
    name: "세금",
    slug: "세금",
    icon: "🧾",
    description: "연말정산, 소득세, 양도세, 증여세, 상속세 등 세금 절세 정보",
    template: "tax",
    count: 0,
  },
  {
    name: "금융·투자",
    slug: "금융",
    icon: "💰",
    description: "적금, 대출, 투자, 카드, ISA 등 금융상품 비교·분석",
    template: "product",
    count: 0,
  },
  {
    name: "실업급여",
    slug: "실업급여",
    icon: "📋",
    description: "실업급여 자격, 신청, 계산, 수급기간 등 고용보험 정보",
    template: "policy",
    count: 0,
  },
  {
    name: "복지·지원금",
    slug: "복지",
    icon: "🤝",
    description: "기초생활, 청년지원, 주거급여, 의료비 등 정부 지원 정보",
    template: "policy",
    count: 0,
  },
  {
    name: "법률",
    slug: "법률",
    icon: "⚖️",
    description: "이혼, 상속, 개인파산, 소송 등 법률 절차·비용 정보",
    template: "legal",
    count: 0,
  },
  {
    name: "퇴직·연금",
    slug: "퇴직",
    icon: "🏦",
    description: "퇴직금, 퇴직연금, 국민연금, 중간정산 등 노후 대비 정보",
    template: "product",
    count: 0,
  },
  {
    name: "생활경제",
    slug: "생활경제",
    icon: "🛒",
    description: "교통, 통신, 소비, 물가 등 생활 밀착 경제 정보",
    template: "policy",
    count: 0,
  },
  {
    name: "보험",
    slug: "보험",
    icon: "🛡️",
    description: "실손보험, 건강보험, 자동차보험 등 보험 비교·청구 정보",
    template: "product",
    count: 0,
  },
  {
    name: "교육·장학금",
    slug: "교육",
    icon: "📚",
    description: "학자금, 장학금, 교육비 지원 등 교육 관련 정보",
    template: "policy",
    count: 0,
  },
  {
    name: "창업·사업",
    slug: "창업",
    icon: "🚀",
    description: "소상공인 지원, 사업자등록, 세금 등 창업·사업 정보",
    template: "product",
    count: 0,
  },
];

/** 기존 카테고리 → 신규 카테고리 매핑 (마이그레이션용) */
export const CATEGORY_MIGRATION_MAP: Record<string, string> = {
  // 부동산 → 부동산
  "부동산": "부동산",

  // 근로·급여
  "근로/노동": "근로",
  "근로노동": "근로",
  "근로": "근로",
  "급여": "근로",
  "연차휴가": "근로",
  "휴일": "근로",
  "휴업": "근로",
  "휴직": "근로",
  "기타휴가": "근로",
  "노동": "근로",

  // 세금
  "세금": "세금",
  "연말정산": "세금",
  "세금/연말정산": "세금",

  // 금융·투자
  "금융": "금융",
  "금융/금전": "금융",
  "금융/투자": "금융",
  "금융/적금": "금융",
  "금융/대출": "금융",
  "경제": "금융",
  "투자": "금융",
  "투자/재테크": "금융",
  "재테크": "금융",
  "저축": "금융",

  // 실업급여
  "실업급여": "실업급여",

  // 복지·지원금
  "복지": "복지",
  "고용/복지": "복지",
  "복지/연금": "복지",
  "정부지원금": "복지",
  "고용": "복지",
  "고용복지": "복지",

  // 법률
  "법률": "법률",
  "가정법률": "법률",
  "생활법률": "법률",

  // 퇴직·연금
  "퇴직금": "퇴직",
  "퇴직연금": "퇴직",
  "연금": "퇴직",

  // 생활경제
  "생활": "생활경제",
  "생활정보": "생활경제",
  "생활/소비": "생활경제",
  "교통": "생활경제",

  // 보험
  "보험": "보험",
  "보험/금융": "보험",
  "보험/건강": "보험",
  "건강보험": "보험",

  // 교육
  "교육": "교육",
  "교육/장학금": "교육",

  // 창업
  "창업/폐업": "창업",
  "정책": "창업",
  "행정": "창업",
  "양식·서식": "창업",
};
