import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연금저축펀드 세액공제 한도 — IRP 조합으로 최대 148만원 환급",
  description: "연금저축 600만원 + IRP 300만원이 세액공제 최적 조합이에요. 총급여 5,500만원 이하 16.5%, 초과 13.2% 적용. ISA 전환 추가 혜택과 중도인출 페널티도 함께 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연금저축펀드-세액공제-한도",
  },
  openGraph: {
    title: "연금저축펀드 세액공제 한도 — IRP 조합으로 최대 148만원 환급",
    description: "연금저축 600만원+IRP 300만원 조합으로 연 900만원 세액공제 한도를 최대로 활용하는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연금저축펀드-세액공제-한도",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
