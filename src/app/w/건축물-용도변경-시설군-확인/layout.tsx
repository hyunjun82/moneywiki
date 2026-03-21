import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "건축물 용도변경 시설군 확인과 허가·신고 절차 | 머니위키",
  description: "건축물 용도변경 시 9개 시설군 분류 체계, 허가·신고·기재변경 구분 기준, 절차와 필요 서류를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건축물-용도변경-시설군-확인" },
  openGraph: {
    title: "건축물 용도변경 시설군 확인과 허가·신고 절차 | 머니위키",
    description: "건축물 용도변경 시 9개 시설군 분류 체계, 허가·신고·기재변경 구분 기준, 절차와 필요 서류를 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/건축물-용도변경-시설군-확인",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
