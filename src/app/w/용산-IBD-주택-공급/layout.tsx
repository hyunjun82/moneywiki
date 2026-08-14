import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "용산 IBD 주택 공급 1만 가구: 청약 일정과 입지 장점 2026",
  description: "용산 IBD에 1만 가구 공급돼요. 기존 6천에서 용적률 상향으로 4천 늘었고, 2027년 착공해서 2029~2030년 입주 가능해요. 입지와 청약 조건 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/용산-IBD-주택-공급" },
  openGraph: { title: "용산 IBD 주택 공급 1만 가구: 청약 일정과 입지 장점 2026 | 머니위키", description: "용산 IBD에 1만 가구 공급돼요. 기존 6천에서 용적률 상향으로 4천 늘었고, 2027년 착공해서 2029~2030년 입주 가능해요. 입지와 청약 조건 알려드려요.", url: "https://www.jjyu.co.kr/w/용산-IBD-주택-공급", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
