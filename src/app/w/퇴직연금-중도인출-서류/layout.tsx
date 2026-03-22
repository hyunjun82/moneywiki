import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 중도인출, 어떤 서류가 필요한가요? 사유별 필요 서류 | 머니위키",
  description: "주택 구입·전세금·6개월 이상 요양 등 사유별로 필요한 서류가 달라요. 인출 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-중도인출-서류" },
  openGraph: { title: "퇴직연금 중도인출, 어떤 서류가 필요한가요? 사유별 필요 서류 | 머니위키", description: "주택 구입·전세금·6개월 이상 요양 등 사유별로 필요한 서류가 달라요. 인출 서류를 정리했어요.", url: "https://www.jjyu.co.kr/w/퇴직연금-중도인출-서류", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
