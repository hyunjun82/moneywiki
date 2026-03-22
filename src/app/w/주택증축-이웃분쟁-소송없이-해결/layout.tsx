import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택 증축 이웃 분쟁 소송 없이 해결 방법 | 머니위키",
  description: "집을 증축하는데 옆집과 다퉈서 힘드시죠. 법원 가지 않고도 분쟁을 해결할 수 있는 방법을 알아봐요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택증축-이웃분쟁-소송없이-해결" },
  openGraph: { title: "주택 증축 이웃 분쟁 소송 없이 해결 방법 | 머니위키", description: "집을 증축하는데 옆집과 다퉈서 힘드시죠. 법원 가지 않고도 분쟁을 해결할 수 있는 방법을 알아봐요", url: "https://www.jjyu.co.kr/w/주택증축-이웃분쟁-소송없이-해결", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
