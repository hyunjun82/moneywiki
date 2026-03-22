import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국가장학금 탈락, 왜 떨어졌는지 모르겠다면? 주요 탈락 사유와 재신청 | 머니위키",
  description: "소득 초과, 성적 미달, 이수학점 부족이 주요 탈락 사유예요. 이의 신청과 재신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국가장학금-탈락-사유" },
  openGraph: { title: "국가장학금 탈락, 왜 떨어졌는지 모르겠다면? 주요 탈락 사유와 재신청 | 머니위키", description: "소득 초과, 성적 미달, 이수학점 부족이 주요 탈락 사유예요. 이의 신청과 재신청 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/국가장학금-탈락-사유", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
