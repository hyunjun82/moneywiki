import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보험금 거부당했다면? 분쟁조정 신청 방법과 절차",
  description: "금융감독원 분쟁조정은 무료·2~3개월이면 결과가 나와요. 신청 방법, 준비 서류, 조정안 효력까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보험금-분쟁조정-신청-방법" },
  openGraph: {
    title: "보험금 거부당했다면? 분쟁조정 신청 방법과 절차 | 머니위키",
    description: "금융감독원 분쟁조정은 무료·2~3개월이면 결과가 나와요. 신청 방법, 준비 서류, 조정안 효력까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/보험금-분쟁조정-신청-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
