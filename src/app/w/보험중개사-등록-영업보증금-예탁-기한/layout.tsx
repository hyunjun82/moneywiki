import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보험중개사 영업보증금 예탁 기한, 등록 후 영업개시까지 준비할 것들 | 머니위키",
  description: "보험중개사 등록 후 영업보증금 예탁 기한은 영업개시 7일 전까지예요. 개인 1억원, 법인 3억원 이상을 금융감독원에 예탁하고 중개계좌를 개설해야 영업 시작이 가능해요.",
  openGraph: {
    title: "보험중개사 영업보증금 예탁 기한, 등록 후 영업개시까지 준비할 것들 | 머니위키",
    description: "보험중개사 영업보증금 예탁 기한과 절차, 제출 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/보험중개사-등록-영업보증금-예탁-기한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/보험중개사-등록-영업보증금-예탁-기한" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
