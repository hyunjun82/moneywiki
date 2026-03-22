import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대부업체 중도상환 수수료, 면제 조건과 과다 청구 대응법 | 머니위키",
  description: "대부업체 대출 3개월 이내면 중도상환 수수료 면제예요. 3개월 초과해도 연 24% 넘는 수수료는 불법이에요. 면제 조건과 과다 청구 대응법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대부업체-중도상환-수수료" },
  openGraph: {
    title: "대부업체 중도상환 수수료, 면제 조건과 과다 청구 대응법 | 머니위키",
    description: "대부업체 대출 3개월 이내면 중도상환 수수료 면제예요. 3개월 초과해도 연 24% 넘는 수수료는 불법이에요.",
    url: "https://www.jjyu.co.kr/w/대부업체-중도상환-수수료",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
