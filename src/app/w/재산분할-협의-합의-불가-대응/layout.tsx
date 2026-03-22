import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "이혼 재산분할, 합의가 안 되면 어떡하나요? 합의 불가 시 법적 대응 | 머니위키",
  description: "합의 안 되면 가정법원에 재산분할 청구 소송을 제기할 수 있어요. 이혼 확정 후 2년 내 청구해야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재산분할-협의-합의-불가-대응" },
  openGraph: { title: "이혼 재산분할, 합의가 안 되면 어떡하나요? 합의 불가 시 법적 대응 | 머니위키", description: "합의 안 되면 가정법원에 재산분할 청구 소송을 제기할 수 있어요. 이혼 확정 후 2년 내 청구해야 해요.", url: "https://www.jjyu.co.kr/w/재산분할-협의-합의-불가-대응", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
