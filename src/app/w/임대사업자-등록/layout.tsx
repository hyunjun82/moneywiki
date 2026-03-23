export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임대사업자 등록 절차, 세무서·지자체 이중 등록과 혜택 | 머니위키",
  description: "임대사업자 등록은 세무서+지자체 이중 등록. 취득세·재산세·종부세 감면 혜택. 10년 의무임대, 임대료 5% 제한. 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대사업자-등록" },
  openGraph: { title: "임대사업자 등록 절차와 세제 혜택 | 머니위키", description: "세무서+지자체 이중 등록. 취득세·재산세·종부세 감면 혜택.", url: "https://www.jjyu.co.kr/w/임대사업자-등록", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
