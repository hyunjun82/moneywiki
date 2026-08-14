import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "영구임대주택 국가유공자 우선공급 — 자격 조건과 신청 방법",
  description: "국가유공자와 유족은 영구임대주택 건설 물량의 10%를 우선공급 받을 수 있어요. 소득 기준, 신청 절차, 2029년까지 유효한 규정을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/영구임대주택-국가유공자-우선공급" },
  openGraph: {
    title: "영구임대주택 국가유공자 우선공급 — 자격 조건과 신청 방법 | 머니위키",
    description: "국가유공자와 유족은 영구임대주택 건설 물량의 10%를 우선공급 받을 수 있어요. 소득 기준, 신청 절차, 2029년까지 유효한 규정을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/영구임대주택-국가유공자-우선공급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
