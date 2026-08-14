import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "묵시적갱신 계약서, 새로 써야 하나요? 확정일자 유지 여부",
  description: "묵시적갱신 됐으면 새 계약서 불필요. 기존 확정일자도 유효. 보증금 변동 시에만 재작성. 주의할 점을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/묵시적갱신-계약서" },
  openGraph: { title: "묵시적갱신 계약서, 새로 써야 하나요? | 머니위키", description: "묵시적갱신 됐으면 새 계약서 불필요. 기존 확정일자도 유효.", url: "https://www.jjyu.co.kr/w/묵시적갱신-계약서", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
