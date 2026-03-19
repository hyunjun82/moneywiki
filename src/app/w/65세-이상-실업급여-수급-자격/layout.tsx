import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "65세 이상 실업급여 수급 자격 | 머니위키",
  description: "65세 전에 입사했다면 65세 이후 퇴직해도 실업급여 수급 가능. 나이가 아닌 고용보험 가입 시점이 기준. 케이스별 정리.",
  openGraph: {
    title: "65세 이상 실업급여 수급 자격",
    description: "65세 전 가입이면 이후 퇴직도 수급 가능. 고용24에서 가입 시점 확인하세요.",
    url: "https://jjyu.co.kr/w/65세-이상-실업급여-수급-자격",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/65세-이상-실업급여-수급-자격",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
