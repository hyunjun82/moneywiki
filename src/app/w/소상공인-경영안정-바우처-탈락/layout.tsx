import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소상공인 경영안정 바우처 탈락 이유·이의신청 방법 | 10일 이내",
  description:
    "탈락 안내를 받은 뒤 10일 이내에 이의신청할 수 있습니다. 주요 거절 사유와 이의신청 절차, 면세사업자가 매출을 증빙할 때 필요한 서류 4종을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/소상공인-경영안정-바우처-탈락" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
