import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "양육비 청구 절차와 강제집행 방법 | 머니위키",
  description:
    "이혼·별거 후 양육비 청구 절차 5단계와 상대방이 안 줄 때 강제집행 방법을 정리했어요. 양육비 산정기준표 계산, 이행명령, 운전면허 정지까지 순서대로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/양육비-청구" },
  openGraph: {
    title: "양육비 청구 절차와 강제집행 방법 | 머니위키",
    description:
      "이혼·별거 후 양육비 청구 절차 5단계와 상대방이 안 줄 때 강제집행 방법을 정리했어요. 양육비 산정기준표 계산, 이행명령, 운전면허 정지까지 순서대로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/양육비-청구",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
