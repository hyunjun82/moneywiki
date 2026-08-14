import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "튼튼머니 신청방법 적립 사용처 총정리 2026",
  description: "2026 튼튼머니 신청부터 적립·전환·사용까지 한눈에. 국민체육진흥공단 공식 안내.",
  openGraph: {
    title: "튼튼머니 신청방법 적립 사용처 총정리 2026",
    description: "2026 튼튼머니 신청부터 적립·전환·사용까지 한눈에. 국민체육진흥공단 공식 안내.",
    url: "https://jjyu.co.kr/w/ttuntun-hub",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/ttuntun-hub",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
