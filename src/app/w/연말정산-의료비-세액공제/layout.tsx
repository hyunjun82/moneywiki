import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "병원비 많이 썼는데, 얼마나 돌려받을까? 의료비 세액공제 조건과 계산법 | 머니위키",
  description: "총급여 3% 넘는 의료비의 15%를 세금에서 빼줘요. 연봉 5,000만원에 의료비 500만원이면 약 52만원 환급. 본인·장애인 의료비는 한도 없이 전액 공제돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-의료비-세액공제",
  },
  openGraph: {
    title: "의료비 세액공제, 얼마나 돌려받을까?",
    description: "3% 초과분 15% 환급. 본인·난임 한도 없음. 계산 예시와 체크리스트.",
    url: "https://www.jjyu.co.kr/w/연말정산-의료비-세액공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
