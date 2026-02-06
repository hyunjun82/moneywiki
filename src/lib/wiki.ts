import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
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

// 출처 타입
export interface SourceItem {
  name: string;
  url: string;
  date?: string;
}

// CTA 버튼 타입 (배열용)
export interface CTAItem {
  url: string;
  badge?: string;      // 배지 텍스트 (예: "평균 13만원 환급")
  text: string;        // 메인 텍스트 (예: "잠자고 있는 내 돈 찾기")
  action?: string;     // CTA 텍스트 (예: "조회", 기본값: "바로가기")
  color?: "green" | "blue" | "orange" | "dark";  // 버튼 색상 (기본: green)
}

// CTA 버튼 타입 (단일 객체 - ctaButton frontmatter용)
export interface CTAButton {
  position?: "beforeChart" | "afterChart" | "afterSummary";
  theme?: "green" | "blue" | "orange" | "dark";
  url: string;
  badge?: string;
  text: string;
  cta: string;
}

// CTA 카드 타입 (서론 아래 행동 유도)
export interface CTACard {
  label: string;      // 라벨 (예: "⚡ 1분 조회")
  mainText: string;   // 메인 문구 (예: "1년 지나면 청구권이 사라집니다.")
  subText: string;    // 서브 문구 (예: "내 남은 기한 확인해보세요.")
  url: string;        // 링크 URL
  external?: boolean; // 외부 링크 여부 (기본: false)
}

// 차트 데이터 아이템 타입
export interface ChartDataItem {
  name: string;
  fullName?: string;
  primaryValue: number;
  secondaryValue?: number;
  category?: string;
  extra?: Record<string, number | string>;
}

// 차트 설정 타입 (frontmatter용)
export interface ChartConfig {
  title?: string;
  primaryLabel?: string;
  primaryUnit?: string;
  secondaryLabel?: string;
  secondaryUnit?: string;
  categoryColors?: Record<string, string>;
  defaultColor?: string;
  height?: number;
  sourceText?: string;
  disclaimerText?: string;
  showSecondaryToggle?: boolean;
  sortOptions?: Array<{
    key: string;
    label: string;
    ascending?: boolean;
  }>;
  legendItems?: Array<{
    color: string;
    label: string;
  }>;
  data?: ChartDataItem[];
}

