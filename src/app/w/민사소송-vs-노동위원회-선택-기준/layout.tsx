import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "민사소송 vs 노동위원회, 뭘 선택해야 할까? 비용·기간·효과 비교 | 머니위키",
  description: "노동위원회는 무료·1~2개월, 민사소송은 손해배상 가능·1~2년. 부당해고·임금체불 상황별 선택 기준을 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/민사소송-vs-노동위원회-선택-기준" },
  openGraph: {
    title: "민사소송 vs 노동위원회, 뭘 선택해야 할까? 비용·기간·효과 비교 | 머니위키",
    description: "노동위원회는 무료·1~2개월, 민사소송은 손해배상 가능·1~2년. 부당해고·임금체불 상황별 선택 기준을 비교했어요.",
    url: "https://www.jjyu.co.kr/w/민사소송-vs-노동위원회-선택-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
