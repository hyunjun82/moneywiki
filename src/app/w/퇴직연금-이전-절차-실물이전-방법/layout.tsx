import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 이전 절차 실물이전 방법 | 머니위키",
  description: "퇴직연금 실물이전으로 ETF 매도 없이 금융사를 바꿀 수 있어요. 비대면 앱에서 10분 신청, 수수료 무료, 3~10영업일 완료.",
  openGraph: {
    title: "퇴직연금 이전 절차 실물이전 방법",
    description: "은행에서 증권사로 퇴직연금 옮기는 방법. 실물이전으로 수수료 0원 만들기.",
    url: "https://jjyu.co.kr/w/퇴직연금-이전-절차-실물이전-방법",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/퇴직연금-이전-절차-실물이전-방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
