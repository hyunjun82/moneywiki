/**
 * Articles 데이터 헬퍼
 *
 * src/data/articles/ 안의 카테고리별 .ts 파일을 모아
 * slug 단위로 빠르게 조회할 수 있게 한다.
 *
 * MD 글(content/wiki/)과 라우팅 우선순위: articles → MD → 404
 */

import type { ArticleData, ArticleCategory } from "@/data/articles/types";

// ── 카테고리 import ──
// 새 템플릿(docs/moneywiki-article-template.html) 기준으로 작성·검증을 통과한 글만 등록한다.
// 미등록 slug는 MD(content/wiki/)로 폴백된다.

import { 퇴직금 } from "@/data/articles/퇴직금";
import { 보험 } from "@/data/articles/보험";
import { 금융 } from "@/data/articles/금융";
import { 세금 } from "@/data/articles/세금";
import { 고용 } from "@/data/articles/고용";

const categories: ArticleCategory[] = [퇴직금, 보험, 금융, 세금, 고용];

// slug → ArticleData 인덱스 (빌드 시 1회 생성)
const indexBySlug: Map<string, ArticleData> = (() => {
  const map = new Map<string, ArticleData>();
  for (const cat of categories) {
    for (const article of cat.articles) {
      map.set(article.slug, article);
    }
  }
  return map;
})();

export function getArticle(slug: string): ArticleData | undefined {
  return indexBySlug.get(slug);
}

export function getAllArticleSlugs(): string[] {
  return Array.from(indexBySlug.keys());
}

export function hasArticle(slug: string): boolean {
  return indexBySlug.has(slug);
}

/** 같은 카테고리의 다른 글 (현재 글 제외) */
export function getCategoryArticles(category: string, excludeSlug?: string): ArticleData[] {
  const cat = categories.find((c) => c.category === category);
  if (!cat) return [];
  return cat.articles.filter((a) => a.slug !== excludeSlug);
}
