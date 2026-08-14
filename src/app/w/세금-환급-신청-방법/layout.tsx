import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "세금 환급 신청 방법, 내 환급금 조회부터 수령까지",
  description: "세금 환급금은 홈택스에서 조회하고 본인 명의 계좌를 등록하면 2주 이내에 입금돼요. 5년 넘기면 국고로 귀속되니 지금 바로 확인하세요.",
  openGraph: {
    title: "세금 환급 신청 방법, 내 환급금 조회부터 수령까지 | 머니위키",
    description: "세금 환급금 조회와 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/세금-환급-신청-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/세금-환급-신청-방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
