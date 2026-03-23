import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "아파트 하자보수 청구기간 타일 벽 균열 기준 | 머니위키",
  description: "새 아파트 화장실 타일이 떨어지고 벽에 금이 가는데, 언제까지 하자보수를 청구할 수 있는지 궁금하신가요?",
  openGraph: { title: "아파트 하자보수 청구기간 타일 벽 균열 기준 | 머니위키", description: "새 아파트 화장실 타일이 떨어지고 벽에 금이 가는데, 언제까지 하자보수를 청구할 수 있는지 궁금하신가요?", url: "https://www.jjyu.co.kr/w/아파트-하자보수-청구기간-타일-균열", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/아파트-하자보수-청구기간-타일-균열" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
