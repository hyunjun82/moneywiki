import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 추가납부, 한 번에 내기 힘들다면? 3개월 분할납부 방법",
  description: "연말정산 추가납부 세금이 10만원 넘으면 2~4월 3개월 분할납부 가능해요. 이자 없이 원금만 내면 되고, 회사에 신청하면 돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-추가납부-분할" },
  openGraph: {
    title: "연말정산 추가납부, 한 번에 내기 힘들다면? 3개월 분할납부 방법 | 머니위키",
    description: "연말정산 추가납부 세금이 10만원 넘으면 2~4월 3개월 분할납부 가능해요. 이자 없이 원금만 내면 되고, 회사에 신청하면 돼요.",
    url: "https://www.jjyu.co.kr/w/연말정산-추가납부-분할",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
