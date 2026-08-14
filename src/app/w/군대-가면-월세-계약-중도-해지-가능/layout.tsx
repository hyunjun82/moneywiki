import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "입대하면 월세 계약을 중도 해지할 수 있나요? 군 입영과 임대차 해지 조건",
  description: "군 입영은 임대차 해지 사유가 될 수 있어요. 묵시적 갱신 전이면 위약금 없이 해지 가능한 경우도 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/군대-가면-월세-계약-중도-해지-가능" },
  openGraph: { title: "입대하면 월세 계약을 중도 해지할 수 있나요? 군 입영과 임대차 해지 조건 | 머니위키", description: "군 입영은 임대차 해지 사유가 될 수 있어요. 묵시적 갱신 전이면 위약금 없이 해지 가능한 경우도 있어요.", url: "https://www.jjyu.co.kr/w/군대-가면-월세-계약-중도-해지-가능", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
