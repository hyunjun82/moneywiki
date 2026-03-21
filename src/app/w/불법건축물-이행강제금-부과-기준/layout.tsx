import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "불법건축물 이행강제금 부과 기준 | 머니위키",
  description: "이행강제금 계산 공식(위반면적x공시지가x부과율)과 75% 감경 조건, 시정 절차, 불복 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/불법건축물-이행강제금-부과-기준" },
  openGraph: {
    title: "불법건축물 이행강제금 부과 기준 | 머니위키",
    description: "이행강제금 계산 공식(위반면적x공시지가x부과율)과 75% 감경 조건, 시정 절차, 불복 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/불법건축물-이행강제금-부과-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
