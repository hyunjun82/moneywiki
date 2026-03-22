import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "징계 절차와 소명기회, 부당징계 무효 사유와 대응 방법 | 머니위키",
  description: "징계 전 소명기회를 안 주면 무효예요. 부당징계 무효 사유 4가지와 노동위원회 구제신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/징계-절차-소명기회" },
  openGraph: {
    title: "징계 절차와 소명기회, 부당징계 무효 사유와 대응 방법 | 머니위키",
    description: "징계 전 소명기회를 안 주면 무효예요. 부당징계 무효 사유 4가지와 노동위원회 구제신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/징계-절차-소명기회",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
