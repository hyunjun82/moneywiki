import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국가장학금, 내 소득구간이면 얼마 받나요? 구간별 지원금액과 신청 방법",
  description: "기초·차상위는 등록금 전액, 1~3구간은 연간 600만원, 4~6구간 440만원, 7~8구간 360만원이에요. 한국장학재단에서 온라인 신청하고 가구원 동의까지 완료하면 돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/국가장학금-소득구간-지원금액",
  },
  openGraph: {
    title: "국가장학금, 내 소득구간이면 얼마 받나요? 구간별 지원금액과 신청 방법",
    description: "기초 전액, 1~3구간 600만원. 소득구간별 금액과 신청법.",
    url: "https://www.jjyu.co.kr/w/국가장학금-소득구간-지원금액",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
