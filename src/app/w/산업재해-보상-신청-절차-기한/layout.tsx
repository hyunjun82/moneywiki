import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "산업재해 보상 신청 — 절차·서류·기한 정리 | 머니위키",
  description: "산재 신청은 재해 발생일로부터 3년 이내, 근로복지공단에 요양급여 신청서를 제출하면 돼요. 회사가 거부해도 본인이 직접 신청 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/산업재해-보상-신청-절차-기한",
  },
  openGraph: {
    title: "산업재해 보상 신청 — 절차·서류·기한 정리",
    description: "산재 신청 5단계 절차, 필요 서류, 보상 종류(요양·휴업·장해급여)를 한번에 정리했어요.",
    url: "https://www.jjyu.co.kr/w/산업재해-보상-신청-절차-기한",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
