import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "치과 교정비도 연말정산에서 공제되나요? 의료비 공제 대상 여부 | 머니위키",
  description: "치료 목적 교정은 공제 가능하지만, 미용 목적 교정은 공제 대상이 아니에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-치과-교정" },
  openGraph: { title: "치과 교정비도 연말정산에서 공제되나요? 의료비 공제 대상 여부 | 머니위키", description: "치료 목적 교정은 공제 가능하지만, 미용 목적 교정은 공제 대상이 아니에요.", url: "https://www.jjyu.co.kr/w/연말정산-치과-교정", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
