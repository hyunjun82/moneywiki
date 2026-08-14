import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "산재 재요양, 다시 아프면? 신청 방법부터 불승인 대응까지",
  description: "산재 치료 끝나고 같은 부위가 재발하면 재요양 신청으로 치료비 전액 무료로 받을 수 있어요. 온라인 신청 절차, 필요 서류, 7일 처리 기한, 불승인 시 이의신청 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/요양급여-재발-시-받기" },
  openGraph: {
    title: "산재 재요양, 다시 아프면? 신청 방법부터 불승인 대응까지 | 머니위키",
    description: "산재 치료 끝나고 같은 부위가 재발하면 재요양 신청으로 치료비 전액 무료로 받을 수 있어요. 온라인 신청 절차, 필요 서류, 7일 처리 기한, 불승인 시 이의신청 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/요양급여-재발-시-받기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
