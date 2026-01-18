import Link from "next/link";
import { Metadata } from "next";
import { getAllForms } from "@/lib/forms-loader";

export const metadata: Metadata = {
  title: "양식·서식 무료 다운로드 - 머니위키",
  description: "근로계약서, 임대차계약서, 위임장 등 각종 양식을 무료로 다운로드하세요. HWP, PDF, Word 형식 제공.",
  openGraph: {
    title: "양식·서식 무료 다운로드 - 머니위키",
    description: "근로계약서, 임대차계약서, 위임장 등 각종 양식을 무료로 다운로드하세요.",
  },
};

// 카테고리별 이모지
const categoryEmoji: Record<string, string> = {
  "고용·근로": "👔",
  "부동산·임대차": "🏠",
  "법률·계약": "⚖️",
  "세무·회계": "💰",
  "가족관계": "👨‍👩‍👧‍👦",
  "민원·신고": "📋",
  "기타": "📄",
};

export default function FormsListPage() {
  const allForms = getAllForms();

  // 카테고리별로 그룹화
  const formsByCategory = allForms.reduce((acc, form) => {
    const category = form.category || "기타";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(form);
    return acc;
  }, {} as Record<string, typeof allForms>);

  // 카테고리 정렬 (문서 수 많은 순)
  const sortedCategories = Object.entries(formsByCategory).sort(
    (a, b) => b[1].length - a[1].length
  );

  // HWP 파일 있는 양식 수
  const formsWithHwp = allForms.filter((f) => f.downloads.hwp).length;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <nav className="text-sm text-neutral-500 mb-2">
            <Link href="/" className="hover:text-emerald-600">
              홈
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-800">양식·서식</span>
          </nav>
          <h1 className="text-2xl font-bold text-neutral-800">
            양식·서식 무료 다운로드
          </h1>
          <p className="text-neutral-600 mt-2">
            총 {allForms.length}개 양식 · HWP 파일 {formsWithHwp}개 보유
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 카테고리별 양식 목록 */}
        {sortedCategories.map(([category, forms]) => (
          <section key={category} className="mb-10">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-800 mb-4">
              <span>{categoryEmoji[category] || "📄"}</span>
              {category}
              <span className="text-sm font-normal text-neutral-500">
                ({forms.length}개)
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {forms.map((form) => (
                <Link
                  key={form.slug}
                  href={`/forms/${encodeURIComponent(form.slug)}`}
                  className="group p-4 bg-white border border-neutral-200 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-neutral-800 group-hover:text-emerald-600 truncate">
                        {form.shortTitle || form.slug}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                        {form.description}
                      </p>
                    </div>
                    {form.downloads.hwp && (
                      <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                        HWP
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-neutral-400">
                    <span>{form.source}</span>
                    {form.downloads.hwp && <span>·</span>}
                    {form.downloads.hwp && <span>바로 다운로드</span>}
                    {!form.downloads.hwp && form.externalDownload && (
                      <>
                        <span>·</span>
                        <span>{form.externalDownload.source}</span>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* 안내 문구 */}
        <div className="mt-12 p-6 bg-emerald-50 border border-emerald-200 rounded-xl">
          <h3 className="font-semibold text-emerald-800 mb-2">
            양식 다운로드 안내
          </h3>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• HWP 표시가 있는 양식은 바로 다운로드 가능합니다</li>
            <li>• 그 외 양식은 출처 사이트에서 다운로드할 수 있어요</li>
            <li>• 모든 양식은 무료이며 회원가입이 필요 없습니다</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
