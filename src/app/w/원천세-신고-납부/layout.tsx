import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "원천세 신고 납부 방법 홈택스 위택스",
  description: "급여 지급 다음달 10일까지 원천세 납부. 소득세는 홈택스, 지방소득세는 위택스 각각 신고. 20인 이하 반기 신고 가능.",
  openGraph: {
    title: "원천세 신고 납부 방법 홈택스 위택스",
    description: "홈택스+위택스 두 곳 모두 신고해야 가산세 없음. 반기신고 방법 포함.",
    url: "https://jjyu.co.kr/w/원천세-신고-납부",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/원천세-신고-납부",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
