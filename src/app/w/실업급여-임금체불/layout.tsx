import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임금체불로 퇴직, 실업급여 될까? 2개월 기준과 증빙 서류",
  description: "임금체불로 퇴직하면 자발적 퇴사여도 실업급여를 받을 수 있죠. 2개월 이상 체불 기준, 필요한 증빙자료, 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-임금체불" },
  openGraph: {
    title: "임금체불로 퇴직, 실업급여 될까? 2개월 기준과 증빙 서류 | 머니위키",
    description: "임금체불로 퇴직하면 자발적 퇴사여도 실업급여를 받을 수 있죠. 2개월 이상 체불 기준, 필요한 증빙자료, 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-임금체불",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
