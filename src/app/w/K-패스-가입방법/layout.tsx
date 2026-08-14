import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 가입방법 — 카드 발급 후 환급까지 전 과정 4단계",
  description: "K-패스는 카드만 만들면 환급이 안 돼요. k-pass.or.kr 회원 가입이 별도로 필요해요. 발급부터 첫 환급까지 4단계 전 과정과 흔한 실수 3가지를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-가입방법" },
  openGraph: {
    title: "K-패스 가입방법 — 카드 발급 후 환급까지 전 과정 4단계",
    description: "K-패스는 카드만 만들면 환급이 안 돼요. k-pass.or.kr 회원 가입이 별도로 필요해요. 4단계 전 과정과 흔한 실수 3가지를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/K-패스-가입방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
