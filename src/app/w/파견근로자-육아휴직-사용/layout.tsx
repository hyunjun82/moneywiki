import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "파견근로자 육아휴직 사용 가능 여부와 신청 방법 | 머니위키",
  description: "파견근로자도 육아휴직을 쓸 수 있어요. 파견사업주에게 신청하고 고용보험에서 급여를 받는 방법을 정리했어요.",
  openGraph: { title: "파견근로자 육아휴직 사용 가능 여부와 신청 방법 | 머니위키", description: "파견근로자 육아휴직 신청 방법이에요.", url: "https://www.jjyu.co.kr/w/파견근로자-육아휴직-사용", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/파견근로자-육아휴직-사용" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
