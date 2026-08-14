import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 일용직 적용 기준, 어떤 경우에 받을 수 있나요?",
  description: "일용직 근로자에게 퇴직금이 적용되는 기준과 사업주의 편법을 막는 방법, 소멸시효까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-일용직" },
  openGraph: {
    title: "퇴직금 일용직 적용 기준, 어떤 경우에 받을 수 있나요? | 머니위키",
    description: "일용직 근로자에게 퇴직금이 적용되는 기준과 사업주의 편법을 막는 방법, 소멸시효까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-일용직",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
