import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "공증 후 자택 가압류, 배우자 명의면 안전할까? 가압류 범위와 명의 관계",
  description: "배우자 명의 부동산도 공증 집행 대상이 될 수 있어요. 가압류 범위와 공동재산 처리 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공증-후-자택-가압류-배우자-명의" },
  openGraph: { title: "공증 후 자택 가압류, 배우자 명의면 안전할까? 가압류 범위와 명의 관계 | 머니위키", description: "배우자 명의 부동산도 공증 집행 대상이 될 수 있어요. 가압류 범위와 공동재산 처리 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/공증-후-자택-가압류-배우자-명의", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
