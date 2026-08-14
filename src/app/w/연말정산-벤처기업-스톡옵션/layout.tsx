import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "벤처기업 스톡옵션 비과세 5천만원, 행사 조건과 세금",
  description: "벤처기업 스톡옵션 행사이익은 연 5,000만원까지 비과세예요. 2년 재직 요건, 행사이익 계산법, 일반기업과 차이를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-벤처기업-스톡옵션" },
  openGraph: {
    title: "벤처기업 스톡옵션 비과세 5천만원, 행사 조건과 세금 | 머니위키",
    description: "벤처기업 스톡옵션 행사이익은 연 5,000만원까지 비과세예요. 2년 재직 요건, 행사이익 계산법, 일반기업과 차이를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-벤처기업-스톡옵션",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
