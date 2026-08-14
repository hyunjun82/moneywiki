import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "미사용 연차수당, 얼마 받을 수 있나요? 계산 공식·청구·소멸시효",
  description: "1일 통상임금 × 미사용 일수로 계산해요. 퇴직 시 14일 내 정산 의무, 안 주면 노동청 신고, 소멸시효 3년까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/미사용-연차수당-청구-계산" },
  openGraph: {
    title: "미사용 연차수당, 얼마 받을 수 있나요? 계산 공식·청구·소멸시효 | 머니위키",
    description: "1일 통상임금 × 미사용 일수로 계산해요. 퇴직 시 14일 내 정산 의무, 안 주면 노동청 신고, 소멸시효 3년까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/미사용-연차수당-청구-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
