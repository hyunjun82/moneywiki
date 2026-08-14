import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기준경비율 vs 단순경비율, 나는 어디? 적용 기준과 계산법",
  description: "프리랜서 수입 2,400만원 미만이면 단순경비율, 이상이면 기준경비율이 적용돼요. 증빙 유무에 따라 세금이 크게 달라지죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기준경비율-단순경비율-적용-기준-계산" },
  openGraph: {
    title: "기준경비율 vs 단순경비율, 나는 어디? 적용 기준과 계산법 | 머니위키",
    description: "프리랜서 수입 2,400만원 미만이면 단순경비율, 이상이면 기준경비율이 적용돼요. 증빙 유무에 따라 세금이 크게 달라지죠.",
    url: "https://www.jjyu.co.kr/w/기준경비율-단순경비율-적용-기준-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
