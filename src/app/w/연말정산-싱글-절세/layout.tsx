import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "싱글 연말정산, 부양가족 없어도 괜찮을까? 최대 148.5만원 환급 전략 | 머니위키",
  description: "1인 가구도 연금저축 600만원+IRP 300만원으로 최대 148.5만원 세액공제받을 수 있어요. 체크카드 전환 전략, 의료비·월세 공제까지 싱글 맞춤 절세 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-싱글-절세",
  },
  openGraph: {
    title: "싱글 연말정산, 최대 148.5만원 환급받는 절세 전략",
    description: "연금저축+IRP 900만원 세액공제, 체크카드 30% 전환, 의료비·월세까지.",
    url: "https://www.jjyu.co.kr/w/연말정산-싱글-절세",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
