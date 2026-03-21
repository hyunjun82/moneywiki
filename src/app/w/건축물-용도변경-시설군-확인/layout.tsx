import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건축물 용도변경, 허가인가요 신고인가요? 시설군으로 판단하는 방법 | 머니위키",
  description: "건축물 용도변경 시 허가·신고·건축물대장 변경 중 무엇이 필요한지 시설군으로 판단해요. 9개 시설군 분류와 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건축물-용도변경-시설군-확인" },
  openGraph: {
    title: "건축물 용도변경, 허가인가요 신고인가요? 시설군으로 판단하는 방법 | 머니위키",
    description: "시설군 번호가 높아지면 허가, 낮아지면 신고, 같으면 건축물대장 변경만 하면 돼요. 9개 시설군 분류와 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/건축물-용도변경-시설군-확인",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
