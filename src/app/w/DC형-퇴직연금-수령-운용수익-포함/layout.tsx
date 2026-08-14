import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DC형 퇴직연금 수령액, 운용수익 포함 얼마?",
  description: "DC형 수령액은 회사 적립금에 내가 굴린 운용수익을 더한 금액이에요. 잘 굴리면 DB형보다 30% 더 받고, 손실 나면 줄어드는 구조죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/DC형-퇴직연금-수령-운용수익-포함" },
  openGraph: {
    title: "DC형 퇴직연금 수령액, 운용수익 포함 얼마? | 머니위키",
    description: "DC형 수령액은 회사 적립금에 내가 굴린 운용수익을 더한 금액이에요. 잘 굴리면 DB형보다 30% 더 받고, 손실 나면 줄어드는 구조죠.",
    url: "https://www.jjyu.co.kr/w/DC형-퇴직연금-수령-운용수익-포함",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
