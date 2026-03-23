import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약갱신청구권 월세도 되나? 인상 한도와 거절 조건 | 머니위키",
  description: "월세도 계약갱신청구권을 쓸 수 있어요. 전세만 되는 게 아니라, 보증금과 월세 각각 5%까지만 올릴 수 있죠. 갱신 거절 사유와 행사 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-월세" },
  openGraph: {
    title: "계약갱신청구권 월세도 되나? 인상 한도와 거절 조건 | 머니위키",
    description: "월세도 계약갱신청구권을 쓸 수 있어요. 전세만 되는 게 아니라, 보증금과 월세 각각 5%까지만 올릴 수 있죠. 갱신 거절 사유와 행사 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/계약갱신청구권-월세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
