import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근저당권 등기명의인 주소변경, 중간 주소 생략하고 바로 등기하는 방법",
  description: "근저당권자 주소가 여러 번 바뀌었어도 중간 주소 없이 현재 주소로 바로 표시변경등기 가능해요. 비용 8,200원, 인터넷등기소 전자신청 절차와 서류까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근저당권-등기명의인-주소변경-등기" },
  openGraph: {
    title: "근저당권 등기명의인 주소변경, 중간 주소 생략하고 바로 등기하는 방법 | 머니위키",
    description: "근저당권자 주소가 여러 번 바뀌었어도 중간 주소 없이 현재 주소로 바로 표시변경등기 가능해요. 비용 8,200원, 인터넷등기소 전자신청 절차와 서류까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/근저당권-등기명의인-주소변경-등기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
