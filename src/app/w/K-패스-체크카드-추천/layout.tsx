import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 체크카드 추천 — 연회비 0원, 실적 없이 환급받는 법",
  description: "K-패스 체크카드는 전 은행 연회비 0원, 전월실적 없음이에요. 은행별 차별점과 신청 링크를 정리했어요. 연말정산 공제율 30%로 신용카드보다 유리한 점까지 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-체크카드-추천" },
  openGraph: {
    title: "K-패스 체크카드 추천 — 연회비 0원, 실적 없이 환급받는 법",
    description: "K-패스 체크카드는 전 은행 연회비 0원, 전월실적 없음이에요. 은행별 차별점과 신청 링크를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/K-패스-체크카드-추천",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
