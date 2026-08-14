import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "공중화장실 설치 기준, 뭘 지켜야 하나요? 남녀 변기 수·장애인 시설·관리 규정",
  description: "여성 대변기는 남성 대소변기 합계의 1배 이상, 장애인 시설 필수, 소독은 4~9월 주3회. 공중화장실 법적 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공중화장실-설치기준-관리기준" },
  openGraph: {
    title: "공중화장실 설치 기준, 뭘 지켜야 하나요? 남녀 변기 수·장애인 시설·관리 규정 | 머니위키",
    description: "여성 대변기는 남성 대소변기 합계의 1배 이상, 장애인 시설 필수, 소독은 4~9월 주3회. 공중화장실 법적 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/공중화장실-설치기준-관리기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
