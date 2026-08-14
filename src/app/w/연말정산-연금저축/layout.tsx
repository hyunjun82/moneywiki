import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 연금저축 세액공제 400만원 한도와 환급액 계산",
  description: "2025년 귀속 연금저축 세액공제: 400만원 납입 시 최대 66만원 환급. 총급여 5,500만원 이하 16.5%, 초과 13.2%. IRP 합산 900만원 한도.",
  openGraph: {
    title: "연말정산 연금저축 세액공제 얼마 돌려받나요?",
    description: "400만원 넣으면 최대 66만원 환급. IRP와 합산하면 최대 148만 5천원.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
