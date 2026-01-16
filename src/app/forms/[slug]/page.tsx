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
    sourceUrl: "https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20190700008",
    // 고용노동부 직접 다운로드 링크
    downloads: {
      hwp: "https://www.moel.go.kr/common/downloadFile.do?file_seq=20190700012&bbs_seq=20190700008&bbs_id=29&file_ext=hwp",
    },
    downloadNames: {
      hwp: "표준근로계약서_7종_고용노동부.hwp",
    },
    previewData: 표준근로계약서_DATA,
    relatedArticle: "/w/표준근로계약서-양식-무료-다운로드-작성법-2026",
    tips: [
      "2026년 최저임금 10,320원 이상으로 작성하세요",
      "근로계약서는 반드시 2부 작성, 1부는 근로자에게 교부",
      "수습기간은 최대 3개월, 1년 이상 계약 시만 감액 가능",
    ],
    faq: [
      {
        question: "2026년 최저시급은 얼마인가요?",
        answer: "2026년 최저시급은 10,320원입니다. 근로계약서 작성 시 이 금액 이상으로 시급을 기재해야 법적 효력이 있습니다.",
      },
      {
        question: "근로계약서는 꼭 2부를 작성해야 하나요?",
        answer: "네, 반드시 2부를 작성하여 사업주와 근로자가 각각 1부씩 보관해야 합니다. 근로자에게 미교부 시 500만원 이하 벌금이 부과될 수 있습니다.",
      },
      {
        question: "수습기간에도 최저시급을 줘야 하나요?",
        answer: "1년 이상 근로계약을 체결한 경우, 수습 3개월 동안 최저임금의 90%(9,288원)를 지급할 수 있습니다. 단, 단순노무직은 100% 지급해야 합니다.",
      },
    ],
  },
  "단시간근로계약서": {
    title: "단시간근로계약서 (알바용)",
    description: "주 40시간 미만 근무하는 알바, 파트타임용 근로계약서입니다.",
    category: "고용·근로",
    source: "고용노동부",
    sourceUrl: "https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20190700008",
    // 고용노동부 7종 근로계약서 (단시간 포함)
    downloads: {
      hwp: "https://www.moel.go.kr/common/downloadFile.do?file_seq=20190700012&bbs_seq=20190700008&bbs_id=29&file_ext=hwp",
    },
    downloadNames: {
      hwp: "근로계약서_7종_단시간포함_고용노동부.hwp",
    },
    previewData: 단시간근로계약서_DATA,
    relatedArticle: "/w/표준근로계약서-양식-무료-다운로드-작성법-2026",
    tips: [
      "주 15시간 이상이면 주휴수당 발생",
      "시급은 2026년 최저임금 10,320원 이상",
      "근로일과 근로시간을 구체적으로 명시하세요",
    ],
    faq: [
      {
        question: "알바도 근로계약서를 꼭 써야 하나요?",
        answer: "네, 하루만 일해도 근로계약서 작성은 법적 의무입니다. 단시간근로자용 양식을 사용하면 됩니다.",
      },
      {
        question: "주휴수당은 언제 받을 수 있나요?",
        answer: "주 15시간 이상 근무하면 주휴수당을 받을 수 있습니다. 시급 10,320원 기준 주 5일 근무 시 주휴수당 포함 실제 시급은 12,384원입니다.",
      },
      {
        question: "알바도 4대보험에 가입해야 하나요?",
        answer: "주 15시간 이상 근무하면 4대보험 가입 대상입니다. 사업주가 가입해주지 않으면 근로복지공단에 신고할 수 있습니다.",
      },
    ],
  },
  "기간제근로계약서": {
    title: "기간제근로계약서 (계약직용)",
    description: "계약 기간이 정해진 계약직, 기간제 근로자용 계약서입니다.",
    category: "고용·근로",
    source: "고용노동부",
    sourceUrl: "https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20190700008",
    // 고용노동부 7종 근로계약서 (기간제 포함)
    downloads: {
      hwp: "https://www.moel.go.kr/common/downloadFile.do?file_seq=20190700012&bbs_seq=20190700008&bbs_id=29&file_ext=hwp",
    },
    downloadNames: {
      hwp: "근로계약서_7종_기간제포함_고용노동부.hwp",
    },
    previewData: 기간제근로계약서_DATA,
    relatedArticle: "/w/표준근로계약서-양식-무료-다운로드-작성법-2026",
    tips: [
      "기간제 근로자 2년 초과 시 무기계약직으로 전환",
      "계약 갱신 여부를 명확히 기재하세요",
      "1년 이상 근무 시 퇴직금 발생",
    ],
    faq: [
      {
        question: "계약직도 퇴직금을 받을 수 있나요?",
        answer: "네, 1년 이상 근무하면 계약직도 퇴직금을 받을 수 있습니다. 퇴직금은 평균임금 30일분 × (재직일수/365)로 계산됩니다.",
      },
      {
        question: "계약직 2년 넘으면 어떻게 되나요?",
        answer: "기간제 근로자를 2년 넘게 사용하면 자동으로 무기계약직(정규직)으로 전환됩니다. 기간제법 제4조에서 정한 규정입니다.",
      },
      {
        question: "계약 갱신을 거절당하면 어떻게 하나요?",
        answer: "정당한 사유 없이 갱신을 거절하면 부당해고에 해당할 수 있습니다. 갱신 기대권이 인정되는 경우 노동위원회에 구제신청이 가능합니다.",
      },
    ],
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

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
  downloadNames?: {
    hwp?: string;
    doc?: string;
    pdf?: string;
  };
  previewData: typeof 표준근로계약서_DATA;
  relatedArticle?: string;
  tips?: string[];
  faq?: FAQItem[];
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

  // JSON-LD FAQ Schema
  const faqSchema = form.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": form.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* JSON-LD FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">회원가입 없음</span>
        </div>
      </div>

      {/* 다운로드 버튼 - <a download> 태그 사용 */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
          원하는 포맷으로 다운받으세요
        </h2>
        <div className="flex flex-wrap gap-3">
          {form.downloads.hwp && (
            <a
              href={form.downloads.hwp}
              download={form.downloadNames?.hwp || "양식.hwp"}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 rounded-lg hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer"
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
              download={form.downloadNames?.doc || "양식.docx"}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 rounded-lg hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer"
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
              download={form.downloadNames?.pdf || "양식.pdf"}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 rounded-lg hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer"
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
          * 고용노동부 공식 양식입니다. 클릭 시 바로 다운로드됩니다. 회원가입/로그인 필요 없음.
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

      {/* FAQ 섹션 (SEO용) */}
      {form.faq && form.faq.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {form.faq.map((item, index) => (
              <details key={index} className="group border-b border-neutral-100 pb-4 last:border-b-0 last:pb-0">
                <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-neutral-800 hover:text-emerald-600">
                  <span>Q. {item.question}</span>
                  <svg className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-neutral-600 pl-4 border-l-2 border-emerald-200">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
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
