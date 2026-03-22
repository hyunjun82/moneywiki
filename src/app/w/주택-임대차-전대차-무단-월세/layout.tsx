import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세 살면서 방 하나 월세 놓으면 위법인가요? 무단 전대의 법적 위험 | 머니위키",
  description: "임대인 동의 없이 전대하면 계약 해지 사유예요. 동의 절차와 전대 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택-임대차-전대차-무단-월세" },
  openGraph: { title: "전세 살면서 방 하나 월세 놓으면 위법인가요? 무단 전대의 법적 위험 | 머니위키", description: "임대인 동의 없이 전대하면 계약 해지 사유예요. 동의 절차와 전대 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/주택-임대차-전대차-무단-월세", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
