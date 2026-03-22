import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "인지세 납부, 계약 금액별 세액표와 전자수입인지 방법 | 머니위키",
  description: "계약 금액에 따라 인지세 2만~35만원. 전자수입인지 사이트에서 온라인 구매 후 계약서에 기재번호만 적으면 돼요. 미납 시 최대 300% 과태료 주의.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/인지세-납부",
  },
  openGraph: {
    title: "인지세 납부, 계약 금액별 세액표와 전자수입인지 방법",
    description: "계약 금액별 2만~35만원. 전자수입인지로 납부하는 절차 정리.",
    url: "https://www.jjyu.co.kr/w/인지세-납부",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
