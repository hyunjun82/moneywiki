import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부가세 환급은 언제 들어오나요? 조기환급 신청부터 홈택스 조회까지 | 머니위키",
  description: "부가세 일반환급은 신고 기한 마지막 날로부터 30일 이내, 조기환급 대상은 15일 이내예요. 영세율·설비투자 사업자는 조기환급 신청 가능. 환급 안 들어올 때 확인법도 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/부가세-환급-신청",
  },
  openGraph: {
    title: "부가세 환급은 언제 들어오나요? 조기환급 신청부터 홈택스 조회까지",
    description: "일반환급 30일, 조기환급 15일 이내. 영세율·설비투자 사업자는 조기환급 신청 가능.",
    url: "https://www.jjyu.co.kr/w/부가세-환급-신청",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
