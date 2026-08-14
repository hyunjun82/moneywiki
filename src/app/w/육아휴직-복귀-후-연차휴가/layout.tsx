import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "육아휴직 복귀 후 연차휴가 — 출근 간주와 사용 기준",
  description: "육아휴직 기간은 출근으로 간주돼서 연차 15일이 모두 발생해요. 복귀 즉시 사용 가능하고, 회사 제한은 위법이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아휴직-복귀-후-연차휴가" },
  openGraph: { title: "육아휴직 복귀 후 연차휴가 — 출근 간주와 사용 기준", description: "1년 쉬고 와도 연차 15일 전부 발생. 기준 정리.", url: "https://www.jjyu.co.kr/w/육아휴직-복귀-후-연차휴가", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
