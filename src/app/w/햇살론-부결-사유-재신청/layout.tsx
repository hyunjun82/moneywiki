import { Metadata } from "next";

const slug = "햇살론-부결-사유-재신청";

export const metadata: Metadata = {
  title: "햇살론 부결 사유 & 재신청 전략 | 머니위키",
  description: "햇살론 신청 후 부결 받은 사람들을 위한 가이드. 부결 5가지 사유, 재신청 타이밍, 신용개선 방법, 대안 상품까지 상세히 설명해요.",
  openGraph: {
    title: "햇살론 부결 사유 & 재신청 전략",
    description: "부결 이유 파악 → 신용점수 개선 → 재신청 준비하기",
    images: [{ url: "https://jjyu.co.kr/og-hatsalon.jpg" }],
  },
  robots: "index, follow",
  alternates: { canonical: `https://jjyu.co.kr/w/${slug}` },
};

export const revalidate = 3600; // 1시간마다 재검증 (ISR)

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
