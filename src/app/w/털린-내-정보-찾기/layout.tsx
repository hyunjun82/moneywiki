import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "털린 내정보 찾기, 유출 여부 5분 만에 조회하는 방법 | 머니위키",
  description: "개인정보보호위원회 공식 서비스로 아이디·비밀번호 유출 여부를 무료 조회할 수 있어요. 2,300만 건 국내 데이터 검색과 대응 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/털린-내-정보-찾기" },
  openGraph: {
    title: "털린 내정보 찾기, 유출 여부 5분 만에 조회하는 방법 | 머니위키",
    description: "개인정보보호위원회 공식 서비스로 아이디·비밀번호 유출 여부를 무료 조회할 수 있어요. 2,300만 건 국내 데이터 검색과 대응 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/털린-내-정보-찾기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
