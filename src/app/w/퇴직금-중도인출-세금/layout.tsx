import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중도 인출, 세금이 더 붙나요?",
  description: "퇴직금(IRP) 중도 인출 시 퇴직소득세에 기타소득세(16.5%)가 추가될 수 있어요. 인출 사유, 세금 차이, 절세 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중도인출-세금" },
  openGraph: {
    title: "퇴직금 중도 인출, 세금이 더 붙나요? | 머니위키",
    description: "퇴직금(IRP) 중도 인출 시 퇴직소득세에 기타소득세(16.5%)가 추가될 수 있어요. 인출 사유, 세금 차이, 절세 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중도인출-세금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
