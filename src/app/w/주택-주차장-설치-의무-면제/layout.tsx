import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택 주차장 설치 의무, 면제받을 수 있나요? 조건과 비용 | 머니위키",
  description: "차량통행 금지 지역이나 간선도로변이면 면제 신청이 가능해요. 면제받아도 설치 비용의 50%씩 2회 납부해야 하고, 미설치 시 3년 이하 징역 또는 5천만원 이하 벌금이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/주택-주차장-설치-의무-면제",
  },
  openGraph: {
    title: "주택 주차장 설치 의무, 면제받을 수 있나요?",
    description: "면제 조건 3가지, 비용 납부 절차, 위반 시 벌금까지 정리.",
    url: "https://www.jjyu.co.kr/w/주택-주차장-설치-의무-면제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
