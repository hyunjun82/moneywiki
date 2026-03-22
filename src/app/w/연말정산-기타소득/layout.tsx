import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 기타소득 분리과세 조건과 세금 계산법 | 머니위키",
  description: "기타소득은 필요경비 60%가 자동 인정돼요. 소득금액 300만원 이하면 분리과세 선택해서 종소세 신고 없이 끝낼 수 있어요.",
  openGraph: {
    title: "연말정산 기타소득 분리과세 조건과 세금 계산법 | 머니위키",
    description: "기타소득 세금 계산법과 분리과세 조건을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-기타소득",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-기타소득" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
