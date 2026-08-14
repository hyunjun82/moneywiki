import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "묵시적갱신 복비, 안 내도 되는 이유와 거부 방법",
  description: "묵시적갱신 됐는데 부동산에서 복비 달라고 하면 거부하세요. 중개 서비스 받은 적 없으니 낼 의무 없어요. 공인중개사법 근거와 거부 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/묵시적갱신-복비" },
  openGraph: {
    title: "묵시적갱신 복비, 안 내도 되는 이유와 거부 방법 | 머니위키",
    description: "묵시적갱신 됐는데 부동산에서 복비 달라고 하면 거부하세요. 중개 서비스 받은 적 없으니 낼 의무 없어요.",
    url: "https://www.jjyu.co.kr/w/묵시적갱신-복비",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
