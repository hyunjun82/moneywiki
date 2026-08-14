import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지급 기한 연장, 동의하면 어떻게 되나요?",
  description: "퇴직금 지급 기한은 당사자 합의로 연장할 수 있어요. 동의서의 효력, 연장 후 주의할 점, 거부해도 되는지를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-기한-연장" },
  openGraph: {
    title: "퇴직금 지급 기한 연장, 동의하면 어떻게 되나요? | 머니위키",
    description: "퇴직금 지급 기한은 당사자 합의로 연장할 수 있어요. 동의서의 효력, 연장 후 주의할 점, 거부해도 되는지를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-기한-연장",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
