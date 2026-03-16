import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 소득세, 어떻게 계산되나요? 퇴직소득세 공식 정리 | 머니위키",
  description: "퇴직금 소득세는 근속연수공제와 환산급여 공식으로 계산돼요. 퇴직소득세 계산 공식부터 절세 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-소득세" },
  openGraph: {
    title: "퇴직금 소득세, 어떻게 계산되나요? 퇴직소득세 공식 정리 | 머니위키",
    description: "퇴직금 소득세는 근속연수공제와 환산급여 공식으로 계산돼요. 퇴직소득세 계산 공식부터 절세 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-소득세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
