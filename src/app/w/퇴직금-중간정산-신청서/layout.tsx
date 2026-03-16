import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산 신청서, 어떻게 작성하나요? | 머니위키",
  description: "퇴직금 중간정산 신청서 양식 구하는 법과 작성 방법을 안내해요. 필수 기재 항목, 주의할 점, 제출 후 과정까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산-신청서" },
  openGraph: {
    title: "퇴직금 중간정산 신청서, 어떻게 작성하나요? | 머니위키",
    description: "퇴직금 중간정산 신청서 양식 구하는 법과 작성 방법을 안내해요. 필수 기재 항목, 주의할 점, 제출 후 과정까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산-신청서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
