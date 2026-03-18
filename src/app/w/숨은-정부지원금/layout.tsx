import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "숨은 정부지원금 17가지 — 몰라서 못 받고 있는 혜택 | 머니위키",
  description: "모르면 그냥 지나치는 정부지원금 17가지를 한눈에 정리했어요. 장애수당, 공익직불제, 고용촉진장려금 등 자격 확인과 신청 방법까지.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/숨은-정부지원금" },
  openGraph: {
    title: "숨은 정부지원금 17가지 — 몰라서 못 받고 있는 혜택 | 머니위키",
    description: "모르면 그냥 지나치는 정부지원금 17가지를 한눈에 정리했어요. 장애수당, 공익직불제, 고용촉진장려금 등 자격 확인과 신청 방법까지.",
    url: "https://www.jjyu.co.kr/w/숨은-정부지원금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
