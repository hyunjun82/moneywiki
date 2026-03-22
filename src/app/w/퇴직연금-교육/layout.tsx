import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 교육, 왜 받아야 하나요? 사업주 의무와 과태료 | 머니위키",
  description: "퇴직연금 가입자교육은 사업주의 법적 의무예요. 연 1회 이상 실시해야 하고, 안 하면 직원 1인당 10~30만원 과태료가 나와요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-교육" },
  openGraph: {
    title: "퇴직연금 교육, 왜 받아야 하나요? 사업주 의무와 과태료 | 머니위키",
    description: "퇴직연금 가입자교육은 사업주의 법적 의무예요. 연 1회 이상 실시해야 하고, 안 하면 직원 1인당 10~30만원 과태료가 나와요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-교육",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
