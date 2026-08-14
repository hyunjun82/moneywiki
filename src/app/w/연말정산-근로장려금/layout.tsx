import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로장려금, 나도 받을 수 있을까? 자격 요건과 신청 방법",
  description: "근로장려금은 저소득 근로자에게 정부가 현금을 지급하는 제도예요. 단독 165만원, 홑벌이 285만원, 맞벌이 330만원까지. 5월에 홈택스로 신청하세요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-근로장려금",
  },
  openGraph: {
    title: "근로장려금, 나도 받을 수 있을까? 자격 요건과 신청 방법",
    description: "단독 165만원, 홑벌이 285만원, 맞벌이 330만원. 5월 홈택스 신청.",
    url: "https://www.jjyu.co.kr/w/연말정산-근로장려금",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
