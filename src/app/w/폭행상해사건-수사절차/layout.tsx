import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "폭행·상해 수사절차, 고소부터 재판까지 전체 흐름 | 머니위키",
  description: "폭행·상해 피해 시 고소 방법부터 경찰 수사, 검찰 송치, 기소·불기소 결정까지 전체 수사 절차를 단계별로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/폭행상해사건-수사절차" },
  openGraph: {
    title: "폭행·상해 수사절차, 고소부터 재판까지 전체 흐름 | 머니위키",
    description: "폭행·상해 피해 시 고소 방법부터 경찰 수사, 검찰 송치, 기소·불기소 결정까지 전체 수사 절차를 단계별로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/폭행상해사건-수사절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
