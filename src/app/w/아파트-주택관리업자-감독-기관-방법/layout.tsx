import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아파트 주택관리업자 감독 기관, 관리비 이상하면 여기에 신고하세요 | 머니위키",
  description: "아파트 관리비 이상하거나 관리업체 문제 있을 때 어디에 신고하는지 기관별 역할과 신고 절차를 정리했어요. 입주자대표회의·구청·국토부 순서로 접수하는 방법이에요.",
  openGraph: {
    title: "아파트 주택관리업자 감독 기관, 관리비 이상하면 여기에 신고하세요 | 머니위키",
    description: "아파트 관리비 이상하거나 관리업체 문제 있을 때 어디에 신고하는지 기관별 역할과 신고 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/아파트-주택관리업자-감독-기관-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/아파트-주택관리업자-감독-기관-방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
