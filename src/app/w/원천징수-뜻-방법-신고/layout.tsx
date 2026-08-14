import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "원천징수 뜻, 세율, 신고 방법 — 3.3%부터 연말정산 관계까지",
  description: "월급에서 자동으로 빠져나가는 소득세가 원천징수예요. 소득 종류별 세율(3.3%, 8.8%)과 사업자 홈택스 신고 방법, 연말정산과의 관계를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/원천징수-뜻-방법-신고" },
  openGraph: {
    title: "원천징수 뜻, 세율, 신고 방법 — 3.3%부터 연말정산 관계까지 | 머니위키",
    description: "월급에서 자동으로 빠져나가는 소득세가 원천징수예요. 소득 종류별 세율(3.3%, 8.8%)과 사업자 홈택스 신고 방법, 연말정산과의 관계를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/원천징수-뜻-방법-신고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
