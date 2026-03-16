import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "프리랜서 퇴직금 지급 기준, 해당되는 경우가 있나요? | 머니위키",
  description: "프리랜서도 실질적으로 근로자에 해당하면 퇴직금을 받을 수 있어요. 근로자성 판단 기준과 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/프리랜서-퇴직금-지급기준" },
  openGraph: {
    title: "프리랜서 퇴직금 지급 기준, 해당되는 경우가 있나요? | 머니위키",
    description: "프리랜서도 실질적으로 근로자에 해당하면 퇴직금을 받을 수 있어요. 근로자성 판단 기준과 청구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/프리랜서-퇴직금-지급기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
