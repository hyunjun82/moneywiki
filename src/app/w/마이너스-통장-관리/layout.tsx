import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "마이너스 통장 이자 계산과 관리법 | 머니위키",
  description: "마이너스 통장 이자는 쓴 만큼 매일 계산돼요. 사용률 80% 이하 유지, 신용점수 영향, 한도 축소 규정까지 관리 핵심을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/마이너스-통장-관리" },
  openGraph: {
    title: "마이너스 통장 이자 계산과 관리법 | 머니위키",
    description: "마이너스 통장 이자는 쓴 만큼 매일 계산돼요. 사용률 80% 이하 유지, 신용점수 영향, 한도 축소 규정까지 관리 핵심을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/마이너스-통장-관리",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
