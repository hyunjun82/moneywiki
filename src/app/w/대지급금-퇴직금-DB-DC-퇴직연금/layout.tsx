import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대지급금으로 퇴직금 받기, DB형·DC형 적용 방법은? | 머니위키",
  description: "대지급금 제도를 통해 체불된 퇴직금을 받을 수 있어요. DB형·DC형 퇴직연금 적용 방법과 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대지급금-퇴직금-DB-DC-퇴직연금" },
  openGraph: {
    title: "대지급금으로 퇴직금 받기, DB형·DC형 적용 방법은? | 머니위키",
    description: "대지급금 제도를 통해 체불된 퇴직금을 받을 수 있어요. DB형·DC형 퇴직연금 적용 방법과 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/대지급금-퇴직금-DB-DC-퇴직연금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
