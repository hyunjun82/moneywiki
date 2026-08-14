import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "1가구2주택 양도소득세 비과세 일시적2주택 기간",
  description: "종전주택 2년 보유, 신규취득 1년 후, 3년 이내 처분. 조정대상지역 2년 거주 추가 요건. 성공·실패 사례 비교.",
  openGraph: {
    title: "1가구2주택 양도소득세 비과세 일시적2주택 기간",
    description: "신규주택 취득 후 3년 이내에 기존 집 팔면 양도세 없음. 3가지 조건 확인.",
    url: "https://jjyu.co.kr/w/1가구2주택-양도세-비과세-일시적2주택",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/1가구2주택-양도세-비과세-일시적2주택",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
