import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "아파트 동대표, 누가 될 수 있나요? 자격 요건과 선출 절차 | 머니위키",
  description: "동대표는 구분소유자 또는 배우자·직계존비속이어야 해요. 해당 동 거주 + 결격사유 없으면 출마 가능. 선출 절차 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아파트-동대표-자격-선출-기준" },
  openGraph: { title: "아파트 동대표, 누가 될 수 있나요?", description: "구분소유자 또는 직계존비속 + 해당 동 거주 필수.", url: "https://www.jjyu.co.kr/w/아파트-동대표-자격-선출-기준", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
