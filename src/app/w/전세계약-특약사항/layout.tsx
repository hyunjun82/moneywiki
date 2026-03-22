import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세계약 특약사항 필수 8가지, 보증금 보호 체크리스트 | 머니위키",
  description: "전세 계약서에 넣어야 할 필수 특약 8가지예요. 근저당 해지, 보증보험 협조, 보증금 반환 기한 등을 정리했어요.",
  openGraph: { title: "전세계약 특약사항 필수 8가지 | 머니위키", description: "전세계약서 필수 특약 목록이에요.", url: "https://www.jjyu.co.kr/w/전세계약-특약사항", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세계약-특약사항" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
