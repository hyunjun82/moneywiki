import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직한 해 연말정산은 어떻게 하나요? 중도 퇴사자 연말정산 방법 | 머니위키",
  description: "퇴직 시 회사에서 중도정산하고, 다음 해 5월에 종합소득세로 추가 공제를 받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-퇴직" },
  openGraph: { title: "퇴직한 해 연말정산은 어떻게 하나요? 중도 퇴사자 연말정산 방법 | 머니위키", description: "퇴직 시 회사에서 중도정산하고, 다음 해 5월에 종합소득세로 추가 공제를 받을 수 있어요.", url: "https://www.jjyu.co.kr/w/연말정산-퇴직", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
