import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "개인투자조합 출자 소득공제 벤처 투자 100%",
  description: "벤처기업 투자 시 3천만원 이하 100%, 5천만원 이하 70%, 초과 30% 소득공제. 출자확인서 발급과 연말정산 신청 방법.",
  openGraph: {
    title: "개인투자조합 출자 소득공제 벤처 투자 100%",
    description: "3천만원 이하 전액 공제. 3년 의무보유와 출자확인서 직접 제출 방법.",
    url: "https://jjyu.co.kr/w/연말정산-개인투자조합-출자-공제",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/연말정산-개인투자조합-출자-공제",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
