import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "월급 밀려서 퇴사해도 실업급여? 체불 기준과 신청까지",
  description: "임금체불로 퇴사하면 실업급여를 받을 수 있어요. 2개월 이상 체불이나 30% 이상 미지급이면 정당한 이직 사유로 인정돼요. 증빙자료와 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임금체불-실업급여" },
  openGraph: {
    title: "월급 밀려서 퇴사해도 실업급여? 체불 기준과 신청까지 | 머니위키",
    description: "임금체불로 퇴사하면 실업급여를 받을 수 있어요. 2개월 이상 체불이나 30% 이상 미지급이면 정당한 이직 사유로 인정돼요. 증빙자료와 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/임금체불-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
