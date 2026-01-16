"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormDownloadButtonProps {
  formSlug: string;
  formName: string;
  className?: string;
}

export default function FormDownloadButton({
  formSlug,
  formName,
  className = "",
}: FormDownloadButtonProps) {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (showOverlay && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showOverlay && countdown === 0) {
      // 카운트다운 완료 시 이동
      router.push(`/forms/${encodeURIComponent(formSlug)}`);
    }
  }, [showOverlay, countdown, formSlug, router]);

  const handleClick = () => {
    setShowOverlay(true);
    setCountdown(3);

    // AdSense 전면광고 트리거 (페이지 이동 시 자동 발생)
    // Google AdSense는 페이지 전환 시 자동으로 전면광고를 표시할 수 있음
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.log("AdSense not available");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          inline-flex items-center justify-center gap-2
          px-6 py-3 bg-emerald-600 text-white font-medium
          rounded-lg hover:bg-emerald-700 transition-all
          shadow-lg hover:shadow-xl
          ${className}
        `}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {formName} 양식 확인하기
      </button>

      {/* 전면광고 + 로딩 오버레이 */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
            {/* 광고 슬롯 */}
            <div className="mb-6 min-h-[250px] bg-neutral-100 rounded-lg flex items-center justify-center">
              <ins
                className="adsbygoogle"
                style={{ display: "block", width: "300px", height: "250px" }}
                data-ad-client="ca-pub-2442517902625121"
                data-ad-slot="6190024232"
                data-ad-format="rectangle"
              />
            </div>

            {/* 로딩 표시 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
              <div>
                <p className="text-lg font-medium text-neutral-800">
                  양식 페이지로 이동 중...
                </p>
                <p className="text-sm text-neutral-500 mt-1">
                  {countdown > 0 ? `${countdown}초 후 자동 이동` : "이동 중..."}
                </p>
              </div>
            </div>

            {/* 바로 이동 버튼 */}
            {countdown <= 1 && (
              <button
                onClick={() => router.push(`/forms/${encodeURIComponent(formSlug)}`)}
                className="mt-4 px-4 py-2 text-emerald-600 hover:text-emerald-700 underline text-sm"
              >
                바로 이동하기
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// 간단한 텍스트 링크 버전
export function FormDownloadLink({
  formSlug,
  formName,
  className = "",
}: FormDownloadButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/forms/${encodeURIComponent(formSlug)}`);
  };

  return (
    <a
      href={`/forms/${encodeURIComponent(formSlug)}`}
      onClick={handleClick}
      className={`text-emerald-600 hover:text-emerald-700 hover:underline ${className}`}
    >
      {formName} 양식 다운로드
    </a>
  );
}
