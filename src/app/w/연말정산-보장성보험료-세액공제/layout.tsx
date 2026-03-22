import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보장성보험료 세액공제, 어떤 보험이 되나? 공제율·한도 정리 | 머니위키",
  description: "보장성보험료는 연 100만원 한도에서 12% 세액공제를 받아요. 실손보험·암보험은 되고, 저축성·만기환급형은 안 돼요. 장애인 전용 보험은 15% 별도 한도.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-보장성보험료-세액공제",
  },
  openGraph: {
    title: "보장성보험료 세액공제, 어떤 보험이 되나? 공제율·한도 정리",
    description: "연 100만원 한도, 12% 공제율. 순수 보장형만 해당, 만기환급형은 제외.",
    url: "https://www.jjyu.co.kr/w/연말정산-보장성보험료-세액공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