export interface WikiDocument {
  slug: string;
  title: string;  // 롱테일 키워드 그대로 (예: "연말정산 신용카드 공제 한도")
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
  // 토스 스타일 요약 (문자열 또는 배열)
  summary?: string | string[];
  keyPoints?: string[];
  // 신뢰도 강화
  sources?: SourceItem[];
  updateNote?: string; // "2026년 1월 기준"
  // 스키마 타입 (calculator, article 등)
  schemaType?: string;
  // CTA 버튼 (외부링크용 - 배열)
  cta?: CTAItem[];
  // CTA 버튼 (단일 객체 - Batch 8 이후)
  ctaButton?: CTAButton;
  // CTA 카드 (서론 아래 행동 유도)
  ctaCard?: CTACard;
  // 차트 컴포넌트 이름
  chart?: string;
  // 차트 설정 (데이터 포함)
  chartConfig?: ChartConfig;
  // OG 썸네일 이미지 경로
  thumbnail?: string;
  // Event 스키마 (신청 기간)
  event?: {
    name: string;
    description?: string;
    startDate: string; // ISO 8601: "2026-02-03T09:00"
    endDate: string;
    organizerName: string;
    organizerUrl: string;
  };
  // ItemList 스키마 (Hub 페이지)
  itemList?: Array<{
    name: string;
    url: string;
    position: number;
  }>;
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

// 카테고리와 슬러그 쌍 가져오기 (새 URL 구조용)
export function getAllWikiParams(): { category: string; slug: string }[] {
  if (!fs.existsSync(wikiDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(wikiDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      try {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(wikiDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        return {
          category: data.category || "일반",
          slug: slug,
        };
      } catch (error) {
        const slug = fileName.replace(/\.md$/, "");
        console.warn(`Failed to parse ${slug}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return {
          category: "일반",
          slug: slug,
        };
      }
    });
}

// 슬러그로 카테고리 찾기 (리다이렉트용)
export function getCategoryBySlug(slug: string): string | null {
  const decodedSlug = decodeURIComponent(slug);
  const fullPath = path.join(wikiDirectory, `${decodedSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return data.category || "일반";
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

  // gray-matter가 자동으로 Date 객체로 변환하는 것 방지
  if (data.lastUpdated instanceof Date) {
    data.lastUpdated = data.lastUpdated.toISOString().split("T")[0];
  }
  if (data.datePublished instanceof Date) {
    data.datePublished = data.datePublished.toISOString().split("T")[0];
  }

  // 마크다운을 HTML로 변환 (GFM 테이블 지원)
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);
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
    // 신뢰도 강화
    sources: data.sources || [],
    updateNote: data.updateNote || "",
    // 스키마 타입
    schemaType: data.schemaType,
    // CTA 버튼 (배열)
    cta: data.cta || [],
    // CTA 버튼 (단일 객체)
    ctaButton: data.ctaButton,
    // CTA 카드 (서론 아래 행동 유도)
    ctaCard: data.ctaCard,
    // 차트 컴포넌트
    chart: data.chart,
    // 차트 설정
    chartConfig: data.chartConfig,
    // OG 썸네일 이미지
    thumbnail: data.thumbnail,
  };
}

// 모든 위키 문서 메타데이터 가져오기
export function getAllWikiDocuments(): Omit<WikiDocument, "content" | "htmlContent">[] {
  const slugs = getAllWikiSlugs();

  return slugs.map((slug) => {
    try {
      const fullPath = path.join(wikiDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      // gray-matter가 자동으로 Date 객체로 변환하는 것 방지
      if (data.lastUpdated instanceof Date) {
        data.lastUpdated = data.lastUpdated.toISOString().split("T")[0];
      }
      if (data.datePublished instanceof Date) {
        data.datePublished = data.datePublished.toISOString().split("T")[0];
      }

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
        schemaType: data.schemaType,
      };
    } catch (error) {
      console.warn(`Failed to parse ${slug}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return {
        slug,
        title: slug,
        description: "",
        category: "일반",
        keywords: [],
        lastUpdated: new Date().toISOString().split("T")[0],
        datePublished: new Date().toISOString().split("T")[0],
        faq: [],
        relatedDocs: [],
        summary: "",
        keyPoints: [],
      };
    }
  });
}

// 카테고리별 문서 가져오기
export function getDocumentsByCategory(category: string): Omit<WikiDocument, "content" | "htmlContent">[] {
  const allDocs = getAllWikiDocuments();
  return allDocs.filter((doc) => doc.category === category);
}

// 주제 키워드 추출 함수
function extractTopicKeywords(slug: string, title: string, category: string): string[] {
  const text = `${slug} ${title} ${category}`.toLowerCase();
  const topics: string[] = [];

  // 주제별 키워드 매핑 (우선순위 순)
  const topicPatterns = [
    { keywords: ['퇴직금', '퇴직연금', '퇴직'], topic: '퇴직금' },
    { keywords: ['실업급여', '고용보험', '구직급여'], topic: '실업급여' },
    { keywords: ['연말정산', '소득공제', '세액공제'], topic: '연말정산' },
    { keywords: ['대출', '이자', '금리', '원리금'], topic: '대출' },
    { keywords: ['dsr', '총부채'], topic: 'DSR' },
    { keywords: ['양도소득세', '양도세'], topic: '양도소득세' },
    { keywords: ['취득세'], topic: '취득세' },
    { keywords: ['전세', '월세', '임대차', '보증금'], topic: '전월세' },
    { keywords: ['국민연금', '연금수령'], topic: '국민연금' },
    { keywords: ['4대보험', '사대보험'], topic: '4대보험' },
    { keywords: ['근로소득세', '근로소득'], topic: '근로소득세' },
    { keywords: ['주식', '배당', '증권'], topic: '주식' },
    { keywords: ['최저임금', '시급'], topic: '최저임금' },
    { keywords: ['종합소득세', '종소세'], topic: '종합소득세' },
  ];

  for (const pattern of topicPatterns) {
    if (pattern.keywords.some(k => text.includes(k))) {
      topics.push(pattern.topic);
    }
  }

  return topics;
}

// 관련 문서 찾기 (주제 키워드 기반 - 개선)
export function findRelatedDocuments(
  currentSlug: string,
  limit: number = 5
): Omit<WikiDocument, "content" | "htmlContent">[] {
  const allDocs = getAllWikiDocuments();
  const currentDoc = allDocs.find((doc) => doc.slug === currentSlug);

  if (!currentDoc) return [];

  // 현재 문서의 주제 키워드 추출
  const currentTopics = extractTopicKeywords(currentDoc.slug, currentDoc.title, currentDoc.category);

  // 주제 키워드가 있으면 해당 주제 문서만 필터링
  return allDocs
    .filter((doc) => doc.slug !== currentSlug)
    .map((doc) => {
      let score = 0;
      const docTopics = extractTopicKeywords(doc.slug, doc.title, doc.category);

      // 같은 주제면 +10점 (최우선)
      const commonTopics = currentTopics.filter(t => docTopics.includes(t));
      score += commonTopics.length * 10;

      // 같은 카테고리면 +2점
      if (doc.category === currentDoc.category) score += 2;

      // 공통 키워드당 +1점
      const commonKeywords = doc.keywords.filter((k) =>
        currentDoc.keywords.includes(k)
      );
      score += commonKeywords.length;

      return { doc, score, hasCommonTopic: commonTopics.length > 0 };
    })
    // 주제가 있으면 같은 주제 문서만, 없으면 모든 문서
    .filter((item) => {
      if (currentTopics.length > 0) {
        return item.hasCommonTopic; // 주제가 있으면 같은 주제만
      }
      return item.score > 0; // 주제가 없으면 기존 로직
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.doc);
}
