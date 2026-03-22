import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "장애인고용부담금 감면 계산, 연계고용 신청 방법 | 머니위키",
  description: "부담금 = 미달인원 x 월 1,280,800원 x 12개월. 연계고용으로 최대 50% 감면. 100인 미만 면제. 계산기와 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인고용부담금-감면-계산" },
  openGraph: {
    title: "장애인고용부담금 감면 계산, 연계고용 신청 방법 | 머니위키",
    description: "부담금 = 미달인원 x 월 1,280,800원 x 12개월. 연계고용으로 최대 50% 감면.",
    url: "https://www.jjyu.co.kr/w/장애인고용부담금-감면-계산",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
