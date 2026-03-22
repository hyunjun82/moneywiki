import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "시간선택제로 전환하면 세금 혜택이 있나요? 세액감면 조건과 신청 방법 | 머니위키",
  description: "전일제에서 시간선택제로 전환하면 3년간 산출세액 감면을 받을 수 있어요. 육아·돌봄 사유 전환 근로자 대상이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-시간선택제-전환",
  },
  openGraph: {
    title: "시간선택제 전환 세액감면 조건과 신청 방법",
    description: "전환 후 3년간 세액감면. 육아·돌봄 사유 대상.",
    url: "https://www.jjyu.co.kr/w/연말정산-시간선택제-전환",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
