import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "별거 중 양육비 청구, 이혼 전에도 받을 수 있나요? 부양료 심판 절차 | 머니위키",
  description: "별거 중에도 부양의무가 있어서 양육비를 청구할 수 있어요. 가정법원에 부양료 심판을 청구하는 절차, 산정 기준, 강제집행 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-별거-중-양육비-청구" },
  openGraph: {
    title: "별거 중 양육비 청구, 이혼 전에도 받을 수 있나요? 부양료 심판 절차 | 머니위키",
    description: "별거 중에도 부양의무가 있어서 양육비를 청구할 수 있어요. 가정법원에 부양료 심판을 청구하는 절차, 산정 기준, 강제집행 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/이혼-별거-중-양육비-청구",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
