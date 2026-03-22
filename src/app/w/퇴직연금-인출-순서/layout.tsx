import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 인출 순서 — 퇴직급여 먼저 받아야 세금이 줄어요 | 머니위키",
  description: "IRP 인출 순서에 따라 세금이 달라져요. 퇴직급여를 먼저 연금으로 받으면 퇴직소득세 30~60% 감면, 추가 납입금은 나중에 받으면 유리해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-인출-순서" },
  openGraph: {
    title: "퇴직연금 인출 순서 — 퇴직급여 먼저 받아야 세금이 줄어요 | 머니위키",
    description: "IRP 인출 순서에 따라 세금이 달라져요. 퇴직급여를 먼저 연금으로 받으면 퇴직소득세 30~60% 감면, 추가 납입금은 나중에 받으면 유리해요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-인출-순서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
