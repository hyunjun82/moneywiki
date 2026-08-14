import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 IRP 수령 방법, 어떻게 찾아 쓰나요?",
  description: "IRP에 들어온 퇴직금을 인출하는 방법을 정리했어요. 중도 인출 조건, 해지와의 차이, 세금 처리까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-IRP-수령방법" },
  openGraph: {
    title: "퇴직금 IRP 수령 방법, 어떻게 찾아 쓰나요? | 머니위키",
    description: "IRP에 들어온 퇴직금을 인출하는 방법을 정리했어요. 중도 인출 조건, 해지와의 차이, 세금 처리까지 안내해요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-IRP-수령방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
