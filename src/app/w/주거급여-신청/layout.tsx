import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주거급여 신청, 나도 받을 수 있나요? 자격 조건부터 금액까지 | 머니위키",
  description: "기준 중위소득 48% 이하 가구가 대상이에요. 서울 1인가구 기준 월 최대 34.1만원 임차급여를 받고, 자가 소유자는 수선유지급여 최대 1,241만원까지 지원돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/주거급여-신청",
  },
  openGraph: {
    title: "주거급여 신청, 나도 받을 수 있나요? 자격 조건부터 금액까지",
    description: "중위소득 48% 이하면 월세·전세 주거비 지원. 서울 1인 최대 34.1만원.",
    url: "https://www.jjyu.co.kr/w/주거급여-신청",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
