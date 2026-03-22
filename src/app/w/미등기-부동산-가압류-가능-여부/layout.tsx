import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "미등기 부동산도 가압류 되나요? 신청 서류부터 집행 절차까지 | 머니위키",
  description: "건축허가·신고를 거친 미등기 건물은 가압류 가능해요. 등기부 기입이 아닌 집행관 현장 표시 방식이고, 무허가 건물은 대상이 아니에요. 신청 서류와 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/미등기-부동산-가압류-가능-여부",
  },
  openGraph: {
    title: "미등기 부동산도 가압류 되나요? 신청 서류부터 집행 절차까지",
    description: "건축허가 거친 미등기 건물은 가압류 가능. 집행관 현장 표시 방식, 무허가 건물은 불가.",
    url: "https://www.jjyu.co.kr/w/미등기-부동산-가압류-가능-여부",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
