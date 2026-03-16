import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연봉제 직장인, 퇴직금은 따로 받나요? | 머니위키",
  description: "연봉에 퇴직금이 포함됐다는 계약은 무효예요. 연봉제라도 퇴직금은 별도로 받아야 하죠. 계산법과 연봉 협상 시 주의점을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-연봉제" },
  openGraph: {
    title: "연봉제 직장인, 퇴직금은 따로 받나요? | 머니위키",
    description: "연봉에 퇴직금이 포함됐다는 계약은 무효예요. 연봉제라도 퇴직금은 별도로 받아야 하죠. 계산법과 연봉 협상 시 주의점을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-연봉제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
