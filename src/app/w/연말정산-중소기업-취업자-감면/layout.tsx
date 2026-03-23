import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 중소기업 취업자 감면 | 머니위키",
  description: "청년 90%, 고령자·장애인·경력단절자 70% 소득세 감면받아요. 연 200만원 한도로 최대 5년간이에요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-중소기업-취업자-감면" },
  openGraph: { title: "연말정산 중소기업 취업자 감면 | 머니위키", description: "청년 90%, 고령자·장애인·경력단절자 70% 소득세 감면받아요. 연 200만원 한도로 최대 5년간이에요", url: "https://www.jjyu.co.kr/w/연말정산-중소기업-취업자-감면", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
