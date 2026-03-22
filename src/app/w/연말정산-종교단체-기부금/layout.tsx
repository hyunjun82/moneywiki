import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "십일조·헌금, 연말정산에서 돌려받을 수 있나요? 종교단체 기부금 공제 | 머니위키",
  description: "종교단체 기부금은 15% 세액공제(1천만원 초과 30%) 대상이에요. 근로소득금액의 10% 한도이고, 기부금영수증을 발급받아야 공제가 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-종교단체-기부금",
  },
  openGraph: {
    title: "종교단체 기부금 연말정산 공제, 얼마나 돌려받나요?",
    description: "십일조·헌금 15% 세액공제, 소득 10% 한도, 이월공제 10년.",
    url: "https://www.jjyu.co.kr/w/연말정산-종교단체-기부금",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
