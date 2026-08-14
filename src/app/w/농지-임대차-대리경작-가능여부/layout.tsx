import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "농지를 남에게 빌려줄 수 있나요? 임대차 허용 조건과 제한",
  description: "농지법상 원칙적으로 농지 임대차는 금지지만, 예외 사유에 해당하면 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지-임대차-대리경작-가능여부" },
  openGraph: { title: "농지를 남에게 빌려줄 수 있나요? 임대차 허용 조건과 제한 | 머니위키", description: "농지법상 원칙적으로 농지 임대차는 금지지만, 예외 사유에 해당하면 가능해요.", url: "https://www.jjyu.co.kr/w/농지-임대차-대리경작-가능여부", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
