import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 국민연금 소득공제, 얼마나 환급받나요? | 머니위키",
  description: "국민연금 본인 부담분 전액이 한도 없이 소득공제돼요. 월급 300만원이면 연 24만원 절세할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-국민연금-공제" },
  openGraph: {
    title: "연말정산 국민연금 소득공제, 얼마나 환급받나요? | 머니위키",
    description: "국민연금 본인 부담분 전액이 한도 없이 소득공제돼요. 월급 300만원이면 연 24만원 절세할 수 있어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-국민연금-공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
