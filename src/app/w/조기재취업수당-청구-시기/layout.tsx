import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "조기재취업수당 언제 청구할까? 청구 시기와 지급 조건 | 머니위키",
  description: "재취업 후 12개월이 지나야 청구할 수 있어요. 잔여일수 50% 계산 방법, 금액 예시, 고용24 온라인 청구 절차까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/조기재취업수당-청구-시기" },
  openGraph: {
    title: "조기재취업수당 언제 청구할까? 청구 시기와 지급 조건 | 머니위키",
    description: "재취업 후 12개월이 지나야 청구할 수 있어요. 잔여일수 50% 계산 방법, 금액 예시, 고용24 온라인 청구 절차까지 안내해요.",
    url: "https://www.jjyu.co.kr/w/조기재취업수당-청구-시기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
