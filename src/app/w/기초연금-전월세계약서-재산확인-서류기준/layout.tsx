import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초연금 신청 시 전월세 계약서 왜 필요? 재산 확인 서류 기준",
  description: "기초연금 신청 때 전월세 계약서를 내는 이유는 주거 재산을 정확히 산정하기 위해서예요. 필요 서류와 재산 반영 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-전월세계약서-재산확인-서류기준" },
  openGraph: {
    title: "기초연금 신청 시 전월세 계약서 왜 필요? 재산 확인 서류 기준 | 머니위키",
    description: "기초연금 신청 때 전월세 계약서를 내는 이유는 주거 재산을 정확히 산정하기 위해서예요. 필요 서류와 재산 반영 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-전월세계약서-재산확인-서류기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
