import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "소상공인 명절자금, 39조 대출 어떻게 받나? 신청 조건과 절차 | 머니위키",
  description: "명절 앞두고 자금 부족한 소상공인을 위해 39.3조 원 규모 대출·보증이 공급돼요. 신청 자격부터 필요 서류, 접수 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/소상공인-명절자금" },
  openGraph: {
    title: "소상공인 명절자금, 39조 대출 어떻게 받나? 신청 조건과 절차 | 머니위키",
    description: "명절 앞두고 자금 부족한 소상공인을 위해 39.3조 원 규모 대출·보증이 공급돼요. 신청 자격부터 필요 서류, 접수 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/소상공인-명절자금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
