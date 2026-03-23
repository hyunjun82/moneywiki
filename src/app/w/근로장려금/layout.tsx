import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로장려금, 나도 받을 수 있을까? 자격 조건부터 신청까지 | 머니위키",
  description: "근로장려금은 저소득 근로자·사업자에게 최대 330만원을 지급하는 제도예요. 2026년 맞벌이 기준 4,400만원으로 상향됐고요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로장려금" },
  openGraph: {
    title: "근로장려금, 나도 받을 수 있을까? 자격 조건부터 신청까지 | 머니위키",
    description: "근로장려금은 저소득 근로자·사업자에게 최대 330만원을 지급하는 제도예요. 2026년 맞벌이 기준 4,400만원으로 상향됐고요.",
    url: "https://www.jjyu.co.kr/w/근로장려금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
