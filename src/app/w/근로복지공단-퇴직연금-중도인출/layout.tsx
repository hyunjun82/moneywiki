import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로복지공단 퇴직연금, 급할 때 빼도 되나요? 푸른씨앗 중도인출 조건과 신청 방법",
  description: "푸른씨앗도 법정 사유(주택구입, 전세금, 의료비 등)가 있어야 중도인출이 가능해요. 사유별 서류, 세금, 처리 기간까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/근로복지공단-퇴직연금-중도인출",
  },
  openGraph: {
    title: "근로복지공단 퇴직연금, 급할 때 빼도 되나요? 중도인출 조건과 신청 방법",
    description: "법정 사유 6가지, 필요 서류, 세금 차이, 신청 절차 정리.",
    url: "https://www.jjyu.co.kr/w/근로복지공단-퇴직연금-중도인출",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
