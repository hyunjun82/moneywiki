import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이자·배당 받을 때 왜 15.4%를 떼가나요? 금융소득 원천징수와 종합과세 기준 정리 | 머니위키",
  description: "이자·배당 수령 시 은행이 15.4%를 자동으로 원천징수해요. 연간 금융소득 2,000만원 초과 시 종합과세 대상이 되고, 2026년부터 배당소득 분리과세(최대 33%) 선택도 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/금융소득-원천징수-이자-배당",
  },
  openGraph: {
    title: "이자·배당 받을 때 왜 15.4%를 떼가나요? 금융소득 원천징수와 종합과세 기준",
    description: "이자·배당 수령 시 15.4% 원천징수. 연 2,000만원 초과 시 종합과세 대상.",
    url: "https://www.jjyu.co.kr/w/금융소득-원천징수-이자-배당",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
