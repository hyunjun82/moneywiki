import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "무단결근 해고 정당성: 기간 기준 및 정당 사유 | 머니위키",
  description: "무단결근 2주 연속하면 정당한 해고 대상이고 회사 취업규칙에 따라 3일~1주도 해고 가능하다는 거 아시나요? 판례 기준과 부당해고 대응법까지 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/무단결근-이유-해고-정당성" },
  openGraph: { title: "무단결근 해고 정당성: 기간 기준 및 정당 사유", description: "무단결근 2주 연속하면 정당한 해고 대상이고 회사 취업규칙에 따라 3일~1주도 해고 가능하다는 거 아시나요? 판례 기준과 부당해고 대응법까지 알", url: "https://www.jjyu.co.kr/w/무단결근-이유-해고-정당성", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
