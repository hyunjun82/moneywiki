import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "1세대 1주택 양도세, 정말 0원일까? 비과세 조건과 12억 기준 계산법",
  description: "1세대 1주택자는 2년 보유, 조정대상지역은 2년 거주까지 충족하면 12억원까지 양도소득세가 0원이에요. 12억 초과분은 장기보유특별공제로 최대 80%까지 줄일 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/1세대1주택-양도소득세-비과세-조건",
  },
  openGraph: {
    title: "1세대 1주택 양도세, 정말 0원일까? 비과세 조건과 12억 기준 계산법",
    description: "2년 보유 + 12억 이하 = 양도세 0원. 조정대상지역 거주요건, 12억 초과 계산법, 장기보유특별공제까지.",
    url: "https://www.jjyu.co.kr/w/1세대1주택-양도소득세-비과세-조건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
