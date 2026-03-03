import Link from "next/link";

function formatKoreanDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

interface AuthorBioProps {
  categoryName: string;
  datePublished?: string;
  dateModified?: string;
}

export function AuthorBio({
  categoryName,
  datePublished,
  dateModified,
}: AuthorBioProps) {
  return (
    <div className="border-t border-gray-200 py-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#1B3A5C] rounded-full flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <div className="flex-1">
          <Link
            href="/about"
            className="text-base font-bold text-gray-900 hover:text-[#1B3A5C] transition-colors"
          >
            머니위키 에디터
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            {categoryName} 콘텐츠를 쉽고 정확하게 정리하고 있어요.
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            {datePublished && (
              <time dateTime={datePublished}>
                {formatKoreanDate(datePublished)} 작성
              </time>
            )}
            {dateModified && dateModified !== datePublished && (
              <>
                <span>|</span>
                <time dateTime={dateModified}>
                  {formatKoreanDate(dateModified)} 수정
                </time>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
