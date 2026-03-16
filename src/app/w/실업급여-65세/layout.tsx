import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "65세 이후에도 실업급여 받을까? 가입 시점 기준과 수급 조건 | 머니위키",
  description: "65세 이상이어도 실업급여를 받을 수 있죠. 핵심은 65세 이전에 취업했느냐예요. 일용직 예외, 이직 시 주의사항까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-65세" },
  openGraph: {
    title: "65세 이후에도 실업급여 받을까? 가입 시점 기준과 수급 조건 | 머니위키",
    description: "65세 이상이어도 실업급여를 받을 수 있죠. 핵심은 65세 이전에 취업했느냐예요. 일용직 예외, 이직 시 주의사항까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-65세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
