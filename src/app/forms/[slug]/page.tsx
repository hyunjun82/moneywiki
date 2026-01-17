import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FormPreview, {
  표준근로계약서_DATA,
  단시간근로계약서_DATA,
  기간제근로계약서_DATA,
  임대차계약서_DATA,
  사직서_DATA,
  위임장_DATA,
  내용증명_DATA,
  견적서_DATA,
  각서_DATA,
  경위서_DATA,
  고소장_DATA,
  고발장_DATA,
  합의서_DATA,
  차용증_DATA,
  영수증_DATA,
  진술서_DATA,
  탄원서_DATA,
  진정서_DATA,
  거래명세서_DATA,
  세금계산서_DATA,
  매도청구서_DATA,
  산재보험청구서_DATA,
  금전소비대차계약서_DATA,
  동의서_DATA,
  답변서민사_DATA,
  대리점계약서_DATA,
  도급계약서_DATA,
  매매계약서_DATA,
  물품매매계약서_DATA,
  복직신청서_DATA,
  배우자출산휴가신청서_DATA,
  병가신청서_DATA,
  가족돌봄휴가신청서_DATA,
} from "@/components/forms/FormPreview";
import FormPageClient from "@/components/forms/FormPageClient";
import FormSidebar from "@/components/forms/FormSidebar";
import AdSense, { AD_SLOTS } from "@/components/AdSense";
import ShareButtons from "@/components/ShareButtons";
import { getAllFormSlugs, getFormData, FormData } from "@/lib/forms-loader";

// 프리뷰 데이터 매핑 (previewDataKey -> 실제 데이터)
const PREVIEW_DATA_MAP: Record<string, typeof 표준근로계약서_DATA> = {
  "표준근로계약서_DATA": 표준근로계약서_DATA,
  "단시간근로계약서_DATA": 단시간근로계약서_DATA,
  "기간제근로계약서_DATA": 기간제근로계약서_DATA,
  "임대차계약서_DATA": 임대차계약서_DATA,
  "사직서_DATA": 사직서_DATA,
  "위임장_DATA": 위임장_DATA,
  "내용증명_DATA": 내용증명_DATA,
  "견적서_DATA": 견적서_DATA,
  "각서_DATA": 각서_DATA,
  "경위서_DATA": 경위서_DATA,
  "고소장_DATA": 고소장_DATA,
  "고발장_DATA": 고발장_DATA,
  "합의서_DATA": 합의서_DATA,
  "차용증_DATA": 차용증_DATA,
  "영수증_DATA": 영수증_DATA,
  "진술서_DATA": 진술서_DATA,
  "탄원서_DATA": 탄원서_DATA,
  "진정서_DATA": 진정서_DATA,
  "거래명세서_DATA": 거래명세서_DATA,
  "세금계산서_DATA": 세금계산서_DATA,
  "매도청구서_DATA": 매도청구서_DATA,
  "산재보험청구서_DATA": 산재보험청구서_DATA,
  "금전소비대차계약서_DATA": 금전소비대차계약서_DATA,
  "동의서_DATA": 동의서_DATA,
  "답변서민사_DATA": 답변서민사_DATA,
  "대리점계약서_DATA": 대리점계약서_DATA,
  "도급계약서_DATA": 도급계약서_DATA,
  "매매계약서_DATA": 매매계약서_DATA,
  "물품매매계약서_DATA": 물품매매계약서_DATA,
  "복직신청서_DATA": 복직신청서_DATA,
  "배우자출산휴가신청서_DATA": 배우자출산휴가신청서_DATA,
  "병가신청서_DATA": 병가신청서_DATA,
  "가족돌봄휴가신청서_DATA": 가족돌봄휴가신청서_DATA,
};

// 기본 프리뷰 데이터 (새 양식용) - FormRow[] 형식
const DEFAULT_PREVIEW_DATA = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { placeholder: "(양식명)", exampleValue: "공식 양식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { placeholder: "(내용 입력란)", exampleValue: "상세 내용을 기재합니다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { placeholder: "작성자:          (서명)", exampleValue: "작성자: 홍길동 (서명)", colspan: 3 },
    ],
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const form = getFormData(decodedSlug);

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
  const slugs = getAllFormSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function FormDownloadPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const form = getFormData(decodedSlug);

  if (!form) {
    notFound();
  }

  // 프리뷰 데이터 가져오기 (매핑된 데이터 또는 기본값)
  const previewData = PREVIEW_DATA_MAP[form.previewDataKey] || DEFAULT_PREVIEW_DATA;

  // 페이지 URL
  const pageUrl = `https://www.jjyu.co.kr/forms/${encodeURIComponent(decodedSlug)}`;

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

  // JSON-LD SoftwareApplication Schema (다운로드 양식용)
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": form.shortTitle || form.title,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Windows, macOS, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "description": form.description,
    "downloadUrl": pageUrl,
    "softwareVersion": "2026",
    "author": {
      "@type": "Organization",
      "name": form.source,
      "url": form.sourceUrl
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // JSON-LD HowTo Schema (작성법 가이드)
  const howToSchema = form.tips && form.tips.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `${form.shortTitle || form.title} 작성법`,
    "description": `${form.shortTitle || form.title}을(를) 올바르게 작성하는 방법을 단계별로 안내합니다.`,
    "totalTime": "PT10M",
    "step": form.tips.map((tip, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `단계 ${index + 1}`,
      "text": tip
    }))
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
      {/* 메인 콘텐츠 */}
      <main className="flex-1 max-w-4xl">
        {/* JSON-LD Schemas */}
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        {howToSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
          {/* SNS 공유 버튼 */}
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <ShareButtons
              title={form.title}
              url={pageUrl}
              description={form.description}
            />
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
            * {form.source} 공식 양식입니다. 클릭 시 바로 다운로드됩니다. 회원가입/로그인 필요 없음.
          </p>
        </div>

        {/* 양식 미리보기 + 작성 예시 (탭 UI) */}
        <FormPageClient
          formTitle={form.shortTitle || form.title}
          previewData={previewData}
        />

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

        {/* 관련 문서 (내부링크) */}
        {form.relatedDocs && form.relatedDocs.length > 0 && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              관련 문서
            </h2>
            <ul className="space-y-2">
              {form.relatedDocs.map((doc, index) => (
                <li key={index}>
                  <Link
                    href={doc.url}
                    className="flex items-center gap-2 text-neutral-700 hover:text-emerald-600 transition-colors"
                  >
                    <span className="text-emerald-500">→</span>
                    <span>{doc.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
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

      {/* 사이드바 */}
      <FormSidebar />
    </div>
  );
}
