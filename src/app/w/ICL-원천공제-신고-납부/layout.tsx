import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "ICL 원천공제 신고 납부 방법 기한",
  description: "취업 후 학자금 상환(ICL) 원천공제 신고 방법. 사업주 의무, 다음 달 10일 기한, 미납 시 가산세.",
  openGraph: { title: "ICL 원천공제 신고 납부 방법 기한", description: "ICL 원천공제 신고 절차, 납부 기한, 미납 불이익.", url: "https://jjyu.co.kr/w/ICL-원천공제-신고-납부" },
  alternates: { canonical: "https://jjyu.co.kr/w/ICL-원천공제-신고-납부" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
