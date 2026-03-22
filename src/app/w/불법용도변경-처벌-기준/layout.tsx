import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "불법용도변경, 적발되면 처벌은? 벌금·이행강제금 기준과 대처 방법 | 머니위키",
  description: "허가 없이 건물 용도를 바꾸면 도시지역 3년 이하 징역·5억 이하 벌금, 이행강제금은 매년 반복 부과돼요. 처벌 기준과 정식 용도변경 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/불법용도변경-처벌-기준" },
  openGraph: {
    title: "불법용도변경, 적발되면 처벌은? 벌금·이행강제금 기준과 대처 방법 | 머니위키",
    description: "허가 없이 건물 용도를 바꾸면 도시지역 3년 이하 징역·5억 이하 벌금, 이행강제금은 매년 반복 부과돼요. 처벌 기준과 정식 용도변경 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/불법용도변경-처벌-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
