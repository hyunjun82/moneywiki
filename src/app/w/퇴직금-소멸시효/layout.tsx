import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 소멸시효 3년, 지금 청구할 수 있나요? | 머니위키",
  description: "퇴직금 청구권은 퇴직일로부터 3년이에요. 기산점, 시효 중단 방법, 3년이 지난 경우의 대처법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-소멸시효" },
  openGraph: {
    title: "퇴직금 소멸시효 3년, 지금 청구할 수 있나요? | 머니위키",
    description: "퇴직금 청구권은 퇴직일로부터 3년이에요. 기산점, 시효 중단 방법, 3년이 지난 경우의 대처법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-소멸시효",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
