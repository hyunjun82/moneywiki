import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임신 근로시간 단축 신청 방법과 조건 | 머니위키",
  description: "임신 12주 이내·32주 이후 하루 2시간 단축근무를 신청할 수 있어요. 임금 삭감 금지, 회사 거부 시 과태료. 2025년 개정사항과 신청 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/임신초기-근로시간-단축-제도",
  },
  openGraph: {
    title: "임신 근로시간 단축 신청 방법과 조건",
    description: "하루 2시간 단축, 임금 삭감 없이. 12주 이내·32주 이후 사용 가능.",
    url: "https://www.jjyu.co.kr/w/임신초기-근로시간-단축-제도",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
