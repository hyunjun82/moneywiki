import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재산이 다 상대방 명의인데 분할받을 수 있나요? 명의와 무관한 분할 청구",
  description: "혼인 중 형성된 재산은 명의와 관계없이 분할 대상이에요. 기여도에 따라 30~50%를 받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-재산명의-일방-분할청구" },
  openGraph: { title: "재산이 다 상대방 명의인데 분할받을 수 있나요? 명의와 무관한 분할 청구 | 머니위키", description: "혼인 중 형성된 재산은 명의와 관계없이 분할 대상이에요. 기여도에 따라 30~50%를 받을 수 있어요.", url: "https://www.jjyu.co.kr/w/이혼-재산명의-일방-분할청구", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
