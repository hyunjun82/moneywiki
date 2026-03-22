import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 DB에서 DC 전환, 동의해야 할까? 절차와 장단점 | 머니위키",
  description: "퇴직연금 DB에서 DC로 전환할 때 동의 여부를 결정하는 기준, 전환 절차 5단계, 기존 퇴직금 처리, DC→DB 재전환 불가 등 핵심 정보를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-제도-전환" },
  openGraph: {
    title: "퇴직연금 DB에서 DC 전환, 동의해야 할까? 절차와 장단점 | 머니위키",
    description: "퇴직연금 DB에서 DC로 전환할 때 동의 여부를 결정하는 기준, 전환 절차 5단계, 기존 퇴직금 처리, DC→DB 재전환 불가 등 핵심 정보를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-제도-전환",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
