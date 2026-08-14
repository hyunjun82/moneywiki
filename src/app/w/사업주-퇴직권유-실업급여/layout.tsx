import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "회사가 나가라고 했을 때? 실업급여 조건과 대처법",
  description: "사업주가 퇴직을 권유하면 권고사직으로 실업급여를 받을 수 있어요. 증거 확보 방법과 회사가 협조 안 할 때 대처법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/사업주-퇴직권유-실업급여" },
  openGraph: {
    title: "회사가 나가라고 했을 때? 실업급여 조건과 대처법 | 머니위키",
    description: "사업주가 퇴직을 권유하면 권고사직으로 실업급여를 받을 수 있어요. 증거 확보 방법과 회사가 협조 안 할 때 대처법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/사업주-퇴직권유-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
