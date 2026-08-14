import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "생계비계좌 신청·개설 방법, 은행별 바로가기",
  description: "2026년 2월 1일 시행 생계비계좌, 1인 1계좌·월 250만원 압류금지. 시중은행·인터넷은행·저축은행·우체국 신청처와 개설 후 급여계좌 변경까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/생계비계좌-신청-개설-은행-방법" },
  openGraph: {
    title: "생계비계좌 신청·개설 방법, 은행별 바로가기 | 머니위키",
    description: "2026년 2월 1일 시행 생계비계좌, 1인 1계좌·월 250만원 압류금지. 시중은행·인터넷은행·저축은행·우체국 신청처와 개설 후 급여계좌 변경까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/생계비계좌-신청-개설-은행-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
