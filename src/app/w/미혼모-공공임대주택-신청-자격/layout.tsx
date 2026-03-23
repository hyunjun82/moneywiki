import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "미혼모 공공임대주택, 신청할 수 있나요? 자격 조건부터 신청 방법까지 | 머니위키",
  description: "미혼모는 한부모가족 자격으로 공공임대주택 신청 가능해요. 소득기준 도시근로자 70% 이하, 총자산 3.37억 이하면 국민임대·전세임대 모두 대상이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/미혼모-공공임대주택-신청-자격",
  },
  openGraph: {
    title: "미혼모 공공임대주택, 신청할 수 있나요? 자격 조건부터 신청 방법까지",
    description: "한부모가족 우선공급 대상. 소득기준 70% 이하, LH 청약플러스에서 신청.",
    url: "https://www.jjyu.co.kr/w/미혼모-공공임대주택-신청-자격",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
