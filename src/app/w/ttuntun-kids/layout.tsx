import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "튼튼머니 어린이 참여 방법 만4세 이상 2026 | 머니위키",
  description: "튼튼머니 어린이 참여 조건. 만 4세 이상 가족 모두 참여 가능. 가족 합산 최대 20만P.",
  openGraph: {
    title: "튼튼머니 어린이 참여 방법 만4세 이상 2026",
    description: "튼튼머니 어린이 참여 조건. 만 4세 이상 가족 모두 참여 가능. 가족 합산 최대 20만P.",
    url: "https://jjyu.co.kr/w/ttuntun-kids",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/ttuntun-kids",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
