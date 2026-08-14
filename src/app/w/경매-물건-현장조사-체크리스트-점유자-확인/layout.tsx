import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 물건 현장조사, 뭘 확인해야 하나요? 점유자·체납관리비·건물 상태 체크리스트",
  description: "경매 입찰 전 현장조사에서 점유자 확인, 체납관리비 3년치 인수 여부, 건물 하자, 주변 시세를 반드시 확인하세요. 체크리스트 9항목과 조사 순서 5단계를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/경매-물건-현장조사-체크리스트-점유자-확인",
  },
  openGraph: {
    title: "경매 물건 현장조사, 뭘 확인해야 하나요? 점유자·체납관리비·건물 상태 체크리스트",
    description: "점유자·체납관리비·건물 상태·주변 시세. 현장조사 핵심 9항목 체크리스트.",
    url: "https://www.jjyu.co.kr/w/경매-물건-현장조사-체크리스트-점유자-확인",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
