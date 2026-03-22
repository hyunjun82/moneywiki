import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "금융거래 제한, 왜 막혔나? 원인 조회부터 해제 절차까지 | 머니위키",
  description: "금융거래 제한은 보이스피싱 관련 계좌에 출금을 차단하는 조치예요. 무혐의 처분서를 받아 은행에 해제 신청하면 풀 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/금융거래-제한" },
  openGraph: {
    title: "금융거래 제한, 왜 막혔나? 원인 조회부터 해제 절차까지 | 머니위키",
    description: "금융거래 제한은 보이스피싱 관련 계좌에 출금을 차단하는 조치예요. 무혐의 처분서를 받아 은행에 해제 신청하면 풀 수 있어요.",
    url: "https://www.jjyu.co.kr/w/금융거래-제한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
