import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "해외 살아도 기초연금 받을 수 있을까? 해외체류 정지 규정과 예외 | 머니위키",
  description: "기초연금 수급자가 해외에 나가면 언제 정지되는지, 예외는 있는지 정리했어요. 60일·90일 기준과 복귀 후 재개 방법이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-해외체류-정지규정-예외" },
  openGraph: {
    title: "해외 살아도 기초연금 받을 수 있을까? 해외체류 정지 규정과 예외 | 머니위키",
    description: "기초연금 수급자가 해외에 나가면 언제 정지되는지, 예외는 있는지 정리했어요. 60일·90일 기준과 복귀 후 재개 방법이에요.",
    url: "https://www.jjyu.co.kr/w/기초연금-해외체류-정지규정-예외",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
