import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 구직활동 인정 기준 차수별 횟수와 증빙 방법 | 머니위키",
  description: "1차는 온라인 교육, 2~4차는 1회, 5차 이후는 2회(구직활동 1회 필수). 워크넷 자동연동, 면접확인서, 캡처 제출 방법까지.",
  openGraph: {
    title: "실업급여 구직활동 인정 기준 차수별 횟수와 증빙 방법",
    description: "차수별 구직활동 횟수와 증빙 방법. 워크넷 자동연동부터 비연동 사이트 캡처 제출까지.",
    url: "https://jjyu.co.kr/w/실업급여-구직활동",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/실업급여-구직활동",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
