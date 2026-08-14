import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가족에게 돈 빌리면 증여세 내야 할까? 금전소비대차 계약서 작성법",
  description: "가족 간 돈 거래는 증여로 추정돼요. 차용증을 쓰면 대출로 인정받을 수 있고, 적정이자율은 연 4.6%예요. 2억 1,700만원 이하는 무이자도 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/가족-간-금전소비대차-계약서",
  },
  openGraph: {
    title: "가족에게 돈 빌리면 증여세 내야 할까? 금전소비대차 계약서 작성법",
    description: "적정이자율 4.6%, 무이자 한도 2.17억, 차용증 필수 기재사항과 상환 증빙 방법.",
    url: "https://www.jjyu.co.kr/w/가족-간-금전소비대차-계약서",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
