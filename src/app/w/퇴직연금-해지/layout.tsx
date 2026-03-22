import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 해지하면 세금 얼마? — 기타소득세 16.5%와 절세 방법 | 머니위키",
  description: "퇴직연금 중도해지 시 기타소득세 16.5%가 붙어요. 법정 사유(주택구입·요양·파산)면 3~5%만 내요. 해지 절차, DC형 차이, 대안까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-해지" },
  openGraph: {
    title: "퇴직연금 해지하면 세금 얼마? — 기타소득세 16.5%와 절세 방법 | 머니위키",
    description: "퇴직연금 중도해지 시 기타소득세 16.5%가 붙어요. 법정 사유(주택구입·요양·파산)면 3~5%만 내요. 해지 절차, DC형 차이, 대안까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-해지",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
