import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민주택채권 매입 소유권이전등기 계산 방법",
  description: "집 사면 국민주택채권을 의무 매입해야 해요. 시가표준액 × 매입률로 계산하고 할인율 적용하면 실납부액은 액면가의 10% 수준이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민주택채권-매입-소유권이전등기-계산" },
  openGraph: {
    title: "국민주택채권 매입 소유권이전등기 계산 방법 | 머니위키",
    description: "집 사면 국민주택채권을 의무 매입해야 해요. 시가표준액 × 매입률로 계산하고 할인율 적용하면 실납부액은 액면가의 10% 수준이에요.",
    url: "https://www.jjyu.co.kr/w/국민주택채권-매입-소유권이전등기-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
