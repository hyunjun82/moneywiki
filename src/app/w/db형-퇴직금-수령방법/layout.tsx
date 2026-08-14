import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DB형 퇴직금 수령 방법, 어떻게 받나요?",
  description: "DB형 퇴직연금 수령 방법과 IRP 이전 절차를 정리했어요. 수령 시 세금 처리, 확인해야 할 사항까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/db형-퇴직금-수령방법" },
  openGraph: {
    title: "DB형 퇴직금 수령 방법, 어떻게 받나요? | 머니위키",
    description: "DB형 퇴직연금 수령 방법과 IRP 이전 절차를 정리했어요. 수령 시 세금 처리, 확인해야 할 사항까지 안내해요.",
    url: "https://www.jjyu.co.kr/w/db형-퇴직금-수령방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
