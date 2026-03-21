import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "처분금지가처분, 신청 조건은? 담보금 기준과 절차 정리 | 머니위키",
  description: "처분금지가처분 신청 방법과 담보금 기준을 정리했어요. 부동산 가액의 5% 담보금, 인지대 1만원, 7일 내 납부 등 핵심 절차를 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/처분금지가처분-신청-조건" },
  openGraph: {
    title: "처분금지가처분, 신청 조건은? 담보금 기준과 절차 정리 | 머니위키",
    description: "처분금지가처분 신청 방법과 담보금 기준을 정리했어요. 부동산 가액의 5% 담보금, 인지대 1만원, 7일 내 납부 등 핵심 절차를 안내해요.",
    url: "https://www.jjyu.co.kr/w/처분금지가처분-신청-조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
