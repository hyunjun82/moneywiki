import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "소득이 있으면 국민연금이 깎이나요? 노령연금 소득 감액 기준 | 머니위키",
  description: "A값(약 309만원) 초과 소득이 있으면 노령연금이 최대 50%까지 감액돼요. 감액 구간을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/노령연금-소득-감액" },
  openGraph: { title: "소득이 있으면 국민연금이 깎이나요? 노령연금 소득 감액 기준 | 머니위키", description: "A값(약 309만원) 초과 소득이 있으면 노령연금이 최대 50%까지 감액돼요. 감액 구간을 정리했어요.", url: "https://www.jjyu.co.kr/w/노령연금-소득-감액", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
