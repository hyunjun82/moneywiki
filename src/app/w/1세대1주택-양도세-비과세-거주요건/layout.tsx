import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "1세대 1주택 양도세 비과세, 받을 수 있을까? 조정지역 거주요건과 판단 기준 | 머니위키",
  description: "1세대 1주택 양도소득세 비과세는 2년 보유 + 12억 이하가 기본 조건이에요. 조정대상지역에서 2017.8.3 이후 취득했다면 2년 거주요건이 추가되고, 거주 증명 방법과 장기보유특별공제까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/1세대1주택-양도세-비과세-거주요건",
  },
  openGraph: {
    title: "1세대 1주택 양도세 비과세, 받을 수 있을까? 조정지역 거주요건과 판단 기준",
    description: "2년 보유 + 12억 이하 + 조정지역 2년 거주. 비과세 요건 셀프 체크와 거주 증명 방법.",
    url: "https://www.jjyu.co.kr/w/1세대1주택-양도세-비과세-거주요건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
