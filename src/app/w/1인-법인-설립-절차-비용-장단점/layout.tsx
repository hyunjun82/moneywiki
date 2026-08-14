import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "1인 법인 설립 절차·비용·장단점, 개인사업자와 비교",
  description: "1인 법인 설립은 법인등기+사업자등록 2단계예요. 셀프 시 50~80만원, 대행 시 100~150만원이에요. 순이익 5,000만원 넘으면 법인이 유리해지는 세금 구조 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/1인-법인-설립-절차-비용-장단점" },
  openGraph: {
    title: "1인 법인 설립 절차·비용·장단점, 개인사업자와 비교 | 머니위키",
    description: "1인 법인 설립은 법인등기+사업자등록 2단계예요. 셀프 시 50~80만원, 대행 시 100~150만원이에요. 순이익 5,000만원 넘으면 법인이 유리해지는 세금 구조 정리했어요.",
    url: "https://www.jjyu.co.kr/w/1인-법인-설립-절차-비용-장단점",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
