import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 세액, 어떤 순서로 계산되나요? 세액계산 전체 흐름 | 머니위키",
  description: "총급여→근로소득금액→과세표준→산출세액→결정세액 순으로 계산돼요. 단계별로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-세액계산-방법" },
  openGraph: { title: "연말정산 세액, 어떤 순서로 계산되나요? 세액계산 전체 흐름 | 머니위키", description: "총급여→근로소득금액→과세표준→산출세액→결정세액 순으로 계산돼요. 단계별로 정리했어요.", url: "https://www.jjyu.co.kr/w/연말정산-세액계산-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
