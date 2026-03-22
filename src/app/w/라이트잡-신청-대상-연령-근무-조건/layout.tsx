import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "라이트잡, 나도 신청할 수 있을까? 대상 연령과 근무 조건 | 머니위키",
  description: "경기도 만 50~64세 대상, 주 15~36시간 근무하면 사업주에게 월 40만원 지원돼요. 4대보험 가입 필수이고 경기도일자리재단에서 신청 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/라이트잡-신청-대상-연령-근무-조건",
  },
  openGraph: {
    title: "라이트잡, 나도 신청할 수 있을까? 대상 연령과 근무 조건",
    description: "만 50~64세, 주 15~36시간, 월 40만원 지원. 신청 자격과 절차.",
    url: "https://www.jjyu.co.kr/w/라이트잡-신청-대상-연령-근무-조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
