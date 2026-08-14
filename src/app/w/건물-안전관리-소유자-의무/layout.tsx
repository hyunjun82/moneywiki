import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건물 소유하면 꼭 해야 하는 것들, 전기·승강기·가스 안전관리 의무",
  description: "건물 소유자는 전기안전관리자 선임, 승강기 정기검사(연 1회), 가스안전관리 등 법정 의무가 있어요. 미이행 시 과태료 300만원, 사고 시 형사처벌까지 받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/건물-안전관리-소유자-의무",
  },
  openGraph: {
    title: "건물 소유하면 꼭 해야 하는 것들, 전기·승강기·가스 안전관리 의무",
    description: "전기·승강기·가스 검사 주기와 과태료. 안전관리 체크리스트.",
    url: "https://www.jjyu.co.kr/w/건물-안전관리-소유자-의무",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
