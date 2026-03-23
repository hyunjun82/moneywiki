import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "성실신고 납세자 의료비 교육비 공제 15% 세액공제 | 머니위키",
  description: "성실신고확인서 제출하면 의료비 15%, 교육비 15% 세액공제받아요. 월세도 15~17% 공제되고 2026년까지 적용돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/성실신고-납세자-의료비-교육비-공제" },
  openGraph: { title: "성실신고 납세자 의료비 교육비 공제 15% 세액공제 | 머니위키", description: "성실신고확인서 제출하면 의료비 15%, 교육비 15% 세액공제받아요. 월세도 15~17% 공제되고 2026년까지 적용돼요.", url: "https://www.jjyu.co.kr/w/성실신고-납세자-의료비-교육비-공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
