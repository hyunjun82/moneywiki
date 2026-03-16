import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "일용직 퇴직금 지급 기준, 어떻게 판단하나요? | 머니위키",
  description: "일용직 퇴직금 지급 기준은 계속 근로 여부로 판단해요. 간헐적으로 일해도 동일 사업장에서 1년 넘으면 퇴직금이 발생하죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/일용직-퇴직금-지급기준" },
  openGraph: {
    title: "일용직 퇴직금 지급 기준, 어떻게 판단하나요? | 머니위키",
    description: "일용직 퇴직금 지급 기준은 계속 근로 여부로 판단해요. 간헐적으로 일해도 동일 사업장에서 1년 넘으면 퇴직금이 발생하죠.",
    url: "https://www.jjyu.co.kr/w/일용직-퇴직금-지급기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
