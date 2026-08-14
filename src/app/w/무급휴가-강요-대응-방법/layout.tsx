import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "무급휴가 강요 시 거부와 휴업수당 청구 방법",
  description: "회사의 무급휴가 강요는 근로기준법 위반이에요. 거부 방법, 평균임금 70% 휴업수당 청구, 노동청 진정 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/무급휴가-강요-대응-방법" },
  openGraph: {
    title: "무급휴가 강요 시 거부와 휴업수당 청구 방법 | 머니위키",
    description: "회사의 무급휴가 강요는 근로기준법 위반이에요. 거부 방법, 평균임금 70% 휴업수당 청구, 노동청 진정 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/무급휴가-강요-대응-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
