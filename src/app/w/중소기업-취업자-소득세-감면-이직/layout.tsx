import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "중소기업 소득세 감면 이직하면? 남은 기간 이어받는 방법 | 머니위키",
  description: "중소기업 소득세 감면 받다가 이직해도 5년이 새로 시작되지 않아요. 최초 취업일 기준으로 남은 기간을 새 회사에서 그대로 받는 방법과 재신청 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/중소기업-취업자-소득세-감면-이직",
  },
  openGraph: {
    title: "중소기업 소득세 감면 이직하면? 남은 기간 이어받는 방법",
    description: "이직해도 감면 기간은 최초 취업일 기준이에요. 새 회사 재신청 절차와 중도퇴사 환급 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/중소기업-취업자-소득세-감면-이직",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
