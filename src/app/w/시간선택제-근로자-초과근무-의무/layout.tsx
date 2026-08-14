import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "시간선택제 근로자 초과근무 의무: 강요 금지 및 근로 규정",
  description: "시간선택제 근로자는 초과근무를 거부할 수 있어요. 합의 없이 강요하면 불법이고, 근로기준법으로 보호받을 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/시간선택제-근로자-초과근무-의무" },
  openGraph: {
    title: "시간선택제 근로자 초과근무 의무: 강요 금지 및 근로 규정",
    description: "시간선택제 근로자는 초과근무를 거부할 수 있어요. 합의 없이 강요하면 불법이고, 근로기준법으로 보호받을 수 있어요",
    url: "https://www.jjyu.co.kr/w/시간선택제-근로자-초과근무-의무",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
