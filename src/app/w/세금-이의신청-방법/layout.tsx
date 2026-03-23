import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "세금 이의신청 방법 — 90일 기한과 신청 절차 | 머니위키",
  description: "세금 고지서에 이의가 있으면 90일 이내에 이의신청서를 제출할 수 있어요. 홈택스 온라인 신청, 필요 서류, 불복 절차까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/세금-이의신청-방법",
  },
  openGraph: {
    title: "세금 이의신청 방법 — 90일 기한과 신청 절차",
    description: "이의신청서 작성부터 제출, 기각 시 심사·심판청구까지 세금 불복 절차 전체를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/세금-이의신청-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
