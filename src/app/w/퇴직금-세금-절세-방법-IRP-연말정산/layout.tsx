import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 세금 줄이는 방법, IRP와 연말정산 활용법 | 머니위키",
  description: "퇴직금을 IRP에 넣으면 퇴직소득세의 30~40%를 절감할 수 있어요. IRP 세액공제, 연금 수령 절세, 연말정산 환급까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-세금-절세-방법-IRP-연말정산" },
  openGraph: {
    title: "퇴직금 세금 줄이는 방법, IRP와 연말정산 활용법 | 머니위키",
    description: "퇴직금을 IRP에 넣으면 퇴직소득세의 30~40%를 절감할 수 있어요. IRP 세액공제, 연금 수령 절세, 연말정산 환급까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-세금-절세-방법-IRP-연말정산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
