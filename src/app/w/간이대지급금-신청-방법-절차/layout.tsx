import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "간이대지급금 신청 방법 — 700만원 한도, 체불확인서부터 절차까지",
  description: "회사가 안 망했어도 체불 임금을 국가가 대신 지급해요. 최대 700만원, 체불확인서 발급부터 근로복지공단 신청까지 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/간이대지급금-신청-방법-절차" },
  openGraph: {
    title: "간이대지급금 신청 방법 — 700만원 한도, 체불확인서부터 절차까지 | 머니위키",
    description: "회사가 안 망했어도 체불 임금을 국가가 대신 지급해요. 최대 700만원, 체불확인서 발급부터 근로복지공단 신청까지 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/간이대지급금-신청-방법-절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
