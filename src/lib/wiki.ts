import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const wikiDirectory = path.join(process.cwd(), "content/wiki");

// FAQ 항목 타입
export interface FAQItem {
  question: string;
  answer: string;
}

// HowTo 단계 타입
export interface HowToStep {
  name: string;
  text: string;
}

// 관련 문서 타입
export interface RelatedDoc {
  title: string;
  url: string;
}

export interface WikiDocument {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  lastUpdated: string;
  datePublished: string;
  content: string;
  htmlContent?: string;
  // SEO 강화 필드
  faq?: FAQItem[];
  howTo?: {
    name: string;
    description: string;
    totalTime?: string;
    steps: HowToStep[];
  };
  relatedDocs?: RelatedDoc[];
  // 토스 스타일 요약
  summary?: string;
  keyPoints?: string[];
}

// 모든 위키 문서 목록 가져오기
export function getAllWikiSlugs(): string[] {
  if (!fs.existsSync(wikiDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(wikiDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

// 특정 위키 문서 가져오기
export async function getWikiDocument(
  slug: string
): Promise<WikiDocument | null> {
  const decodedSlug = decodeURIComponent(slug);
  const fullPath = path.join(wikiDirectory, `${decodedSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // 마크다운을 HTML로 변환
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    slug: decodedSlug,
    title: data.title || decodedSlug,
    description: data.description || "",
    category: data.category || "일반",
    keywords: data.keywords || [],
    lastUpdated: data.lastUpdated || new Date().toISOString().split("T")[0],
    datePublished: data.datePublished || data.lastUpdated || new Date().toISOString().split("T")[0],
    content,
    htmlContent,
    // SEO 강화 필드
    faq: data.faq || [],
    howTo: data.howTo,
    relatedDocs: data.relatedDocs || [],
    // 토스 스타일
    summary: data.summary || "",
    keyPoints: data.keyPoints || [],
  };
}

// 모든 위키 문서 메타데이터 가져오기
export function getAllWikiDocuments(): Omit<WikiDocument, "content" | "htmlContent">[] {
  const slugs = getAllWikiSlugs();

  return slugs.map((slug) => {
    const fullPath = path.join(wikiDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      category: data.category || "일반",
      keywords: data.keywords || [],
      lastUpdated: data.lastUpdated || new Date().toISOString().split("T")[0],
      datePublished: data.datePublished || data.lastUpdated || new Date().toISOString().split("T")[0],
      faq: data.faq || [],
      howTo: data.howTo,
      relatedDocs: data.relatedDocs || [],
      summary: data.summary || "",
      keyPoints: data.keyPoints || [],
    };
  });
}

// 카테고리별 문서 가져오기
export function getDocumentsByCategory(category: string): Omit<WikiDocument, "content" | "htmlContent">[] {
  const allDocs = getAllWikiDocuments();
  return allDocs.filter((doc) => doc.category === category);
}

// 관련 문서 찾기 (키워드 기반)
export function findRelatedDocuments(
  currentSlug: string,
  limit: number = 5
): Omit<WikiDocument, "content" | "htmlContent">[] {
  const allDocs = getAllWikiDocuments();
  const currentDoc = allDocs.find((doc) => doc.slug === currentSlug);

  if (!currentDoc) return [];

  // 같은 카테고리 또는 공통 키워드가 있는 문서 찾기
  return allDocs
    .filter((doc) => doc.slug !== currentSlug)
    .map((doc) => {
      let score = 0;
      // 같은 카테고리면 +3점
      if (doc.category === currentDoc.category) score += 3;
      // 공통 키워드당 +1점
      const commonKeywords = doc.keywords.filter((k) =>
        currentDoc.keywords.includes(k)
      );
      score += commonKeywords.length;
      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.doc);
}
