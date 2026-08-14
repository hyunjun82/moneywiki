import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "독거노인 응급안전안심서비스 신청 방법",
  description: "독거노인·중증장애인 가정에 응급호출기 무료 설치, 24시간 모니터링 서비스 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/독거노인-장애인-응급안전안심서비스" },
  openGraph: {
    title: "독거노인 응급안전안심서비스 신청 방법 | 머니위키",
    description: "독거노인·중증장애인 가정에 응급호출기 무료 설치, 24시간 모니터링 서비스 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/독거노인-장애인-응급안전안심서비스",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
