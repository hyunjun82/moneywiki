import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "미등록 대부업체 불법 대출 원금 계산 | 머니위키",
  description: "미등록 대부업체에서 빌린 돈은 실제 받은 금액만 원금이에요. 선이자·보증금은 원금에서 제외되고 이자 계약은 전부 무효(0%)예요.",
  openGraph: {
    title: "미등록 대부업체 불법 대출 원금 계산",
    description: "실수령액만 원금, 이자 전부 무효. 신고 방법과 법률 지원까지.",
    url: "https://jjyu.co.kr/w/미등록-대부업체-불법-대출-원금-계산",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/미등록-대부업체-불법-대출-원금-계산" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
