import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "부모님 대신 기초연금 신청 가능? 대리신청과 위임장 작성",
  description: "기초연금은 자녀가 대리로 신청할 수 있어요. 위임장 양식과 필요한 서류, 주의할 점을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-대리신청-위임장-작성" },
  openGraph: { title: "부모님 대신 기초연금 신청 가능? 대리신청과 위임장 작성 | 머니위키", description: "기초연금은 자녀가 대리로 신청할 수 있어요. 위임장 양식과 필요한 서류, 주의할 점을 정리했어요.", url: "https://www.jjyu.co.kr/w/기초연금-대리신청-위임장-작성", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
