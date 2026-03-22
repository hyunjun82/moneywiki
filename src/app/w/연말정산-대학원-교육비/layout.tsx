import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "대학원 등록금도 연말정산에서 공제되나요? 본인 교육비 공제 한도 | 머니위키",
  description: "본인 대학원 교육비는 전액 공제 가능해요. 배우자나 자녀의 대학원비는 공제 대상이 아니에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-대학원-교육비" },
  openGraph: { title: "대학원 등록금도 연말정산에서 공제되나요? 본인 교육비 공제 한도 | 머니위키", description: "본인 대학원 교육비는 전액 공제 가능해요. 배우자나 자녀의 대학원비는 공제 대상이 아니에요.", url: "https://www.jjyu.co.kr/w/연말정산-대학원-교육비", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
