import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 취소 사유, 언제 가능한가요? 취하와의 차이·절차",
  description: "경매 취소는 남을 가망 없거나 중대한 권리 변동이 있을 때 가능해요. 취소와 취하의 차이, 매각허가결정 취소 절차, 보증금 몰수 규정을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-취소-사유-절차" },
  openGraph: {
    title: "경매 취소 사유, 언제 가능한가요? 취하와의 차이·절차 | 머니위키",
    description: "경매 취소는 남을 가망 없거나 중대한 권리 변동이 있을 때 가능해요. 취소와 취하의 차이, 매각허가결정 취소 절차, 보증금 몰수 규정을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/경매-취소-사유-절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
