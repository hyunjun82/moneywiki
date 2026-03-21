import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 반복수급 감액 5년 3회 기준과 단계별 삭감률 | 머니위키",
  description: "5년 내 3회째 수급부터 10% 감액 시작. 4회 25%, 5회 이상 50% 삭감. 이직일 기준 5년, 재취업활동계획서 의무까지 정리했어요.",
  openGraph: {
    title: "실업급여 반복수급 감액 5년 3회 기준과 단계별 삭감률",
    description: "3회 10%, 4회 25%, 5회 이상 50% 삭감. 내 횟수 확인 후 실제 수령액 계산.",
    url: "https://jjyu.co.kr/w/실업급여-반복수급",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/실업급여-반복수급",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
