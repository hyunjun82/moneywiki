import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가족 아프면 회사 그만둬야 할까? 가족돌봄휴직 신청 조건과 기간",
  description: "가족돌봄휴직은 부모·배우자·자녀 돌봄을 위해 연간 최대 90일 쉴 수 있는 제도예요. 30일 단위로 분할 사용 가능하고, 회사는 정당한 사유 없이 거부할 수 없어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/가족돌봄휴직-신청-조건-기간" },
  openGraph: {
    title: "가족 아프면 회사 그만둬야 할까? 가족돌봄휴직 신청 조건과 기간 | 머니위키",
    description: "가족돌봄휴직은 부모·배우자·자녀 돌봄을 위해 연간 최대 90일 쉴 수 있는 제도예요. 30일 단위로 분할 사용 가능하고, 회사는 정당한 사유 없이 거부할 수 없어요.",
    url: "https://www.jjyu.co.kr/w/가족돌봄휴직-신청-조건-기간",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
