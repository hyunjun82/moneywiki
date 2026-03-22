import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "프리랜서·일용직도 교육비 공제 받을 수 있나요? 사업소득자 교육비 처리 방법 | 머니위키",
  description: "프리랜서는 근로소득 교육비 공제는 안 되지만, 사업 관련 교육비를 필요경비로 처리할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/프리랜서-일용직-교육비공제" },
  openGraph: { title: "프리랜서·일용직도 교육비 공제 받을 수 있나요? 사업소득자 교육비 처리 방법 | 머니위키", description: "프리랜서는 근로소득 교육비 공제는 안 되지만, 사업 관련 교육비를 필요경비로 처리할 수 있어요.", url: "https://www.jjyu.co.kr/w/프리랜서-일용직-교육비공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
