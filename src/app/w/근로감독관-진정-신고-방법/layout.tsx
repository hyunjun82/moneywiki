import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "월급이나 퇴직금 못 받았다면? 근로감독관 진정 신고 방법과 절차",
  description: "고용노동부 민원마당에서 온라인 10분이면 접수 가능해요. 접수 후 25일 이내 처리, 시정지시·검찰 송치·각하 중 하나로 결과가 나와요. 증빙 없어도 신고할 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/근로감독관-진정-신고-방법",
  },
  openGraph: {
    title: "월급이나 퇴직금 못 받았다면? 근로감독관 진정 신고 방법과 절차",
    description: "민원마당 온라인 10분 접수. 25일 이내 처리. 증빙 없어도 신고 가능.",
    url: "https://www.jjyu.co.kr/w/근로감독관-진정-신고-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
