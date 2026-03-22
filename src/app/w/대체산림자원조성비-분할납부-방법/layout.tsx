import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대체산림자원조성비 분할납부 방법 — 대상·신청·납부 일정 | 머니위키",
  description: "대체산림자원조성비 30% 선납 후 잔액을 4년 이내 4회 분할 가능해요. 공기업·중소기업 등 대상 요건과 신청 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/대체산림자원조성비-분할납부-방법",
  },
  openGraph: {
    title: "대체산림자원조성비 분할납부 방법 — 대상·신청·납부 일정",
    description: "분할납부 가능 대상, 신청 절차 5단계, 이행보증금 예치 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/대체산림자원조성비-분할납부-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
