import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "배달기사 종합소득세 신고와 환급 방법",
  description: "배달기사 3.3% 원천징수 환급받는 법. 단순경비율 79.4% 적용 시 환급액 계산, 홈택스 신고 절차, 가산세 주의사항까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/배달기사-종합소득세-신고-납부" },
  openGraph: {
    title: "배달기사 종합소득세 신고와 환급 방법 | 머니위키",
    description: "배달기사 3.3% 원천징수 환급받는 법. 단순경비율 79.4% 적용 시 환급액 계산, 홈택스 신고 절차, 가산세 주의사항까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/배달기사-종합소득세-신고-납부",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
