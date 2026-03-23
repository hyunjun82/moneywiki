import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약갱신청구권 임대료 5% 상한, 인상 거부와 행사 방법 | 머니위키",
  description: "계약갱신청구권 행사 시 임대료 인상은 5% 이내로 제한돼요. 인상 거부 방법과 갱신 행사 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-임대료-인상-5퍼센트" },
  openGraph: {
    title: "계약갱신청구권 임대료 5% 상한, 인상 거부와 행사 방법 | 머니위키",
    description: "계약갱신청구권 행사 시 임대료 인상은 5% 이내로 제한돼요. 인상 거부 방법과 갱신 행사 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/계약갱신청구권-임대료-인상-5퍼센트",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
