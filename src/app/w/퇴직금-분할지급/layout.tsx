import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 분할 지급, 동의하면 나중에 못 받나요? | 머니위키",
  description: "퇴직금 분할 지급은 원칙적으로 무효예요. 동의서를 썼어도 퇴직 시 전액을 다시 청구할 수 있죠. 분할 지급 문제와 대처법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-분할지급" },
  openGraph: {
    title: "퇴직금 분할 지급, 동의하면 나중에 못 받나요? | 머니위키",
    description: "퇴직금 분할 지급은 원칙적으로 무효예요. 동의서를 썼어도 퇴직 시 전액을 다시 청구할 수 있죠. 분할 지급 문제와 대처법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-분할지급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
