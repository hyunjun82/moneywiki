import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "직원 4명 이하 사업장, 퇴직금 안 줘도 되나요? | 머니위키",
  description: "5인 미만 사업장이어도 퇴직금은 반드시 지급해야 해요. 1년 이상, 주 15시간 이상 근무했다면 사업장 규모와 관계없이 퇴직금이 발생하죠. 지급 기준과 청구 방법을 담았어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-기준-5인미만" },
  openGraph: {
    title: "직원 4명 이하 사업장, 퇴직금 안 줘도 되나요? | 머니위키",
    description: "5인 미만 사업장이어도 퇴직금은 반드시 지급해야 해요. 1년 이상, 주 15시간 이상 근무했다면 사업장 규모와 관계없이 퇴직금이 발생하죠. 지급 기준과 청구 방법을 담았어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-기준-5인미만",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
