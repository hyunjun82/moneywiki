import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "증축이나 대수선할 때 건축사 설계가 꼭 필요한가요? 설계 의무 기준과 규모",
  description: "바닥면적 85㎡ 초과 증축·대수선은 건축사 설계가 의무예요. 규모별 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건축사-설계-의무-증축-대수선-규모" },
  openGraph: { title: "증축이나 대수선할 때 건축사 설계가 꼭 필요한가요? 설계 의무 기준과 규모 | 머니위키", description: "바닥면적 85㎡ 초과 증축·대수선은 건축사 설계가 의무예요. 규모별 기준을 정리했어요.", url: "https://www.jjyu.co.kr/w/건축사-설계-의무-증축-대수선-규모", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
