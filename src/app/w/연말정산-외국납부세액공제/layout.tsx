import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "해외 세금 냈는데 또 내야 해? 외국납부세액공제 한도와 신청법 | 머니위키",
  description: "해외주식 배당 등 외국에 낸 세금을 한국 소득세에서 공제받을 수 있어요. 한도 초과분은 10년 이월공제 가능하죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-외국납부세액공제" },
  openGraph: {
    title: "해외 세금 냈는데 또 내야 해? 외국납부세액공제 한도와 신청법 | 머니위키",
    description: "해외주식 배당 등 외국에 낸 세금을 한국 소득세에서 공제받을 수 있어요. 한도 초과분은 10년 이월공제 가능하죠.",
    url: "https://www.jjyu.co.kr/w/연말정산-외국납부세액공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
