import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "농지보전부담금 5천만원 넘으면 나눠낼 수 있나요? 분할 납부 조건과 절차",
  description: "5천만원 초과 농지보전부담금은 3~5년 분할 납부가 가능해요. 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지보전부담금-5천만원-할부-납부" },
  openGraph: { title: "농지보전부담금 5천만원 넘으면 나눠낼 수 있나요? 분할 납부 조건과 절차 | 머니위키", description: "5천만원 초과 농지보전부담금은 3~5년 분할 납부가 가능해요. 신청 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/농지보전부담금-5천만원-할부-납부", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
