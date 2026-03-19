import { Metadata } from "next";
import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";
import { categories as definedCategories } from "@/data/categories";
import fs from "fs";
import path from "path";

interface PageProps {
  params: Promise<{ name: string }>;
}

// Pure SSG - 빌드타임에만 정적 생성 (런타임 CPU 0%)
export const dynamic = 'force-static';

// 카테고리별 이모지
const categoryEmoji: Record<string, string> = {
  "정부지원금": "💰",
  "연말정산": "📊",
  "실업급여": "📋",
  "퇴직금": "💵",
  "퇴직연금": "🏦",
  "부동산": "🏠",
  "세금": "💰",
  "경제": "📈",
  "금융": "💳",
  "급여": "💼",
  "고용": "🤝",
  "근로": "👔",
  "법률": "⚖️",
  "정책": "📜",
  "노동": "🔧",
  "연금": "👴",
  "투자": "📉",
  "양식·서식": "📥",
  "퇴직": "🏦",
  "생활경제": "🛒",
  "복지": "🤝",
  "보험": "🛡️",
  "교육": "📚",
  "창업": "🚀",
  "일반": "📄",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);

  return {
    title: `${categoryName} - 머니위키`,
    description: `${categoryName} 관련 문서 모음. 머니위키에서 쉽고 정확하게 찾아보세요.`,
  };
}

export async function generateStaticParams() {
  const allDocs = getAllWikiDocuments();
  const categories = new Set<string>();

  allDocs.forEach(doc => {
    const category = doc.category || "일반";
    categories.add(category);
  });

  // categories.ts에 정의된 카테고리도 추가 (퇴직, 생활경제 등)
  definedCategories.forEach(c => categories.add(c.slug));
  categories.add("정부지원금");

  return Array.from(categories).map((name) => ({
    name: name.replace(/\//g, '-'),
  }));
}

// TSX 글 디렉토리에서 slug 목록 수집
function getTsxArticleSlugs(keyword: string): string[] {
  const wDir = path.join(process.cwd(), "src/app/w");
  try {
    return fs.readdirSync(wDir).filter(d =>
      d.includes(keyword) && fs.existsSync(path.join(wDir, d, "page.tsx"))
    );
  } catch { return []; }
}

// 카테고리별 키워드 매핑
const categoryKeywords: Record<string, string[]> = {
  "퇴직": ["퇴직금", "퇴직", "irp", "IRP", "db형", "dc형", "퇴사"],
  "생활경제": ["물가", "교통", "통신", "소비"],
};

// 정부지원금 카테고리 추천 문서 (복지/고용 관련)
const governmentSupportKeywords = [
  "지원금", "보조금", "급여", "수당", "혜택", "지원", "장려금", "청년", "출산", "육아",
  "복지", "실업", "고용", "근로장려", "자녀장려", "긴급", "소득", "저소득"
];

export default async function CategoryPage({ params }: PageProps) {
  const { name } = await params;
  // URL에서 대시(-)를 슬래시(/)로 변환
  const categoryName = decodeURIComponent(name).replace(/-/g, '/');
  const allDocs = getAllWikiDocuments();

  let docs = allDocs.filter(doc => (doc.category || "일반") === categoryName);

  // 정부지원금 카테고리: 문서가 없으면 복지/고용 관련 문서 자동 추천
  if (categoryName === "정부지원금" && docs.length === 0) {
    docs = allDocs.filter(doc =>
      governmentSupportKeywords.some(keyword =>
        doc.title.includes(keyword) || doc.slug.includes(keyword)
      )
    ).slice(0, 30);
  }

  // MD 문서 없는 경우: TSX 글 디렉토리에서 수집 시도
  if (docs.length === 0 && categoryName !== "정부지원금") {
    const keywords = categoryKeywords[categoryName] || [categoryName];
    const tsxSlugs = keywords.flatMap(k => getTsxArticleSlugs(k));
    const uniqueSlugs = [...new Set(tsxSlugs)];
    if (uniqueSlugs.length > 0) {
      docs = uniqueSlugs.map(slug => ({
        slug,
        title: slug.replace(/-/g, ' '),
        description: "",
        summary: "",
        category: categoryName,
        keywords: [],
        sources: [],
        body: "",
        lastUpdated: "",
        datePublished: "",
      }));
    }
  }

  // 가나다순 정렬
  const sortedDocs = docs.sort((a, b) => a.title.localeCompare(b.title, 'ko'));

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* 헤더 */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-700 mb-4 inline-block">
          ← 홈으로
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{categoryEmoji[categoryName] || "📄"}</span>
          <div>
            <h1 className="text-2xl font-bold">{categoryName}</h1>
            <p className="text-neutral-500">{docs.length}개 문서</p>
          </div>
        </div>
      </div>

      {/* 정부지원금 특별 안내 */}
      {categoryName === "정부지원금" && (
        <div className="mb-8 p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl">
          <h2 id="gov-support" className="text-lg font-bold text-gray-900 mb-2">💰 숨은 정부지원금 찾기</h2>
          <p className="text-sm text-gray-700 mb-4">
            청년 지원금, 출산 혜택, 근로장려금 등 내가 받을 수 있는 정부 지원금을 확인하세요.
          </p>
          <div className="flex flex-wrap gap-2">
            <a href="https://www.gov.kr" target="_blank" rel="noopener noreferrer"
               className="px-4 py-2 bg-[#1E3A5F] text-white text-sm font-medium rounded-lg hover:bg-[#162F4F] transition-colors">
              정부24 바로가기 →
            </a>
            <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer"
               className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              복지로 바로가기 →
            </a>
          </div>
        </div>
      )}

      {/* 문서 목록 */}
      {docs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/w/${encodeURIComponent(doc.slug)}`}
              className="p-4 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] transition-colors"
            >
              <h3 className="font-medium text-neutral-800 line-clamp-1">{doc.title}</h3>
              <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                {doc.summary || doc.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-neutral-50 rounded-xl">
          <p className="text-neutral-500 mb-4">아직 등록된 문서가 없습니다.</p>
          <Link href="/" className="text-[#1E3A5F] hover:underline">
            홈으로 돌아가기 →
          </Link>
        </div>
      )}
    </main>
  );
}
