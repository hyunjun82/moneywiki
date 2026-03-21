import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대출과 신용점수의 관계, 조회·실행·상환 단계별 영향 | 머니위키",
  description: "대출 한도 조회는 30일 이내 여러 번 해도 1건으로 잡혀요. 실행하면 5~15점 떨어지지만 연체 없이 갚으면 회복되고 오히려 올라요. KCB·NICE 등급표와 점수 올리는 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대출과-신용점수의-관계" },
  openGraph: {
    title: "대출과 신용점수의 관계, 조회·실행·상환 단계별 영향 | 머니위키",
    description: "대출 한도 조회는 30일 이내 여러 번 해도 1건으로 잡혀요. 실행하면 5~15점 떨어지지만 연체 없이 갚으면 회복되고 오히려 올라요.",
    url: "https://www.jjyu.co.kr/w/대출과-신용점수의-관계",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
