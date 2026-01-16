import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FormPreview, {
  표준근로계약서_DATA,
  단시간근로계약서_DATA,
  기간제근로계약서_DATA,
} from "@/components/forms/FormPreview";
import AdSense, { AD_SLOTS } from "@/components/AdSense";

// 양식 데이터베이스
const FORMS_DB: Record<string, FormData> = {
  "표준근로계약서": {
    title: "표준근로계약서",
    description: "고용노동부 공식 표준근로계약서 양식입니다. 정규직 채용 시 사용하세요.",
    category: "고용·근로",
    source: "고용노동부",
    sourceUrl: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
    downloads: {
      hwp: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
      doc: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
      pdf: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
    },
    previewData: 표준근로계약서_DATA,
    relatedArticle: "/w/표준근로계약서-양식-무료-다운로드-작성법-2026",
    tips: [
      "2026년 최저임금 10,320원 이상으로 작성하세요",
      "근로계약서는 반드시 2부 작성, 1부는 근로자에게 교부",
      "수습기간은 최대 3개월, 1년 이상 계약 시만 감액 가능",
    ],
  },
  "단시간근로계약서": {
    title: "단시간근로계약서 (알바용)",
    description: "주 40시간 미만 근무하는 알바, 파트타임용 근로계약서입니다.",
    category: "고용·근로",
    source: "고용노동부",
    sourceUrl: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
    downloads: {
      hwp: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
      doc: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
      pdf: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
    },
    previewData: 단시간근로계약서_DATA,
    relatedArticle: "/w/표준근로계약서-양식-무료-다운로드-작성법-2026",
    tips: [
      "주 15시간 이상이면 주휴수당 발생",
      "시급은 2026년 최저임금 10,320원 이상",
      "근로일과 근로시간을 구체적으로 명시하세요",
    ],
  },
  "기간제근로계약서": {
    title: "기간제근로계약서 (계약직용)",
    description: "계약 기간이 정해진 계약직, 기간제 근로자용 계약서입니다.",
    category: "고용·근로",
    source: "고용노동부",
    sourceUrl: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
    downloads: {
      hwp: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
      doc: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
      pdf: "https://www.moel.go.kr/policy/policyinfo/loborlaw/list5.do",
    },
    previewData: 기간제근로계약서_DATA,
    relatedArticle: "/w/표준근로계약서-양식-무료-다운로드-작성법-2026",
    tips: [
      "기간제 근로자 2년 초과 시 무기계약직으로 전환",
      "계약 갱신 여부를 명확히 기재하세요",
      "1년 이상 근무 시 퇴직금 발생",
    ],
  },
};

interface FormData {
  title: string;
  description: string;
  category: string;
  source: string;
  sourceUrl: string;
  downloads: {
    hwp?: string;
    doc?: string;
    pdf?: string;
  };
  previewData: typeof 표준근로계약서_DATA;
  relatedArticle?: string;
  tips?: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const form = FORMS_DB[decodedSlug];

  if (!form) {
    return { title: "양식을 찾을 수 없습니다" };
  }

  return {
    title: `${form.title} 무료 다운로드 | 머니위키`,
    description: form.description,
    openGraph: {
      title: `${form.title} 무료 다운로드`,
      description: form.description,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(FORMS_DB).map((slug) => ({
    slug: slug,
  }));
}

export default async function FormDownloadPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const form = FORMS_DB[decodedSlug];

  if (!form) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* 상단 전면광고 영역 */}
      <div className="mb-6">
        <AdSense slot={AD_SLOTS.HORIZONTAL} format="horizontal" />
      </div>

      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
          <Link href="/" className="hover:text-emerald-600">홈</Link>
          <span>/</span>
          <span>양식·서식</span>
          <span>/</span>
          <span>{form.category}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
          {form.title}
        </h1>
        <p className="text-neutral-600">{form.description}</p>
        <div className="flex items-center gap-4 mt-3 text-sm">
          <span className="text-neutral-500">출처: {form.source}</span>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs">무료</span>
        </div>
      </div>

      {/* 다운로드 버튼 - 상단에 눈에 띄게 */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
          원하는 포맷으로 다운받으세요
        </h2>
        <div className="flex flex-wrap gap-3">
          {form.downloads.hwp && (
            <a
              href={form.downloads.hwp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 rounded-lg hover:border-emerald-400 hover:shadow-md transition-all"
            >
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
                <text x="7" y="17" fontSize="6" fontWeight="bold" fill="currentColor">HWP</text>
              </svg>
              <div className="text-left">
                <div className="font-medium text-neutral-800">HWP</div>
                <div className="text-xs text-neutral-500">한글 파일</div>
              </div>
            </a>
          )}
          {form.downloads.doc && (
            <a
              href={form.downloads.doc}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 rounded-lg hover:border-emerald-400 hover:shadow-md transition-all"
            >
              <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
                <text x="6" y="17" fontSize="5" fontWeight="bold" fill="currentColor">DOC</text>
              </svg>
              <div className="text-left">
                <div className="font-medium text-neutral-800">WORD</div>
                <div className="text-xs text-neutral-500">워드 파일</div>
              </div>
            </a>
          )}
          {form.downloads.pdf && (
            <a
              href={form.downloads.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 rounded-lg hover:border-emerald-400 hover:shadow-md transition-all"
            >
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
                <text x="6" y="17" fontSize="5" fontWeight="bold" fill="currentColor">PDF</text>
              </svg>
              <div className="text-left">
                <div className="font-medium text-neutral-800">PDF</div>
                <div className="text-xs text-neutral-500">PDF 파일</div>
              </div>
            </a>
          )}
        </div>
        <p className="text-xs text-neutral-500 mt-4">
          * 고용노동부 공식 양식입니다. 위 버튼 클릭 시 정부 사이트로 이동합니다.
        </p>
      </div>

      {/* 양식 미리보기 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          양식 미리보기
        </h2>
        <FormPreview title={form.title} rows={form.previewData} />
        <p className="text-xs text-neutral-500 mt-2">
          * 실제 양식의 미리보기입니다. 다운로드 후 직접 작성하세요.
        </p>
      </div>

      {/* 중간 광고 */}
      <div className="my-8">
        <AdSense slot={AD_SLOTS.HORIZONTAL} format="rectangle" />
      </div>

      {/* 작성 팁 */}
      {form.tips && form.tips.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-neutral-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            작성 시 주의사항
          </h2>
          <ul className="space-y-2">
            {form.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-neutral-700">
                <span className="text-amber-600 mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 관련 문서 링크 */}
      {form.relatedArticle && (
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-neutral-800 mb-3">
            상세 작성법이 궁금하다면?
          </h2>
          <Link
            href={form.relatedArticle}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            작성법 완벽 가이드 보기
          </Link>
          <p className="text-sm text-neutral-500 mt-2">
            정규직, 계약직, 알바 등 상황별 작성 요령을 자세히 설명해드려요.
          </p>
        </div>
      )}

      {/* 하단 광고 */}
      <div className="mt-8">
        <AdSense slot={AD_SLOTS.HORIZONTAL} format="horizontal" />
      </div>

      {/* 출처 */}
      <div className="mt-8 pt-6 border-t border-neutral-200 text-sm text-neutral-500">
        <p>
          출처:{" "}
          <a
            href={form.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline"
          >
            {form.source}
          </a>
        </p>
      </div>
    </main>
  );
}
