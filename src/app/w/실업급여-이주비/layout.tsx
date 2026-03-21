import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 이주비란? 취업 후 이사비용 지원받는 방법 | 머니위키",
  description: "취업 때문에 이사하면 이사비용을 고용보험에서 지원받아요. 이주비 수급 조건, 광역구직활동비와의 차이, 가족 가산 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-이주비" },
  openGraph: {
    title: "실업급여 이주비란? 취업 후 이사비용 지원받는 방법 | 머니위키",
    description: "취업 때문에 이사하면 이사비용을 고용보험에서 지원받아요. 이주비 수급 조건, 광역구직활동비와의 차이, 가족 가산 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-이주비",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
