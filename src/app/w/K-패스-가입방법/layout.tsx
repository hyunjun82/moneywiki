import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 가입방법 — 카드 발급 후 회원 등록 절차 | 머니위키",
  description: "K-패스는 카드만 만들면 안 돼요. k-pass.or.kr에서 회원 등록을 따로 해야 환급이 시작돼요. 발급부터 첫 환급까지 전 과정을 순서대로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-가입방법" },
  openGraph: {
    title: "K-패스 가입방법 — 카드 발급 후 회원 등록 절차 | 머니위키",
    description: "K-패스는 카드만 만들면 안 돼요. k-pass.or.kr에서 회원 등록을 따로 해야 환급이 시작돼요. 발급부터 첫 환급까지 전 과정을 순서대로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/K-패스-가입방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
