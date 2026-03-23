import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "근로복지공단 퇴직연금 가입 | 머니위키",
  description: "근로복지공단 퇴직연금 푸른씨앗 가입 방법 알려드려요. 30인 이하 사업장이면 가입할 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로복지공단-퇴직연금-가입" },
  openGraph: {
    title: "근로복지공단 퇴직연금 가입",
    description: "근로복지공단 퇴직연금 푸른씨앗 가입 방법 알려드려요. 30인 이하 사업장이면 가입할 수 있어요",
    url: "https://www.jjyu.co.kr/w/근로복지공단-퇴직연금-가입",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
