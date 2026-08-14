import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "농업진흥지역에 농막 지을 수 있나요? 크기 제한부터 쉼터 전환까지",
  description: "농업진흥지역 농막은 20㎡ 이내, 주거 목적 사용 불법이에요. 2024년 12월부터 농촌체류형 쉼터 33㎡가 도입돼서 합법 숙박이 가능해요. 설치 신고 절차와 위반 시 제재까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/농업진흥지역-농막-건축-규제",
  },
  openGraph: {
    title: "농업진흥지역에 농막 지을 수 있나요? 크기 제한부터 쉼터 전환까지",
    description: "농막 20㎡, 쉼터 33㎡. 숙박 가능 여부와 설치 절차 정리.",
    url: "https://www.jjyu.co.kr/w/농업진흥지역-농막-건축-규제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
