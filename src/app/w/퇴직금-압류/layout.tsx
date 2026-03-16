import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 압류, 빚이 있으면 퇴직금도 날아가나요? | 머니위키",
  description: "퇴직금 압류는 가능하지만 전액은 안 돼요. 압류 한도, IRP 계좌 보호, 압류를 막거나 되찾는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-압류" },
  openGraph: {
    title: "퇴직금 압류, 빚이 있으면 퇴직금도 날아가나요? | 머니위키",
    description: "퇴직금 압류는 가능하지만 전액은 안 돼요. 압류 한도, IRP 계좌 보호, 압류를 막거나 되찾는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-압류",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
