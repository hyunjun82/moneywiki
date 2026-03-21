import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "두루누리 지원금 신청 조건과 서류, 10인 미만 사업장 최대 80% 지원 | 머니위키",
  description: "두루누리 사회보험료 지원 신청 조건(10인 미만, 월 270만 원 이하)과 필요 서류, 신청 절차를 정리했어요. 고용보험·국민연금 보험료 최대 80% 지원받는 방법이에요.",
  openGraph: {
    title: "두루누리 지원금 신청 조건과 서류, 10인 미만 사업장 최대 80% 지원 | 머니위키",
    description: "두루누리 사회보험료 지원 신청 조건과 필요 서류, 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/두루누리-지원금-신청-조건-서류",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/두루누리-지원금-신청-조건-서류" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
