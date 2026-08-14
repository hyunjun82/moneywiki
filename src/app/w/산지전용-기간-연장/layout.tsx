import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "산지전용 기간 연장 허가 조건과 신청 절차",
  description: "산지전용 허가 기간 연장은 1회만 가능하고 최초 허가 기간을 넘길 수 없어요. 만료 전 신청 필수이고 필요 서류와 절차를 정리했어요.",
  openGraph: {
    title: "산지전용 기간 연장 허가 조건과 신청 절차 | 머니위키",
    description: "산지전용 허가 기간 연장 조건과 신청 방법이에요.",
    url: "https://www.jjyu.co.kr/w/산지전용-기간-연장",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/산지전용-기간-연장" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
