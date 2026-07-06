export const dynamic = "force-static";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSense, { AD_SLOTS } from "@/components/AdSense";
import { getAllFormSlugs, getFormData } from "@/lib/forms-loader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllFormSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const form = getFormData(decodeURIComponent(slug));
  if (!form) return { title: "양식을 찾을 수 없습니다" };
  return {
    title: `${form.shortTitle || form.title} 파일 다운로드 | 머니위키`,
    description: `${form.shortTitle || form.title} 파일을 무료로 저장하세요. 회원가입 없이 HWP·Word·PDF 제공.`,
    robots: { index: false, follow: true },
  };
}

export default async function FormFileDownloadPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const form = getFormData(decodedSlug);
  if (!form) notFound();

  const hasFiles = form.downloads.hwp || form.downloads.doc || form.downloads.pdf;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* 상단 광고 — 다운로드 영역과 충분히 분리 */}
      <div className="mb-8">
        <AdSense slot={AD_SLOTS.HORIZONTAL} format="horizontal" />
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
          <Link href="/" className="hover:text-[#1E3A5F]">홈</Link>
          <span>/</span>
          <Link href={`/forms/${encodeURIComponent(decodedSlug)}`} className="hover:text-[#1E3A5F]">
            {form.shortTitle || form.title}
          </Link>
          <span>/</span>
          <span>다운로드</span>
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          {form.shortTitle || form.title} 파일 다운로드
        </h1>
        <p className="text-neutral-600">
          {form.source} 기준 양식이에요. 회원가입·로그인 없이 바로 저장할 수 있어요.
        </p>
      </div>

      {/* 다운로드 전 확인사항 — 실제 콘텐츠 (정책: 빈 껍데기 페이지 금지) */}
      {form.tips && form.tips.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <h2 className="text-base font-semibold text-neutral-800 mb-2">저장 전 확인하세요</h2>
          <ul className="space-y-1.5">
            {form.tips.slice(0, 4).map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 파일 저장 버튼 — 광고와 멀리 배치 */}
      <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50 border border-[#B8D0E8] rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
          {hasFiles ? "원하는 형식을 선택해 저장하세요" : "외부 사이트에서 다운로드"}
        </h2>
        <div className="flex flex-wrap gap-3">
          {form.downloads.hwp && (
            <a href={form.downloads.hwp} download={form.downloadNames?.hwp || "양식.hwp"}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-md transition-all">
              <span className="font-bold text-blue-600 text-sm">HWP</span>
              <span className="text-sm text-neutral-600">한글 파일</span>
            </a>
          )}
          {form.downloads.doc && (
            <a href={form.downloads.doc} download={form.downloadNames?.doc || "양식.docx"}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-md transition-all">
              <span className="font-bold text-blue-700 text-sm">WORD</span>
              <span className="text-sm text-neutral-600">워드 파일</span>
            </a>
          )}
          {form.downloads.pdf && (
            <a href={form.downloads.pdf} download={form.downloadNames?.pdf || "양식.pdf"}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-md transition-all">
              <span className="font-bold text-red-600 text-sm">PDF</span>
              <span className="text-sm text-neutral-600">PDF 파일</span>
            </a>
          )}
          {!hasFiles && form.externalDownload && (
            <a href={form.externalDownload.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#162F4F] transition-all">
              {form.externalDownload.source}에서 다운로드
            </a>
          )}
        </div>
        <p className="text-xs text-neutral-500 mt-4">
          * {form.source} 공식 서식 기준. 무료이며 회원가입이 필요 없어요.
        </p>
      </div>

      {/* 작성법 안내로 돌아가기 */}
      <div className="border border-neutral-200 rounded-xl p-5 mb-8">
        <h2 className="text-base font-semibold text-neutral-800 mb-2">작성법이 궁금하다면</h2>
        <p className="text-sm text-neutral-600 mb-3">
          {form.shortTitle || form.title} 항목별 작성 방법, 실수하기 쉬운 부분, 작성 예시는 안내 페이지에서 확인할 수 있어요.
        </p>
        <Link href={`/forms/${encodeURIComponent(decodedSlug)}`}
          className="text-[#1E3A5F] font-medium hover:underline text-sm">
          ← {form.shortTitle || form.title} 작성법·미리보기 보기
        </Link>
      </div>

      {/* 하단 광고 */}
      <div className="mt-10">
        <AdSense slot={AD_SLOTS.HORIZONTAL} format="rectangle" />
      </div>
    </div>
  );
}
