import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지급 기준, 어떤 근로자에게 적용되나요? | 머니위키",
  description: "퇴직금 지급 기준은 사업장 규모와 관계없이 1인 이상 사업장에 적용됩니다. 5인 미만 사업장, 근로 형태별 기준, 편법 사례와 대응 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-기준" },
  openGraph: {
    title: "퇴직금 지급 기준, 어떤 근로자에게 적용되나요? | 머니위키",
    description: "퇴직금 지급 기준은 사업장 규모와 관계없이 1인 이상 사업장에 적용됩니다. 5인 미만 사업장도 예외가 아닙니다.",
    url: "https://www.jjyu.co.kr/w/퇴직금-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
