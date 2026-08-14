import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가압류 각하 시 등록면허세 환급, 미사용증명원 발급부터 신청까지",
  description: "가압류 각하되면 등록면허세를 돌려받을 수 있어요. 법원 미사용증명원 발급부터 구청 환급 신청까지 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/가압류-신청-각하-등록면허세-환급" },
  openGraph: {
    title: "가압류 각하 시 등록면허세 환급, 미사용증명원 발급부터 신청까지 | 머니위키",
    description: "가압류 각하되면 등록면허세를 돌려받을 수 있어요. 법원 미사용증명원 발급부터 구청 환급 신청까지 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/가압류-신청-각하-등록면허세-환급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
