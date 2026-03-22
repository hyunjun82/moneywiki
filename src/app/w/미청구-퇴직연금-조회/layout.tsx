import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "미청구 퇴직연금 조회 방법과 수령 절차 | 머니위키",
  description: "금융감독원 통합연금포털에서 미청구 퇴직연금을 한 번에 조회할 수 있어요. 조회 방법, 수령 절차, 소멸시효까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/미청구-퇴직연금-조회" },
  openGraph: {
    title: "미청구 퇴직연금 조회 방법과 수령 절차",
    description: "통합연금포털 조회 5단계, 미청구 발생 원인, 소멸시효 5년 대응법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/미청구-퇴직연금-조회",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
