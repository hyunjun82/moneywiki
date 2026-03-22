import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "요양보호사 결격사유 7가지, 자격 기준과 확인 방법 | 머니위키",
  description: "정신질환자, 약물중독자, 금고형 이상 전과자 등 7가지 결격사유에 해당하면 요양보호사 자격증을 받을 수 없어요. 자가 점검 체크리스트와 확인 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/요양보호사-자격증-결격사유-관리",
  },
  openGraph: {
    title: "요양보호사 결격사유 7가지, 자격 기준과 확인 방법",
    description: "7가지만 해당 안 되면 자격증 취득 가능. 벌금형은 결격사유 아님.",
    url: "https://www.jjyu.co.kr/w/요양보호사-자격증-결격사유-관리",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
