import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "1세대 1주택 양도소득세 비과세 요건",
  description: "보유 2년, 조정대상지역 거주 2년, 12억 이하 조건 완전 정리. 일시적 2주택 3년 처분, 동거봉양·혼인 합가 특례까지.",
  openGraph: {
    title: "1세대 1주택 양도소득세 비과세 요건",
    description: "보유 2년, 조정대상지역 거주 2년, 12억 이하 조건 완전 정리.",
    url: "https://jjyu.co.kr/w/1세대-1주택-양도소득세-비과세-요건",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/1세대-1주택-양도소득세-비과세-요건",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
