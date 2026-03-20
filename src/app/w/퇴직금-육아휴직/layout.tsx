import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아휴직 쓰면 퇴직금이 줄어드나요? 근속기간 산입과 평균임금 특례 | 머니위키",
  description: "육아휴직 기간은 퇴직금 근속기간에 포함돼요. 단, 육아휴직 중 퇴직하면 평균임금이 낮게 산정돼서 재산정 요청이 필요해요. 법적 근거와 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-육아휴직" },
  openGraph: {
    title: "육아휴직 쓰면 퇴직금이 줄어드나요? 근속기간 산입과 평균임금 특례 | 머니위키",
    description: "육아휴직 기간은 퇴직금 근속기간에 포함돼요. 단, 육아휴직 중 퇴직하면 평균임금이 낮게 산정돼서 재산정 요청이 필요해요. 법적 근거와 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-육아휴직",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
