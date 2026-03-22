import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택연금 받으면서 이사 갈 수 있을까? 담보주택 변경 조건과 절차 | 머니위키",
  description: "주택연금 받다가 이사하려면 담보주택 변경을 신청하면 돼요. 같은 유형 주택끼리만 가능하고, 새 집값에 따라 월지급금이 달라져요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택연금-이사-가능-담보주택-변경" },
  openGraph: {
    title: "주택연금 받으면서 이사 갈 수 있을까? 담보주택 변경 조건과 절차 | 머니위키",
    description: "주택연금 이사 시 담보주택 변경 조건, 월지급금 변동, 신청 절차를 한 글에 정리했어요.",
    url: "https://www.jjyu.co.kr/w/주택연금-이사-가능-담보주택-변경",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
