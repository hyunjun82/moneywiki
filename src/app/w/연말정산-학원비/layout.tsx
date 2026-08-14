import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "학원비도 연말정산에서 공제받을 수 있나요? 교육비 공제 대상과 제외 항목",
  description: "취학 전 아동 학원비는 공제 가능하지만, 초등학생 이상 학원비는 공제 대상이 아니에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-학원비" },
  openGraph: { title: "학원비도 연말정산에서 공제받을 수 있나요? 교육비 공제 대상과 제외 항목 | 머니위키", description: "취학 전 아동 학원비는 공제 가능하지만, 초등학생 이상 학원비는 공제 대상이 아니에요.", url: "https://www.jjyu.co.kr/w/연말정산-학원비", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
