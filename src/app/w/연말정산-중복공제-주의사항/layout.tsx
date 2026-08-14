import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 중복공제하면 어떻게 되나요? 가산세 10%와 적발 사례",
  description: "같은 부양가족을 두 명이 공제하면 국세청이 자동 적발해요. 공제 취소 + 과소납부 세액의 10% 가산세가 부과되니 사전 협의가 필수예요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-중복공제-주의사항",
  },
  openGraph: {
    title: "연말정산 중복공제 주의사항, 가산세 10% 피하는 법",
    description: "부양가족 중복 등록하면 자동 적발. 합법적 중복공제와 불법 중복 구분법.",
    url: "https://www.jjyu.co.kr/w/연말정산-중복공제-주의사항",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
