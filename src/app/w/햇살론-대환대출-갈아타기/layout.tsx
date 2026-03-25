import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "햇살론으로 고금리 대출 갈아타기 | 대환 조건·절차·계산",
  description: "고금리 대출(10% 이상)을 햇살론(5~8%)으로 대환하는 방법. 자격 조건, 대환 한도, 금리 절감 효과, 신청 절차를 한눈에 정리했어요.",
  openGraph: {
    title: "햇살론으로 고금리 대출 갈아타기",
    description: "고금리 대출을 햇살론으로 대환하는 방법",
    type: "article",
    url: "https://jjyu.co.kr/w/햇살론-대환대출-갈아타기",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/햇살론-대환대출-갈아타기",
  },
};

export const dynamicParams = false;
export const revalidate = false;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
