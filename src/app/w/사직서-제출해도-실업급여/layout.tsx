import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "사직서 냈어도 실업급여 받을까? 조건 체크리스트 | 머니위키",
  description: "사직서를 냈어도 권고사직, 임금체불, 근로조건 위반 등 정당한 사유가 있으면 실업급여를 받을 수 있어요. 이직확인서 사유 코드와 대처법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/사직서-제출해도-실업급여" },
  openGraph: {
    title: "사직서 냈어도 실업급여 받을까? 조건 체크리스트 | 머니위키",
    description: "사직서를 냈어도 권고사직, 임금체불, 근로조건 위반 등 정당한 사유가 있으면 실업급여를 받을 수 있어요. 이직확인서 사유 코드와 대처법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/사직서-제출해도-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
