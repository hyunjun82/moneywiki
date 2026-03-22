import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약갱신청구권 vs 묵시적갱신, 5% 상한 확실히 받는 방법 | 머니위키",
  description: "주택임대차보호법 제6조의2 묵시적갱신과 제6조의3 계약갱신청구권의 차이를 정리했어요. 행사 기간, 5% 상한, 거절 사유까지 한번에 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택임대차보호법-계약갱신-조항" },
  openGraph: {
    title: "계약갱신청구권 vs 묵시적갱신, 5% 상한 확실히 받는 방법 | 머니위키",
    description: "주택임대차보호법 제6조의2 묵시적갱신과 제6조의3 계약갱신청구권의 차이를 정리했어요. 행사 기간, 5% 상한, 거절 사유까지 한번에 확인하세요.",
    url: "https://www.jjyu.co.kr/w/주택임대차보호법-계약갱신-조항",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
