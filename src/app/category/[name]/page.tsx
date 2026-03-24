export const dynamic = 'force-static';
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";
import { categories, CATEGORY_MIGRATION_MAP } from "@/data/categories";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ name: cat.slug }));
}

// 카테고리별 이모지
const categoryEmoji: Record<string, string> = {
  "부동산": "🏠",
  "근로": "👔",
  "세금": "🧾",
  "금융": "💳",
  "실업급여": "📋",
  "복지": "🤝",
  "법률": "⚖️",
  "퇴직": "💼",
  "생활경제": "🛒",
  "보험": "🛡️",
  "교육": "📚",
  "창업": "🚀",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const slug = decodeURIComponent(name);
  const cat = categories.find((c) => c.slug === slug);
  const displayName = cat?.name || slug;

  return {
    title: `${displayName} - 머니위키`,
    description: cat?.description || `${displayName} 관련 문서 모음. 머니위키에서 쉽고 정확하게 찾아보세요.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { name } = await params;
  const slug = decodeURIComponent(name);
  const catInfo = categories.find((c) => c.slug === slug);
  if (!catInfo) notFound();

  const allDocs = getAllWikiDocuments();

  // CATEGORY_MIGRATION_MAP에서 이 슬러그로 매핑되는 모든 원본 카테고리 값 수집
  const mappedToThisSlug = new Set<string>();
  mappedToThisSlug.add(slug);
  for (const [original, mapped] of Object.entries(CATEGORY_MIGRATION_MAP)) {
    if (mapped === slug) {
      mappedToThisSlug.add(original);
    }
  }

  const docs = allDocs
    .filter((doc) => mappedToThisSlug.has(doc.category || "일반"))
    .sort((a, b) => a.title.localeCompare(b.title, "ko"));

  const displayName = catInfo.name;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* 헤더 */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-700 mb-4 inline-block">
          ← 홈으로
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{categoryEmoji[slug] || "📄"}</span>
          <div>
            <h1 className="text-2xl font-bold">{displayName}</h1>
            <p className="text-neutral-500">{docs.length}개 문서</p>
          </div>
        </div>
      </div>

      {/* 문서 목록 */}
      {docs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {docs.map((doc) => (
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
