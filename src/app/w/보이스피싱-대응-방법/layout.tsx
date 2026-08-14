import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보이스피싱 대응 방법, 신고·지급정지·환급 절차",
  description: "보이스피싱 의심 전화 받으면 즉시 끊고 112·1332 신고. 이미 송금했다면 30분 이내 지급정지 신청이 핵심이에요. 피해금 환급까지 4단계로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보이스피싱-대응-방법" },
  openGraph: {
    title: "보이스피싱 대응 방법, 신고·지급정지·환급 절차 | 머니위키",
    description: "보이스피싱 의심 전화 받으면 즉시 끊고 112·1332 신고. 이미 송금했다면 30분 이내 지급정지 신청이 핵심이에요. 피해금 환급까지 4단계로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/보이스피싱-대응-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
