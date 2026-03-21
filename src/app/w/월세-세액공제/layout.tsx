import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "월세 세액공제 조건부터 신청까지 | 머니위키",
  description: "월세 세액공제 자격 조건 5가지, 환급액 계산법, 신청 절차와 필요 서류를 정리했습니다. 총급여 기준 공제율 15~17%, 한도 1000만원.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/월세-세액공제" },
  openGraph: {
    title: "월세 세액공제 조건부터 신청까지 | 머니위키",
    description: "월세 세액공제 자격 조건 5가지, 환급액 계산법, 신청 절차와 필요 서류를 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/월세-세액공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
