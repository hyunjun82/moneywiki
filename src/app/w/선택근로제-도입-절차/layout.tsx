import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "선택근로제, 어떻게 도입하나요? 서면 합의부터 수당 계산까지 | 머니위키",
  description: "선택근로제 도입은 근로자대표와 서면 합의가 필수예요. 정산기간 1개월 이내, 평균 주 40시간 초과 시 1.5배 수당 지급. 도입 절차와 합의서 작성법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/선택근로제-도입-절차",
  },
  openGraph: {
    title: "선택근로제, 어떻게 도입하나요? 서면 합의부터 수당 계산까지",
    description: "근로자대표 서면 합의 필수. 정산기간 1개월 이내, 주 40시간 평균.",
    url: "https://www.jjyu.co.kr/w/선택근로제-도입-절차",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
