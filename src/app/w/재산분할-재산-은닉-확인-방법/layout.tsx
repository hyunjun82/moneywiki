import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "배우자가 재산 숨겼을 때 어떻게 찾나요? 재산명시와 재산조회 신청 방법 | 머니위키",
  description: "이혼 재산분할 시 배우자가 재산을 숨겼다면 법원에 재산명시·재산조회를 신청해서 찾을 수 있어요. 절차와 처벌 기준까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/재산분할-재산-은닉-확인-방법",
  },
  openGraph: {
    title: "배우자가 재산 숨겼을 때 어떻게 찾나요? 재산명시와 재산조회 신청 방법",
    description: "재산명시·재산조회 신청 절차와 은닉 시 처벌 기준.",
    url: "https://www.jjyu.co.kr/w/재산분할-재산-은닉-확인-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
