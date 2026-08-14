import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부업 소득 세금 처리 — 유형별 신고와 분리과세 기준",
  description: "부업 소득은 근로·사업·기타소득으로 나뉘어요. 기타소득 300만원 이하면 분리과세 선택 가능, 사업소득은 5월 종소세 필수. 유형별 처리 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-부업소득",
  },
  openGraph: {
    title: "부업 소득 세금 처리 — 유형별 신고와 분리과세 기준",
    description: "부업 소득 3가지 유형별 세금 처리법. 기타소득 분리과세, 사업소득 종소세 신고까지.",
    url: "https://www.jjyu.co.kr/w/연말정산-부업소득",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
