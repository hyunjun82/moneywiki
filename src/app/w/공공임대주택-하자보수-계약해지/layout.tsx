import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "공공임대주택 하자보수 미조치 임대차계약 해지 방법 | 머니위키",
  description: "천장 누수 하자보수를 7개월째 안 해주는 공공임대주택, 임대차계약 해지가 가능할까요? 해지 조건과 절차를 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공공임대주택-하자보수-계약해지" },
  openGraph: {
    title: "공공임대주택 하자보수 미조치 임대차계약 해지 방법",
    description: "천장 누수 하자보수를 7개월째 안 해주는 공공임대주택, 임대차계약 해지가 가능할까요? 해지 조건과 절차를 알려드려요.",
    url: "https://www.jjyu.co.kr/w/공공임대주택-하자보수-계약해지",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
