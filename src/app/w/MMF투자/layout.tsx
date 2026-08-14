import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "MMF 투자 예금보다 나을까? 수익률·안전성·가입 방법",
  description: "MMF는 단기 우량채권에 투자하는 펀드예요. 연 3% 전후 수익에 수수료 없이 즉시 환매 가능하고, 은행 예금과 차이점을 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/MMF투자" },
  openGraph: {
    title: "MMF 투자 예금보다 나을까? 수익률·안전성·가입 방법 | 머니위키",
    description: "MMF는 단기 우량채권에 투자하는 펀드예요. 연 3% 전후 수익에 수수료 없이 즉시 환매 가능하고, 은행 예금과 차이점을 비교했어요.",
    url: "https://www.jjyu.co.kr/w/MMF투자",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
