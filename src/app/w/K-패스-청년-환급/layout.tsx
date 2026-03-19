import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 청년 환급 30% — 만 19~34세 신청 방법 | 머니위키",
  description: "K-패스 청년 요금은 만 19~34세면 교통비 30%를 환급해줘요. 일반(20%)보다 10%p 높은 청년 혜택, 신청 조건과 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-청년-환급" },
  openGraph: {
    title: "K-패스 청년 환급 30% — 만 19~34세 신청 방법 | 머니위키",
    description: "K-패스 청년 요금은 만 19~34세면 교통비 30%를 환급해줘요. 일반(20%)보다 10%p 높은 청년 혜택, 신청 조건과 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/K-패스-청년-환급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
