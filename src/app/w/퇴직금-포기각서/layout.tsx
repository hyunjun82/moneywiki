import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 포기각서, 쓰면 정말 못 받나요? | 머니위키",
  description: "퇴직금 포기각서는 법적으로 무효예요. 강요에 의해 작성했어도 퇴직금을 청구할 수 있죠. 무효 사유와 대응법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-포기각서" },
  openGraph: {
    title: "퇴직금 포기각서, 쓰면 정말 못 받나요? | 머니위키",
    description: "퇴직금 포기각서는 법적으로 무효예요. 강요에 의해 작성했어도 퇴직금을 청구할 수 있죠. 무효 사유와 대응법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-포기각서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
