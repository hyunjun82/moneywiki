import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건설 근로자 퇴직금, 어떻게 받나요?",
  description: "건설 근로자는 건설근로자공제회를 통해 퇴직공제금을 받을 수 있어요. 적립 방식, 수령 조건, 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건설근로자-퇴직금" },
  openGraph: {
    title: "건설 근로자 퇴직금, 어떻게 받나요? | 머니위키",
    description: "건설 근로자는 건설근로자공제회를 통해 퇴직공제금을 받을 수 있어요. 적립 방식, 수령 조건, 청구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/건설근로자-퇴직금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
