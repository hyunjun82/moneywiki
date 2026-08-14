import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재산분할 협의가 안 된다면? 법원 조정부터 심판까지",
  description: "이혼 시 재산분할 협의 불가하면 가정법원에 조정·심판을 청구할 수 있어요. 기여도 산정 기준, 청구 기한 2년, 절차 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-재산분할-협의-불가-대응" },
  openGraph: { title: "재산분할 협의가 안 된다면?", description: "법원 조정→심판→강제집행. 이혼 후 2년 이내 청구.", url: "https://www.jjyu.co.kr/w/이혼-재산분할-협의-불가-대응", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
