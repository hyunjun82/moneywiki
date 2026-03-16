import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 수령 방법, 어떤 선택이 유리할까? | 머니위키",
  description: "퇴직금을 일시금으로 받을지, IRP로 받을지 고민이라면 세금 차이와 수령 절차를 비교해보세요. 수령 방법별 장단점을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-수령방법" },
  openGraph: {
    title: "퇴직금 수령 방법, 어떤 선택이 유리할까? | 머니위키",
    description: "퇴직금을 일시금으로 받을지, IRP로 받을지 고민이라면 세금 차이와 수령 절차를 비교해보세요. 수령 방법별 장단점을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-수령방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
