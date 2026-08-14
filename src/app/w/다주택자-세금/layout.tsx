import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "다주택자 세금 취득세 종부세 양도세 2026 기준",
  description: "다주택자 취득세 8~12%, 종부세 최대 5%, 양도세 중과 배제 2026.5월까지. 2주택 vs 3주택 세금 비교.",
  openGraph: { title: "다주택자 세금 취득세 종부세 양도세 2026", description: "주택 수별 세율, 양도세 중과 배제 기간.", url: "https://jjyu.co.kr/w/다주택자-세금" },
  alternates: { canonical: "https://jjyu.co.kr/w/다주택자-세금" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
