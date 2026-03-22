import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 보청기 | 머니위키",
  description: "보청기 구입비는 의료비 세액공제 대상이에요. 본인이나 65세 이상 부모님은 한도 없이 15% 공제받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-보청기" },
  openGraph: { title: "연말정산 보청기 | 머니위키", description: "보청기 구입비는 의료비 세액공제 대상이에요. 본인이나 65세 이상 부모님은 한도 없이 15% 공제받을 수 있어요.", url: "https://www.jjyu.co.kr/w/연말정산-보청기", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
