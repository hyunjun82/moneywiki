import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대지급금 일부 지급 사유 부정수급 제재 기준",
  description: "대지급금 일부만 지급되는 사유와 초과분 청구 방법. 부정수급 시 전액 환수 + 추가 징수. 최저임금 보정 기준.",
  openGraph: {
    title: "대지급금 일부 지급 사유 부정수급 제재 기준",
    description: "일부 지급 사유 3가지, 부정수급 제재, 이의신청 절차.",
    url: "https://jjyu.co.kr/w/대지급금-특수-상황-일부지급-최저임금",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/대지급금-특수-상황-일부지급-최저임금" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
