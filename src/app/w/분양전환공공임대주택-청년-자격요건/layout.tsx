import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "분양전환 공공임대 청년 자격요건, 소득 기준과 신청 방법 | 머니위키",
  description: "분양전환 공공임대주택 청년 자격요건을 정리했어요. 나이(19~39세), 소득 기준(1인 약 359만원), 자산 한도, 신청 순위와 방법을 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/분양전환공공임대주택-청년-자격요건" },
  openGraph: {
    title: "분양전환 공공임대 청년 자격요건, 소득 기준과 신청 방법 | 머니위키",
    description: "분양전환 공공임대 청년 자격요건과 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/분양전환공공임대주택-청년-자격요건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
