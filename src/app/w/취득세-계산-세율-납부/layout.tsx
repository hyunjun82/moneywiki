import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "취득세 얼마 내야 하나요? 세율 계산부터 60일 납부 방법까지",
  description: "1주택자는 집값에 따라 1~3%, 다주택자는 조정대상지역에서 최대 12%예요. 잔금일로부터 60일 이내 위택스에서 신고·납부해야 하고, 생애최초 구입 시 최대 200만원 감면 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/취득세-계산-세율-납부",
  },
  openGraph: {
    title: "취득세 얼마 내야 하나요? 세율 계산부터 60일 납부 방법까지",
    description: "1주택자 1~3%, 다주택자 최대 12%. 잔금일 기준 60일 이내 납부 필수.",
    url: "https://www.jjyu.co.kr/w/취득세-계산-세율-납부",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
