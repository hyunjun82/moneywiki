import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "신혼부부 연말정산, 결혼세액공제부터 몰아주기 전략까지 | 머니위키",
  description: "2024~2026년 혼인신고 부부는 결혼세액공제 최대 100만원을 받을 수 있어요. 의료비 몰아주기, 부양가족 분배 등 첫해 전략을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-신혼부부" },
  openGraph: {
    title: "신혼부부 연말정산, 결혼세액공제부터 몰아주기 전략까지 | 머니위키",
    description: "2024~2026년 혼인신고 부부는 결혼세액공제 최대 100만원을 받을 수 있어요. 의료비 몰아주기, 부양가족 분배 등 첫해 전략을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-신혼부부",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
