import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "묵시적갱신 중 월세, 언제까지 내야 하나요? 해지 후 납부 의무 | 머니위키",
  description: "묵시적갱신이면 기존 월세 그대로 내야 해요. 해지 통보해도 3개월간 납부 의무, 연체 시 보증금 차감까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/묵시적갱신-월세-납부의무" },
  openGraph: {
    title: "묵시적갱신 중 월세, 언제까지 내야 하나요? 해지 후 납부 의무 | 머니위키",
    description: "묵시적갱신이면 기존 월세 그대로 내야 해요. 해지 통보해도 3개월간 납부 의무, 연체 시 보증금 차감까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/묵시적갱신-월세-납부의무",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
