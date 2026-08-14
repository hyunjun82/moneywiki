import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ISA 계좌, 3년 전에 깨면 얼마나 손해? 중도해지 패널티와 원금 인출법",
  description: "ISA 계좌 원금은 언제든 패널티 없이 인출 가능해요. 3년 전 전액 해지하면 수익에 15.4% 세금이 붙고 비과세 혜택이 사라져요. 원금만 빼는 게 최선이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/ISA계좌-중도해지",
  },
  openGraph: {
    title: "ISA 계좌, 3년 전에 깨면 얼마나 손해? 중도해지 패널티와 원금 인출법",
    description: "원금 인출 = 패널티 0원. 전액 해지 = 수익에 15.4% 과세. 상황별 대처법.",
    url: "https://www.jjyu.co.kr/w/ISA계좌-중도해지",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
