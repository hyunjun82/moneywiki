import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "산재 재발 요양급여, 다시 받을 수 있을까? | 머니위키",
  description: "산재 치유 후 같은 부위가 재발하면 재요양 급여를 받을 수 있어요. 인정 기준, 신청 서류, 불승인 시 구제절차까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/산재-재발-요양급여",
  },
  openGraph: {
    title: "산재 재발 요양급여, 다시 받을 수 있을까?",
    description: "의학적 인과관계만 있으면 10년 후에도 재요양 가능해요. 신청 절차와 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/산재-재발-요양급여",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
