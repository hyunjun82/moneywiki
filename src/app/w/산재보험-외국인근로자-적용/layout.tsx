import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "외국인근로자 산재보험 — 가입 의무·보상 범위·신청 방법",
  description: "외국인근로자는 체류자격 관계없이 산재보험 당연가입 대상이에요. 불법체류자도 보상 가능하고, 신청 절차와 보상 범위를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/산재보험-외국인근로자-적용" },
  openGraph: {
    title: "외국인근로자 산재보험 — 가입 의무·보상 범위·신청 방법 | 머니위키",
    description: "외국인근로자는 체류자격 관계없이 산재보험 당연가입 대상이에요. 불법체류자도 보상 가능하고, 신청 절차와 보상 범위를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/산재보험-외국인근로자-적용",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
