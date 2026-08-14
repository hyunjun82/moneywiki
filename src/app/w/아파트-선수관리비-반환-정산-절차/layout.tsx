import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아파트 팔 때 선수관리비 돌려받나요? 반환 조건과 정산 절차",
  description: "선수관리비는 소유권 이전 시 반환받을 수 있어요. 잔금일 전 영수증 발급받고 매수인에게 정산하세요. 공동주택관리법 제24조 기준.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/아파트-선수관리비-반환-정산-절차",
  },
  openGraph: {
    title: "아파트 선수관리비 반환과 정산 절차",
    description: "잔금일에 영수증으로 정산. 30~50만원 돌려받는 법.",
    url: "https://www.jjyu.co.kr/w/아파트-선수관리비-반환-정산-절차",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
