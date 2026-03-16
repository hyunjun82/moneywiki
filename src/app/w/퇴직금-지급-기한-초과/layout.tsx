import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지급 기한 초과, 지금 받을 수 있나요? | 머니위키",
  description: "퇴직금 지급 기한이 지났더라도 소멸시효 3년 이내라면 청구할 수 있어요. 기한 초과 시 지연이자와 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-기한-초과" },
  openGraph: {
    title: "퇴직금 지급 기한 초과, 지금 받을 수 있나요? | 머니위키",
    description: "퇴직금 지급 기한이 지났더라도 소멸시효 3년 이내라면 청구할 수 있어요. 기한 초과 시 지연이자와 청구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-기한-초과",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
