/** 카테고리별 글 템플릿 유형 */
export type TemplateType = "policy" | "tax" | "product" | "legal";

/** 카테고리 정의 */
export interface Category {
  name: string;
  slug: string;
  icon: string;
  description: string;
  template: TemplateType;
  count: number;
}

/** FAQ 항목 */
export interface FAQItem {
  question: string;
  answer: string;
}

/** 출처 정보 */
export interface SourceItem {
  name: string;
  url: string;
  date?: string;
}

/** 글 섹션 */
export interface ArticleSection {
  title: string;
  content: string;
}

/** Spoke 글 (개별 키워드 글) */
export interface SpokeArticle {
  slug: string;
  categorySlug: string;
  datePublished: string;
  dateModified: string;
  title: string;
  h1: string;
  metaDescription: string;
  description: string;
  heroDescription: string;
  calculator?: string;         // 연관 계산기 컴포넌트 이름
  checker?: string;            // 연관 체커 컴포넌트 이름
  sources: SourceItem[];
  faq: FAQItem[];
  sections: ArticleSection[];
}

/** Hub 글 (카테고리 가이드) */
export interface HubArticle {
  categorySlug: string;
  datePublished: string;
  dateModified: string;
  title: string;
  h1: string;
  metaDescription: string;
  description: string;
  heroDescription: string;
  spokes: { slug: string; title: string; description: string }[];
}
