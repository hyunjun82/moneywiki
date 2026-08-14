import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "일용직 퇴직금, 일당 받는 사람도 받을 수 있나요?",
  description: "일용직도 같은 사업장에서 1년 이상 주 15시간 이상 일했다면 퇴직금을 받을 수 있어요. 건설 일용직은 공제회 제도도 있죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/일용직-퇴직금" },
  openGraph: {
    title: "일용직 퇴직금, 일당 받는 사람도 받을 수 있나요? | 머니위키",
    description: "일용직도 같은 사업장에서 1년 이상 주 15시간 이상 일했다면 퇴직금을 받을 수 있어요. 건설 일용직은 공제회 제도도 있죠.",
    url: "https://www.jjyu.co.kr/w/일용직-퇴직금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
